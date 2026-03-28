import { Router, Request, Response } from 'express'
import { StatsService } from '../services/StatsService'
import { AppDataSource } from '../../database/dataSource'

const router = Router()

/**
 * GET /api/v1/stats/overview
 * Get system overview statistics
 */
router.get('/overview', async (req: Request, res: Response) => {
    try {
        const statsService = new StatsService(AppDataSource)
        const stats = await statsService.getOverviewStats()
        
        res.json({
            success: true,
            stats: {
                totalChatflows: stats.totalChatflows,
                activeChatflows: stats.activeChatflows,
                totalMessages: stats.totalMessages,
                totalUsers: stats.totalUsers,
                totalTokens: stats.totalTokens,
                totalApiCalls: stats.totalApiCalls,
                systemUptime: stats.systemUptime,
                lastUpdated: stats.lastUpdated
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Overview stats error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get overview stats',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/stats/usage
 * Get usage statistics
 */
router.get('/usage', async (req: Request, res: Response) => {
    try {
        const { period = '7d', groupBy = 'day' } = req.query
        
        const statsService = new StatsService(AppDataSource)
        const usage = await statsService.getUsageStats(period as string, groupBy as string)
        
        res.json({
            success: true,
            period,
            groupBy,
            usage: {
                messages: usage.messages,
                tokens: usage.tokens,
                apiCalls: usage.apiCalls,
                errors: usage.errors,
                averageResponseTime: usage.averageResponseTime
            },
            chart: usage.chartData,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Usage stats error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get usage stats',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/stats/performance
 * Get performance statistics
 */
router.get('/performance', async (req: Request, res: Response) => {
    try {
        const { period = '1h' } = req.query
        
        const statsService = new StatsService(AppDataSource)
        const performance = await statsService.getPerformanceStats(period as string)
        
        res.json({
            success: true,
            period,
            performance: {
                averageResponseTime: performance.averageResponseTime,
                p95ResponseTime: performance.p95ResponseTime,
                p99ResponseTime: performance.p99ResponseTime,
                successRate: performance.successRate,
                errorRate: performance.errorRate,
                throughput: performance.throughput
            },
            metrics: performance.metrics,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Performance stats error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get performance stats',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/stats/chatflows
 * Get chatflow statistics
 */
router.get('/chatflows', async (req: Request, res: Response) => {
    try {
        const { chatflowId } = req.query
        
        const statsService = new StatsService(AppDataSource)
        const stats = await statsService.getChatflowStats(chatflowId as string)
        
        res.json({
            success: true,
            stats: {
                chatflows: stats.chatflows,
                totalMessages: stats.totalMessages,
                averageMessagesPerChatflow: stats.averageMessagesPerChatflow,
                mostActive: stats.mostActive,
                leastActive: stats.leastActive,
                byStatus: stats.byStatus
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Chatflow stats error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get chatflow stats',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/stats/models
 * Get model usage statistics
 */
router.get('/models', async (req: Request, res: Response) => {
    try {
        const { period = '30d' } = req.query
        
        const statsService = new StatsService(AppDataSource)
        const modelStats = await statsService.getModelStats(period as string)
        
        res.json({
            success: true,
            period,
            models: modelStats.models,
            totalUsage: modelStats.totalUsage,
            byProvider: modelStats.byProvider,
            costs: modelStats.costs,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Model stats error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get model stats',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * GET /api/v1/stats/errors
 * Get error statistics
 */
router.get('/errors', async (req: Request, res: Response) => {
    try {
        const { period = '24h', groupBy = 'type' } = req.query
        
        const statsService = new StatsService(AppDataSource)
        const errorStats = await statsService.getErrorStats(period as string, groupBy as string)
        
        res.json({
            success: true,
            period,
            groupBy,
            errors: {
                total: errorStats.total,
                byType: errorStats.byType,
                byEndpoint: errorStats.byEndpoint,
                recent: errorStats.recent,
                trends: errorStats.trends
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Error stats error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to get error stats',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/stats/export
 * Export statistics
 */
router.post('/export', async (req: Request, res: Response) => {
    try {
        const { type, period, format = 'json' } = req.body
        
        if (!type || !period) {
            return res.status(400).json({
                success: false,
                error: 'Type and period are required',
                timestamp: new Date().toISOString()
            })
        }
        
        const statsService = new StatsService(AppDataSource)
        const exportData = await statsService.exportStats(type, period, format)
        
        // Set appropriate headers based on format
        if (format === 'csv') {
            res.setHeader('Content-Type', 'text/csv')
            res.setHeader('Content-Disposition', `attachment; filename=stats-${type}-${Date.now()}.csv`)
        } else if (format === 'excel') {
            res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
            res.setHeader('Content-Disposition', `attachment; filename=stats-${type}-${Date.now()}.xlsx`)
        } else {
            res.setHeader('Content-Type', 'application/json')
        }
        
        res.send(exportData)
    } catch (error) {
        console.error('Stats export error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to export stats',
            timestamp: new Date().toISOString()
        })
    }
})

export default router