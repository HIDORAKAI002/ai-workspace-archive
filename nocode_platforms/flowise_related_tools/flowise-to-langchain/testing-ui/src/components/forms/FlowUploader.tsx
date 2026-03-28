'use client'

import React, { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileText, AlertCircle, CheckCircle, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { api } from '@/lib/api'
import { FlowiseFlow } from '@/types'

interface FlowUploaderProps {
  onUpload?: (flow: FlowiseFlow) => void
  onError?: (error: string) => void
  className?: string
  disabled?: boolean
}

export function FlowUploader({
  onUpload,
  onError,
  className,
  disabled = false,
}: FlowUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [dragActive, setDragActive] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    message: string
    details?: any
  } | null>(null)

  const validateFlowFile = useCallback(async (file: File) => {
    try {
      const text = await file.text()
      const flowData = JSON.parse(text)

      // Basic validation
      if (!flowData.nodes || !Array.isArray(flowData.nodes)) {
        throw new Error('Invalid flow format: missing or invalid nodes array')
      }

      if (!flowData.edges || !Array.isArray(flowData.edges)) {
        throw new Error('Invalid flow format: missing or invalid edges array')
      }

      // Validate with API
      const result = await api.flows.validate(flowData)

      if (result.success) {
        setValidationResult({
          isValid: true,
          message: 'Flow file is valid and ready to upload',
          details: result.data,
        })
        return true
      } else {
        setValidationResult({
          isValid: false,
          message: result.error || 'Flow validation failed',
          details: result.data,
        })
        return false
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Invalid JSON format'
      setValidationResult({
        isValid: false,
        message,
        details: null,
      })
      return false
    }
  }, [])

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (disabled || acceptedFiles.length === 0) return

      const file = acceptedFiles[0]
      setUploadedFile(file)
      setValidationResult(null)

      // Validate the file
      await validateFlowFile(file)
    },
    [disabled, validateFlowFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
    disabled: disabled || uploading,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDropAccepted: () => setDragActive(false),
    onDropRejected: () => setDragActive(false),
  })

  const handleUpload = async () => {
    if (!uploadedFile || !validationResult?.isValid) return

    setUploading(true)
    try {
      const flow = await api.flows.upload(uploadedFile)
      onUpload?.(flow)

      // Reset state
      setUploadedFile(null)
      setValidationResult(null)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed'
      onError?.(message)
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setValidationResult(null)
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload Flowise Flow
        </CardTitle>
        <CardDescription>
          Upload a Flowise flow JSON file to start testing and conversion
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={cn(
              'cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors',
              'hover:border-primary/50 hover:bg-primary/5',
              {
                'border-primary bg-primary/10': dragActive,
                'border-muted-foreground/25': !dragActive && !uploadedFile,
                'border-green-500 bg-green-50':
                  uploadedFile && validationResult?.isValid,
                'border-red-500 bg-red-50':
                  uploadedFile && validationResult && !validationResult.isValid,
                'cursor-not-allowed opacity-50': disabled || uploading,
              }
            )}
          >
            <input {...getInputProps()} />

            {!uploadedFile ? (
              <div className="space-y-2">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">
                    {isDragActive
                      ? 'Drop the file here'
                      : 'Drag & drop a flow file here'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    or click to select a file
                  </p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Supports JSON files exported from Flowise
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <FileText className="mx-auto h-12 w-12 text-primary" />
                <div>
                  <p className="text-sm font-medium">{uploadedFile.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveFile}
                  disabled={uploading}
                  className="mt-2"
                >
                  <X className="mr-1 h-4 w-4" />
                  Remove
                </Button>
              </div>
            )}
          </div>

          {/* Validation Results */}
          {validationResult && (
            <div
              className={cn('rounded-lg border p-4', {
                'border-green-200 bg-green-50': validationResult.isValid,
                'border-red-200 bg-red-50': !validationResult.isValid,
              })}
            >
              <div className="flex items-start gap-2">
                {validationResult.isValid ? (
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-5 w-5 text-red-600" />
                )}
                <div className="flex-1">
                  <p
                    className={cn('text-sm font-medium', {
                      'text-green-800': validationResult.isValid,
                      'text-red-800': !validationResult.isValid,
                    })}
                  >
                    {validationResult.message}
                  </p>
                  {validationResult.details && (
                    <div className="mt-2 text-xs text-muted-foreground">
                      <pre className="whitespace-pre-wrap">
                        {JSON.stringify(validationResult.details, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Upload Button */}
          {uploadedFile && validationResult?.isValid && (
            <div className="flex justify-end">
              <Button
                onClick={handleUpload}
                disabled={uploading}
                className="min-w-32"
              >
                {uploading ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Flow
                  </>
                )}
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
