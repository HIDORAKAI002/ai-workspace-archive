import { Router, Request, Response } from 'express'
import { ValidationService } from '../services/ValidationService'
import { AppDataSource } from '../../database/dataSource'

const router = Router()

/**
 * POST /api/v1/validate/connection
 * Validate database connection
 */
router.post('/connection', async (req: Request, res: Response) => {
    try {
        const validationService = new ValidationService(AppDataSource)
        const result = await validationService.validateConnection()
        
        res.json({
            success: result.success,
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Connection validation error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Connection validation failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/validate/schema
 * Validate database schema
 */
router.post('/schema', async (req: Request, res: Response) => {
    try {
        const validationService = new ValidationService(AppDataSource)
        const result = await validationService.validateSchema()
        
        res.json({
            success: result.success,
            message: result.message,
            details: result.details,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Schema validation error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Schema validation failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/validate/data
 * Validate data integrity
 */
router.post('/data', async (req: Request, res: Response) => {
    try {
        const { entity, id } = req.body
        const validationService = new ValidationService(AppDataSource)
        
        if (!entity) {
            return res.status(400).json({
                success: false,
                error: 'Entity name is required',
                timestamp: new Date().toISOString()
            })
        }
        
        const result = await validationService.validateData(entity, id)
        
        res.json({
            success: result.success,
            message: result.message,
            data: result.data,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Data validation error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Data validation failed',
            timestamp: new Date().toISOString()
        })
    }
})

export default router