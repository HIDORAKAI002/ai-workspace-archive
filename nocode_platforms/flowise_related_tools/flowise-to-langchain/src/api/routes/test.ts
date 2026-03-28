import { Router, Request, Response } from 'express'
import { TestingService } from '../services/TestingService'
import { AppDataSource } from '../../database/dataSource'

const router = Router()

/**
 * POST /api/v1/test/health
 * Health check endpoint
 */
router.post('/health', async (req: Request, res: Response) => {
    try {
        const testingService = new TestingService(AppDataSource)
        const result = await testingService.checkHealth()
        
        res.json({
            status: result.status,
            uptime: result.uptime,
            memory: result.memory,
            database: result.database,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Health check error:', error)
        res.status(500).json({
            status: 'error',
            error: error instanceof Error ? error.message : 'Health check failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/test/database
 * Test database operations
 */
router.post('/database', async (req: Request, res: Response) => {
    try {
        const { operation = 'read' } = req.body
        const testingService = new TestingService(AppDataSource)
        
        const result = await testingService.testDatabase(operation)
        
        res.json({
            success: result.success,
            operation,
            duration: result.duration,
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Database test error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Database test failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/test/performance
 * Run performance tests
 */
router.post('/performance', async (req: Request, res: Response) => {
    try {
        const { type = 'basic', iterations = 100 } = req.body
        const testingService = new TestingService(AppDataSource)
        
        const result = await testingService.runPerformanceTest(type, iterations)
        
        res.json({
            success: result.success,
            type,
            iterations,
            metrics: result.metrics,
            summary: result.summary,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Performance test error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Performance test failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/test/stress
 * Run stress tests
 */
router.post('/stress', async (req: Request, res: Response) => {
    try {
        const { duration = 60, concurrency = 10 } = req.body
        const testingService = new TestingService(AppDataSource)
        
        const result = await testingService.runStressTest(duration, concurrency)
        
        res.json({
            success: result.success,
            duration,
            concurrency,
            results: result.results,
            errors: result.errors,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Stress test error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Stress test failed',
            timestamp: new Date().toISOString()
        })
    }
})

export default router