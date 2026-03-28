import { Router, Request, Response } from 'express'
import { FileUploadService } from '../services/FileUploadService'
import { AppDataSource } from '../../database/dataSource'
import multer from 'multer'
import path from 'path'

const router = Router()

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(process.cwd(), 'uploads'))
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|pdf|txt|json|csv|xlsx|xls/
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
        const mimetype = allowedTypes.test(file.mimetype)
        
        if (extname && mimetype) {
            return cb(null, true)
        } else {
            cb(new Error('Invalid file type'))
        }
    }
})

/**
 * POST /api/v1/upload/file
 * Upload a single file
 */
router.post('/file', upload.single('file'), async (req: Request, res: Response) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                error: 'No file uploaded',
                timestamp: new Date().toISOString()
            })
        }
        
        const fileUploadService = new FileUploadService(AppDataSource)
        const result = await fileUploadService.uploadFile(req.file, req.body.metadata)
        
        res.json({
            success: true,
            file: {
                id: result.id,
                filename: result.filename,
                originalName: result.originalName,
                size: result.size,
                mimeType: result.mimeType,
                path: result.path
            },
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('File upload error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'File upload failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/upload/multiple
 * Upload multiple files
 */
router.post('/multiple', upload.array('files', 10), async (req: Request, res: Response) => {
    try {
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                error: 'No files uploaded',
                timestamp: new Date().toISOString()
            })
        }
        
        const fileUploadService = new FileUploadService(AppDataSource)
        const results = await fileUploadService.uploadMultipleFiles(req.files, req.body.metadata)
        
        res.json({
            success: true,
            files: results.map(result => ({
                id: result.id,
                filename: result.filename,
                originalName: result.originalName,
                size: result.size,
                mimeType: result.mimeType,
                path: result.path
            })),
            count: results.length,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Multiple files upload error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Multiple files upload failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * POST /api/v1/upload/process
 * Process uploaded file
 */
router.post('/process', async (req: Request, res: Response) => {
    try {
        const { fileId, action } = req.body
        
        if (!fileId || !action) {
            return res.status(400).json({
                success: false,
                error: 'File ID and action are required',
                timestamp: new Date().toISOString()
            })
        }
        
        const fileUploadService = new FileUploadService(AppDataSource)
        const result = await fileUploadService.processFile(fileId, action)
        
        res.json({
            success: result.success,
            fileId,
            action,
            result: result.data,
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('File processing error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'File processing failed',
            timestamp: new Date().toISOString()
        })
    }
})

/**
 * DELETE /api/v1/upload/:fileId
 * Delete uploaded file
 */
router.delete('/:fileId', async (req: Request, res: Response) => {
    try {
        const { fileId } = req.params
        
        const fileUploadService = new FileUploadService(AppDataSource)
        const result = await fileUploadService.deleteFile(fileId)
        
        res.json({
            success: result.success,
            message: result.message,
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('File deletion error:', error)
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'File deletion failed',
            timestamp: new Date().toISOString()
        })
    }
})

export default router