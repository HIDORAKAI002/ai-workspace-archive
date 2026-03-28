/**
 * Upload Service
 *
 * This service handles file uploads for the API, providing secure file handling
 * with validation and optional auto-conversion capabilities.
 */

import { randomUUID } from 'crypto';
import { join } from 'path';
import { mkdir, readFile, writeFile, stat, rm } from 'fs/promises';
import { existsSync } from 'fs';
import { createHash } from 'crypto';
import {
  UploadRequest,
  UploadResponse,
  UploadOptions,
  UploadedFile,
  JobInfo,
  ApiError,
  ValidateResponse,
  ConvertResponse,
} from '../types/api.js';
import { ValidationService } from './validation.js';
import { ConversionService } from './conversion.js';
import { logger } from '../../cli/utils/logger.js';
import { EventEmitter } from 'events';

/**
 * Upload job tracking
 */
interface UploadJob {
  id: string;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'cancelled';
  progress: number;
  startedAt?: Date;
  completedAt?: Date;
  result?: UploadResponse;
  error?: ApiError;
  tempDir?: string;
  uploadedFile?: UploadedFile;
  emitter: EventEmitter;
}

/**
 * Upload configuration
 */
interface UploadConfig {
  maxFileSize: number;
  allowedMimeTypes: string[];
  tempDir: string;
  retentionDays: number;
  quarantineDir: string;
  allowedExtensions: string[];
}

/**
 * Upload Service class
 */
export class UploadService extends EventEmitter {
  private jobs: Map<string, UploadJob> = new Map();
  private config: UploadConfig;
  private validationService: ValidationService;
  private conversionService: ConversionService;

  constructor(config: Partial<UploadConfig> = {}) {
    super();

    this.config = {
      maxFileSize: 10 * 1024 * 1024, // 10MB
      allowedMimeTypes: ['application/json', 'text/plain'],
      tempDir: '/tmp/flowise-api-uploads',
      retentionDays: 7,
      quarantineDir: '/tmp/flowise-quarantine',
      allowedExtensions: ['.json', '.txt'],
      ...config,
    };

    this.validationService = new ValidationService();
    this.conversionService = new ConversionService();

    this.ensureDirectories();
  }

  /**
   * Ensure required directories exist
   */
  private async ensureDirectories(): Promise<void> {
    const dirs = [this.config.tempDir, this.config.quarantineDir];

    for (const dir of dirs) {
      if (!existsSync(dir)) {
        await mkdir(dir, { recursive: true });
      }
    }
  }

  /**
   * Handle file upload
   */
  public async uploadFile(request: UploadRequest): Promise<UploadResponse> {
    const jobId = randomUUID();
    const job: UploadJob = {
      id: jobId,
      status: 'queued',
      progress: 0,
      emitter: new EventEmitter(),
    };

    this.jobs.set(jobId, job);

    try {
      // Update job status
      job.status = 'running';
      job.startedAt = new Date();
      this.emitProgress(job, 10, 'Validating upload...');

      // Validate upload
      await this.validateUpload(request.file);

      this.emitProgress(job, 30, 'Processing file...');

      // Process the uploaded file
      const uploadedFile = await this.processUploadedFile(request.file, jobId);
      job.uploadedFile = uploadedFile;

      this.emitProgress(job, 50, 'Scanning for security threats...');

      // Security scan
      await this.securityScan(uploadedFile);

      this.emitProgress(job, 70, 'Finalizing upload...');

      // Build initial response
      const response: UploadResponse = {
        jobId,
        file: uploadedFile,
      };

      // Run validation if requested
      if (request.options?.validate) {
        this.emitProgress(job, 80, 'Validating JSON content...');

        try {
          const validateResponse = await this.validationService.validate({
            input: uploadedFile.path,
            options: {
              strict: true,
              checkDeprecated: true,
              suggestOptimizations: true,
            },
          });
          response.validation = validateResponse;
        } catch (error) {
          logger.warn('Validation failed during upload:', { error });
          // Continue processing even if validation fails
        }
      }

      // Run auto-conversion if requested
      if (request.options?.autoConvert) {
        this.emitProgress(job, 90, 'Auto-converting file...');

        try {
          const convertResponse = await this.conversionService.convert({
            input: uploadedFile.path,
            options: request.options.conversionOptions,
          });
          response.conversion = convertResponse;
        } catch (error) {
          logger.warn('Auto-conversion failed during upload:', { error });
          // Continue processing even if conversion fails
        }
      }

      // Update job status
      job.status = 'completed';
      job.completedAt = new Date();
      job.result = response;
      job.progress = 100;
      this.emitProgress(job, 100, 'Upload completed!');

      // Emit completion event
      this.emit('upload:completed', {
        jobId,
        file: uploadedFile,
        result: response,
      });

      return response;
    } catch (error) {
      // Handle upload error
      const apiError: ApiError = {
        code: 'UPLOAD_ERROR',
        message:
          error instanceof Error ? error.message : 'Unknown upload error',
        details: error,
      };

      job.status = 'failed';
      job.completedAt = new Date();
      job.error = apiError;

      // Move file to quarantine if it exists
      if (job.uploadedFile) {
        await this.quarantineFile(job.uploadedFile);
      }

      this.emit('upload:failed', {
        jobId,
        error: apiError,
      });

      throw apiError;
    }
  }

  /**
   * Get uploaded file info
   */
  public async getFileInfo(jobId: string): Promise<UploadedFile | null> {
    const job = this.jobs.get(jobId);
    return job?.uploadedFile || null;
  }

  /**
   * Get file content
   */
  public async getFileContent(jobId: string): Promise<string | null> {
    const job = this.jobs.get(jobId);
    if (!job?.uploadedFile) return null;

    try {
      return await readFile(job.uploadedFile.path, 'utf-8');
    } catch (error) {
      logger.error('Failed to read file content:', { error, jobId });
      return null;
    }
  }

  /**
   * Delete uploaded file
   */
  public async deleteFile(jobId: string): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (!job?.uploadedFile) return false;

    try {
      await rm(job.uploadedFile.path, { force: true });
      this.jobs.delete(jobId);

      this.emit('upload:deleted', { jobId });
      return true;
    } catch (error) {
      logger.error('Failed to delete file:', { error, jobId });
      return false;
    }
  }

  /**
   * Get job status
   */
  public getJobStatus(jobId: string): JobInfo | null {
    const job = this.jobs.get(jobId);
    if (!job) return null;

    return {
      id: job.id,
      type: 'upload',
      status: job.status,
      progress: job.progress,
      createdAt: job.startedAt?.toISOString() || new Date().toISOString(),
      startedAt: job.startedAt?.toISOString(),
      completedAt: job.completedAt?.toISOString(),
      result: job.result,
      error: job.error,
    };
  }

  /**
   * Cancel an upload job
   */
  public async cancelJob(jobId: string): Promise<boolean> {
    const job = this.jobs.get(jobId);
    if (!job || job.status !== 'running') return false;

    job.status = 'cancelled';
    job.completedAt = new Date();

    // Clean up files
    if (job.uploadedFile) {
      await rm(job.uploadedFile.path, { force: true }).catch(console.error);
    }

    this.emit('upload:cancelled', { jobId });
    return true;
  }

  /**
   * Get all jobs
   */
  public getAllJobs(): JobInfo[] {
    return Array.from(this.jobs.values()).map((job) => ({
      id: job.id,
      type: 'upload',
      status: job.status,
      progress: job.progress,
      createdAt: job.startedAt?.toISOString() || new Date().toISOString(),
      startedAt: job.startedAt?.toISOString(),
      completedAt: job.completedAt?.toISOString(),
      result: job.result,
      error: job.error,
    }));
  }

  /**
   * Subscribe to job progress updates
   */
  public subscribeToJob(
    jobId: string,
    callback: (progress: any) => void
  ): () => void {
    const job = this.jobs.get(jobId);
    if (!job) return () => {};

    const handler = (progress: any) => callback(progress);
    job.emitter.on('progress', handler);

    return () => {
      job.emitter.removeListener('progress', handler);
    };
  }

  /**
   * Clean up old files and jobs
   */
  public async cleanup(): Promise<void> {
    const cutoffDate = new Date(
      Date.now() - this.config.retentionDays * 24 * 60 * 60 * 1000
    );

    for (const [jobId, job] of this.jobs.entries()) {
      if (job.completedAt && job.completedAt < cutoffDate) {
        // Delete file if it exists
        if (job.uploadedFile) {
          await rm(job.uploadedFile.path, { force: true }).catch(console.error);
        }

        // Remove job from memory
        this.jobs.delete(jobId);
      }
    }
  }

  /**
   * Get storage statistics
   */
  public async getStorageStats(): Promise<{
    totalFiles: number;
    totalSize: number;
    availableSpace: number;
    oldestFile: string | null;
    newestFile: string | null;
  }> {
    const jobs = Array.from(this.jobs.values());
    let totalSize = 0;
    let oldestFile: string | null = null;
    let newestFile: string | null = null;
    let oldestTime = Infinity;
    let newestTime = 0;

    for (const job of jobs) {
      if (job.uploadedFile) {
        totalSize += job.uploadedFile.size;

        const time = job.startedAt?.getTime() || 0;
        if (time < oldestTime) {
          oldestTime = time;
          oldestFile = job.uploadedFile.originalName;
        }
        if (time > newestTime) {
          newestTime = time;
          newestFile = job.uploadedFile.originalName;
        }
      }
    }

    // Get actual available disk space
    const availableSpace = await this.getAvailableDiskSpace();
    
    return {
      totalFiles: jobs.length,
      totalSize,
      availableSpace,
      oldestFile,
      newestFile,
    };
  }

  /**
   * Get available disk space for uploads
   */
  private async getAvailableDiskSpace(): Promise<number> {
    try {
      // Use platform-specific commands to get disk space
      const { execSync } = await import('child_process');
      const uploadDir = this.config.uploadDir;
      
      if (process.platform === 'win32') {
        // Windows: Use wmic to get free space
        const drive = uploadDir.substring(0, 2);
        const output = execSync(
          `wmic logicaldisk where caption="${drive}" get freespace /value`,
          { encoding: 'utf8' }
        );
        const match = output.match(/FreeSpace=(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
      } else {
        // Unix-like systems: Use df command
        const output = execSync(`df -B1 "${uploadDir}" | tail -1`, { encoding: 'utf8' });
        const parts = output.trim().split(/\s+/);
        // Available space is typically the 4th column in df output
        return parseInt(parts[3] || '0', 10);
      }
    } catch (error) {
      console.error('Failed to get disk space:', error);
      // Return a reasonable default if we can't determine actual space
      return 10 * 1024 * 1024 * 1024; // 10GB default
    }
  }
  
  /**
   * Validate upload
   */
  private async validateUpload(file: Express.Multer.File): Promise<void> {
    // Check file size
    if (file.size > this.config.maxFileSize) {
      throw new Error(
        `File size ${file.size} exceeds maximum allowed size ${this.config.maxFileSize}`
      );
    }

    // Check MIME type
    if (!this.config.allowedMimeTypes.includes(file.mimetype)) {
      throw new Error(`File type ${file.mimetype} is not allowed`);
    }

    // Check file extension
    const extension = file.originalname.toLowerCase().split('.').pop();
    if (
      !extension ||
      !this.config.allowedExtensions.includes(`.${extension}`)
    ) {
      throw new Error(`File extension .${extension} is not allowed`);
    }

    // Validate file exists
    if (!existsSync(file.path)) {
      throw new Error('Uploaded file not found');
    }
  }

  /**
   * Process uploaded file
   */
  private async processUploadedFile(
    file: Express.Multer.File,
    jobId: string
  ): Promise<UploadedFile> {
    const fileStats = await stat(file.path);
    const fileHash = await this.calculateFileHash(file.path);

    // Create permanent file path
    const permanentPath = join(
      this.config.tempDir,
      `${jobId}-${fileHash}.json`
    );

    // Move file to permanent location
    await writeFile(permanentPath, await readFile(file.path));

    // Remove original temp file
    await rm(file.path, { force: true });

    return {
      originalName: file.originalname,
      filename: `${jobId}-${fileHash}.json`,
      path: permanentPath,
      size: fileStats.size,
      mimetype: file.mimetype,
      uploadedAt: new Date().toISOString(),
    };
  }

  /**
   * Calculate file hash for integrity checking
   */
  private async calculateFileHash(filePath: string): Promise<string> {
    const content = await readFile(filePath);
    return createHash('sha256').update(content).digest('hex').substring(0, 16);
  }

  /**
   * Security scan for uploaded files
   */
  private async securityScan(file: UploadedFile): Promise<void> {
    try {
      // Read file content
      const content = await readFile(file.path, 'utf-8');

      // Check for suspicious patterns
      const suspiciousPatterns = [
        /eval\s*\(/,
        /Function\s*\(/,
        /document\.cookie/,
        /window\.location/,
        /<script.*>/i,
        /javascript\s*:/i,
        /vbscript\s*:/i,
        /onload\s*=/i,
        /onerror\s*=/i,
      ];

      for (const pattern of suspiciousPatterns) {
        if (pattern.test(content)) {
          throw new Error(`Suspicious content detected: ${pattern.source}`);
        }
      }

      // Validate JSON structure
      try {
        const parsed = JSON.parse(content);

        // Check for nested depth (potential DoS)
        if (this.getObjectDepth(parsed) > 50) {
          throw new Error('JSON structure too deeply nested');
        }

        // Check for array size (potential DoS)
        if (this.getMaxArrayLength(parsed) > 10000) {
          throw new Error('JSON arrays too large');
        }
      } catch (error) {
        if (error instanceof SyntaxError) {
          throw new Error('Invalid JSON format');
        }
        throw error;
      }
    } catch (error) {
      // Quarantine suspicious files
      await this.quarantineFile(file);
      throw error;
    }
  }

  /**
   * Move file to quarantine
   */
  private async quarantineFile(file: UploadedFile): Promise<void> {
    try {
      const quarantinePath = join(
        this.config.quarantineDir,
        `quarantine-${Date.now()}-${file.filename}`
      );
      await writeFile(quarantinePath, await readFile(file.path));
      await rm(file.path, { force: true });

      logger.warn('File quarantined:', {
        originalPath: file.path,
        quarantinePath,
        reason: 'Security scan failed',
      });
    } catch (error) {
      logger.error('Failed to quarantine file:', { error, file });
    }
  }

  /**
   * Get object depth for security checking
   */
  private getObjectDepth(obj: any): number {
    if (typeof obj !== 'object' || obj === null) return 0;

    let maxDepth = 0;
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const depth = this.getObjectDepth(obj[key]);
        maxDepth = Math.max(maxDepth, depth);
      }
    }

    return maxDepth + 1;
  }

  /**
   * Get maximum array length for security checking
   */
  private getMaxArrayLength(obj: any): number {
    if (Array.isArray(obj)) {
      let maxLength = obj.length;
      for (const item of obj) {
        maxLength = Math.max(maxLength, this.getMaxArrayLength(item));
      }
      return maxLength;
    }

    if (typeof obj === 'object' && obj !== null) {
      let maxLength = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          maxLength = Math.max(maxLength, this.getMaxArrayLength(obj[key]));
        }
      }
      return maxLength;
    }

    return 0;
  }

  /**
   * Emit progress update
   */
  private emitProgress(
    job: UploadJob,
    progress: number,
    step: string,
    details?: string
  ): void {
    job.progress = progress;

    const progressMessage = {
      jobId: job.id,
      progress,
      step,
      details,
    };

    job.emitter.emit('progress', progressMessage);
    this.emit('job:progress', progressMessage);
  }
}
