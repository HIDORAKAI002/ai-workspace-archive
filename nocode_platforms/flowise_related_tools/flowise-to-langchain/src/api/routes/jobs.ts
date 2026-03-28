import { Router, Request, Response } from 'express'
import { JobService } from '../services/JobService'
import { AppDataSource } from '../../database/dataSource'

const router = Router()

/**
 * POST /api/v1/jobs/create
 * Create a new job
 */
router.post('/create', async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { type, name, config, schedule } = req.body
        
        if (!type || !name) {
            return res.status(400).json({
                success: false,
                error: 'Type and name are required',
                timestamp: new Date().toISOString()
            })
        }
        
        const jobService = new JobService()
        const result = await jobService.createJob({
            type,
            name,
            config,
            schedule
        })
        
        res.json({
            success: true,
            job: {
                id: result.id,
                name: result.name,
                type: result.type,
                status: result.status,
                schedule: result.schedule,
                nextRun: result.nextRun
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Job creation error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Job creation failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/jobs
 * List all jobs
 */
router.get('/', async (req: Request, res: Response) => {
    try {
        const { status, type, page = 1, limit = 20 } = req.query
        
        const jobService = new JobService()
        const result = await jobService.listJobs({
            status: status as string,
            type: type as string,
            page: Number(page),
            limit: Number(limit)
        })
        
        res.json({
            success: true,
            jobs: result.jobs,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Jobs listing error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to list jobs',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/jobs/:jobId
 * Get job details
 */
router.get('/:jobId', async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { jobId } = req.params
        
        const jobService = new JobService()
        const job = await jobService.getJob(jobId)
        
        if (!job) {
            return res.status(404).json({
                success: false,
                error: 'Job not found',
                timestamp: new Date().toISOString()
            })
        }
        
        res.json({
            success: true,
            job,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Job retrieval error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get job',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/jobs/:jobId/start
 * Start a job
 */
router.post('/:jobId/start', async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params
        
        const jobService = new JobService()
        const result = await jobService.startJob(jobId)
        
        res.json({
            success: result.success,
            job: {
                id: result.job.id,
                status: result.job.status,
                startedAt: result.job.startedAt
            },
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Job start error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to start job',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/jobs/:jobId/stop
 * Stop a job
 */
router.post('/:jobId/stop', async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params
        
        const jobService = new JobService()
        const result = await jobService.stopJob(jobId)
        
        res.json({
            success: result.success,
            job: {
                id: result.job.id,
                status: result.job.status,
                stoppedAt: result.job.stoppedAt
            },
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Job stop error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to stop job',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * PUT /api/v1/jobs/:jobId
 * Update a job
 */
router.put('/:jobId', async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params
        const updates = req.body
        
        const jobService = new JobService()
        const result = await jobService.updateJob(jobId, updates)
        
        res.json({
            success: true,
            job: result,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Job update error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to update job',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * DELETE /api/v1/jobs/:jobId
 * Delete a job
 */
router.delete('/:jobId', async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params
        
        const jobService = new JobService()
        const result = await jobService.deleteJob(jobId)
        
        res.json({
            success: result.success,
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Job deletion error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to delete job',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/jobs/:jobId/logs
 * Get job logs
 */
router.get('/:jobId/logs', async (req: Request, res: Response) => {
    try {
        const { jobId } = req.params
        const { page = 1, limit = 100 } = req.query
        
        const jobService = new JobService()
        const result = await jobService.getJobLogs(jobId, Number(page), Number(limit))
        
        res.json({
            success: true,
            logs: result.logs,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Job logs error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get job logs',
            timestamp: new Date().toISOString()
        })
    }
})

export default router