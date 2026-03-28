/**
 * Job Service
 * 
 * Manages background jobs and task queues
 */

export interface Job {
  id: string;
  type: 'conversion' | 'validation' | 'test' | 'batch';
  status: 'queued' | 'running' | 'completed' | 'failed';
  data: any;
  result?: any;
  error?: string;
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  progress?: number;
}

export class JobService {
  private jobs: Map<string, Job> = new Map();
  private queue: Job[] = [];

  async createJob(type: Job['type'], data: any): Promise<Job> {
    const job: Job = {
      id: `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      status: 'queued',
      data,
      createdAt: new Date()
    };
    
    this.jobs.set(job.id, job);
    this.queue.push(job);
    
    return job;
  }

  async getJob(jobId: string): Promise<Job | undefined> {
    return this.jobs.get(jobId);
  }

  async getAllJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async updateJobStatus(
    jobId: string, 
    status: Job['status'], 
    result?: any, 
    error?: string
  ): Promise<Job | undefined> {
    const job = this.jobs.get(jobId);
    if (!job) return undefined;
    
    job.status = status;
    
    if (status === 'running' && !job.startedAt) {
      job.startedAt = new Date();
    }
    
    if (status === 'completed' || status === 'failed') {
      job.completedAt = new Date();
    }
    
    if (result !== undefined) {
      job.result = result;
    }
    
    if (error !== undefined) {
      job.error = error;
    }
    
    return job;
  }

  async updateJobProgress(jobId: string, progress: number): Promise<void> {
    const job = this.jobs.get(jobId);
    if (job) {
      job.progress = Math.min(100, Math.max(0, progress));
    }
  }

  async deleteJob(jobId: string): Promise<boolean> {
    return this.jobs.delete(jobId);
  }

  async getQueuedJobs(): Promise<Job[]> {
    return this.queue.filter(job => job.status === 'queued');
  }

  async getNextJob(): Promise<Job | undefined> {
    return this.queue.find(job => job.status === 'queued');
  }
}