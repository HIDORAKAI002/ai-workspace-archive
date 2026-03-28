import { Router, Request, Response } from 'express'
import { BatchService } from '../services/BatchService'
import { AppDataSource } from '../../database/dataSource'

const router = Router()

/**
 * POST /api/v1/batch/create
 * Create a new batch job
 */
router.post('/create', async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { type, data, options } = req.body
        
        if (!type || !data) {
            return res.status(400).json({
                success: false,
                error: 'Type and data are required',
                timestamp: new Date().toISOString()
            })
        }
        
        const batchService = new BatchService()
        const result = await batchService.createBatch(type, data, options)
        
        res.json({
            success: true,
            batchId: result.id,
            status: result.status,
            totalItems: result.totalItems,
            message: 'Batch job created successfully',
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Batch creation error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Batch creation failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/batch/execute/:batchId
 * Execute a batch job
 */
router.post('/execute/:batchId', async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { batchId } = req.params
        const { async = true } = req.body
        
        const batchService = new BatchService()
        
        if (async) {
            // Start async execution
            batchService.executeBatchAsync(batchId)
            
            res.json({
                success: true,
                batchId,
                status: 'processing',
                message: 'Batch execution started',
                timestamp: new Date().toISOString()
            })
        } else {
            // Execute synchronously
            const result = await batchService.executeBatch(batchId)
            
            res.json({
                success: result.success,
                batchId,
                status: result.status,
                processed: result.processed,
                failed: result.failed,
                results: result.results,
                timestamp: new Date().toISOString()
            })
        }
    } catch (error) {
        console.error('Batch execution error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Batch execution failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/batch/status/:batchId
 * Get batch job status
 */
router.get('/status/:batchId', async (req: Request, res: Response): Promise<Response | void> => {
    try {
        const { batchId } = req.params
        
        const batchService = new BatchService()
        const result = await batchService.getBatchStatus(batchId)
        
        if (!result) {
            return res.status(404).json({
                success: false,
                error: 'Batch job not found',
                timestamp: new Date().toISOString()
            })
        }
        
        res.json({
            success: true,
            batchId: result.id,
            status: result.status,
            progress: {
                total: result.totalItems,
                processed: result.processedItems,
                failed: result.failedItems,
                percentage: result.progressPercentage
            },
            startTime: result.startTime,
            endTime: result.endTime,
            duration: result.duration,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Batch status error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get batch status',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/batch/cancel/:batchId
 * Cancel a batch job
 */
router.post('/cancel/:batchId', async (req: Request, res: Response) => {
    try {
        const { batchId } = req.params
        
        const batchService = new BatchService()
        const result = await batchService.cancelBatch(batchId)
        
        res.json({
            success: result.success,
            batchId,
            status: result.status,
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Batch cancellation error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Batch cancellation failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/batch/results/:batchId
 * Get batch job results
 */
router.get('/results/:batchId', async (req: Request, res: Response) => {
    try {
        const { batchId } = req.params
        const { page = 1, limit = 100 } = req.query
        
        const batchService = new BatchService()
        const result = await batchService.getBatchResults(batchId, Number(page), Number(limit))
        
        res.json({
            success: true,
            batchId,
            results: result.results,
            pagination: {
                page: result.page,
                limit: result.limit,
                total: result.total,
                totalPages: result.totalPages
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Batch results error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get batch results',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * DELETE /api/v1/batch/:batchId
 * Delete a batch job
 */
router.delete('/:batchId', async (req: Request, res: Response) => {
    try {
        const { batchId } = req.params
        
        const batchService = new BatchService()
        const result = await batchService.deleteBatch(batchId)
        
        res.json({
            success: result.success,
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Batch deletion error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Batch deletion failed',
            timestamp: new Date().toISOString()
        })
    }
})

export default router