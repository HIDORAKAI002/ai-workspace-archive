/**
 * Batch Service
 * 
 * Handles batch processing of multiple Flowise files
 */

import { ConversionService } from './conversion.js';
import { ValidationService } from './validation.js';

export interface BatchJob {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  files: string[];
  results: any[];
  createdAt: Date;
  completedAt?: Date;
  error?: string;
}

export class BatchService {
  private jobs: Map<string, BatchJob> = new Map();
  private conversionService: ConversionService;
  private validationService: ValidationService;

  constructor() {
    this.conversionService = new ConversionService();
    this.validationService = new ValidationService();
  }

  async createBatchJob(files: string[]): Promise<BatchJob> {
    const job: BatchJob = {
      id: `batch_${Date.now()}`,
      status: 'pending',
      files,
      results: [],
      createdAt: new Date()
    };
    
    this.jobs.set(job.id, job);
    return job;
  }

  async processBatchJob(jobId: string): Promise<BatchJob> {
    const job = this.jobs.get(jobId);
    if (!job) {
      throw new Error(`Job ${jobId} not found`);
    }

    job.status = 'processing';
    
    try {
      for (const file of job.files) {
        const result = await this.conversionService.convertFile(file, {});
        job.results.push(result);
      }
      
      job.status = 'completed';
      job.completedAt = new Date();
    } catch (error) {
      job.status = 'failed';
      job.error = error instanceof Error ? error.message : 'Unknown error';
    }
    
    return job;
  }

  async getBatchJob(jobId: string): Promise<BatchJob | undefined> {
    return this.jobs.get(jobId);
  }

  async getAllJobs(): Promise<BatchJob[]> {
    return Array.from(this.jobs.values());
  }

  async cancelBatchJob(jobId: string): Promise<void> {
    const job = this.jobs.get(jobId);
    if (job && job.status === 'processing') {
      job.status = 'failed';
      job.error = 'Job cancelled';
    }
  }
}