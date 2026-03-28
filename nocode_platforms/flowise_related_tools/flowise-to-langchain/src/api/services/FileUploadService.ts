/**
 * File Upload Service
 * 
 * Handles file uploads and processing
 */

import * as fs from 'fs/promises';
import * as path from 'path';
import { createHash } from 'crypto';

export interface UploadedFile {
  id: string;
  originalName: string;
  filename: string;
  path: string;
  size: number;
  mimeType: string;
  hash: string;
  uploadedAt: Date;
}

export interface UploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
  destination?: string;
}

export class FileUploadService {
  private uploadDir: string;
  private uploads: Map<string, UploadedFile> = new Map();

  constructor(uploadDir: string = './uploads') {
    this.uploadDir = uploadDir;
    this.ensureUploadDir();
  }

  private async ensureUploadDir(): Promise<void> {
    try {
      await fs.mkdir(this.uploadDir, { recursive: true });
    } catch (error) {
      console.error('Failed to create upload directory:', error);
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    options: UploadOptions = {}
  ): Promise<UploadedFile> {
    // Validate file size
    if (options.maxSize && file.size > options.maxSize) {
      throw new Error(`File size exceeds maximum allowed size of ${options.maxSize} bytes`);
    }

    // Validate file type
    if (options.allowedTypes && !options.allowedTypes.includes(file.mimetype)) {
      throw new Error(`File type ${file.mimetype} is not allowed`);
    }

    // Generate unique filename
    const fileId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const ext = path.extname(file.originalname);
    const filename = `${fileId}${ext}`;
    
    // Determine destination
    const destination = options.destination || this.uploadDir;
    const filepath = path.join(destination, filename);

    // Calculate file hash
    const fileBuffer = file.buffer;
    const hash = createHash('sha256').update(fileBuffer).digest('hex');

    // Save file
    await fs.writeFile(filepath, fileBuffer);

    // Create upload record
    const uploadedFile: UploadedFile = {
      id: fileId,
      originalName: file.originalname,
      filename,
      path: filepath,
      size: file.size,
      mimeType: file.mimetype,
      hash,
      uploadedAt: new Date()
    };

    this.uploads.set(fileId, uploadedFile);

    return uploadedFile;
  }

  async getFile(fileId: string): Promise<UploadedFile | undefined> {
    return this.uploads.get(fileId);
  }

  async readFile(fileId: string): Promise<Buffer> {
    const file = this.uploads.get(fileId);
    if (!file) {
      throw new Error(`File ${fileId} not found`);
    }

    return await fs.readFile(file.path);
  }

  async deleteFile(fileId: string): Promise<boolean> {
    const file = this.uploads.get(fileId);
    if (!file) {
      return false;
    }

    try {
      await fs.unlink(file.path);
      this.uploads.delete(fileId);
      return true;
    } catch (error) {
      console.error('Failed to delete file:', error);
      return false;
    }
  }

  async processFlowiseFile(fileId: string): Promise<any> {
    const file = this.uploads.get(fileId);
    if (!file) {
      throw new Error(`File ${fileId} not found`);
    }

    const content = await fs.readFile(file.path, 'utf-8');
    
    try {
      const flowData = JSON.parse(content);
      
      // Validate it's a Flowise export
      if (!flowData.nodes || !flowData.edges) {
        throw new Error('Invalid Flowise export format');
      }

      return flowData;
    } catch (error) {
      throw new Error(`Failed to parse Flowise file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  async getAllUploads(): Promise<UploadedFile[]> {
    return Array.from(this.uploads.values());
  }

  async cleanupOldFiles(maxAgeMs: number = 24 * 60 * 60 * 1000): Promise<number> {
    const now = Date.now();
    let deletedCount = 0;

    for (const [fileId, file] of this.uploads.entries()) {
      const age = now - file.uploadedAt.getTime();
      if (age > maxAgeMs) {
        if (await this.deleteFile(fileId)) {
          deletedCount++;
        }
      }
    }

    return deletedCount;
  }
}