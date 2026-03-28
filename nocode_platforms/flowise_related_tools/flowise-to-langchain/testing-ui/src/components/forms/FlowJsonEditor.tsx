'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { EditorView } from '@codemirror/view'
import { EditorState } from '@codemirror/state'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { basicSetup } from 'codemirror'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Code,
  CheckCircle,
  AlertCircle,
  Copy,
  Download,
  RefreshCw,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { api } from '@/lib/api'
import { FlowiseFlow } from '@/types'

interface FlowJsonEditorProps {
  value?: string
  onChange?: (value: string) => void
  onValidate?: (isValid: boolean, errors?: string[]) => void
  readOnly?: boolean
  className?: string
  height?: number
  showValidation?: boolean
  autoValidate?: boolean
  flowId?: string
}

export function FlowJsonEditor({
  value = '',
  onChange,
  onValidate,
  readOnly = false,
  className,
  height = 400,
  showValidation = true,
  autoValidate = true,
  flowId,
}: FlowJsonEditorProps) {
  const [editorView, setEditorView] = useState<EditorView | null>(null)
  const [editorRef, setEditorRef] = useState<HTMLDivElement | null>(null)
  const [isValidating, setIsValidating] = useState(false)
  const [validationResult, setValidationResult] = useState<{
    isValid: boolean
    errors: string[]
    warnings: string[]
    nodeCount: number
    edgeCount: number
  } | null>(null)
  const [currentValue, setCurrentValue] = useState(value)

  // Initialize CodeMirror
  useEffect(() => {
    if (!editorRef) return

    const startState = EditorState.create({
      doc: currentValue,
      extensions: [
        basicSetup,
        javascript({ jsx: true }),
        oneDark,
        EditorView.theme({
          '&': {
            height: `${height}px`,
            fontSize: '14px',
          },
          '.cm-editor': {
            height: '100%',
          },
          '.cm-scroller': {
            height: '100%',
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            const newValue = update.state.doc.toString()
            setCurrentValue(newValue)
            onChange?.(newValue)

            if (autoValidate) {
              debounceValidation(newValue)
            }
          }
        }),
        EditorView.editable.of(!readOnly),
      ],
    })

    const view = new EditorView({
      state: startState,
      parent: editorRef,
    })

    setEditorView(view)

    return () => {
      view.destroy()
    }
  }, [editorRef, height, readOnly])

  // Update editor when value changes externally
  useEffect(() => {
    if (editorView && value !== currentValue) {
      const transaction = editorView.state.update({
        changes: { from: 0, to: editorView.state.doc.length, insert: value },
      })
      editorView.dispatch(transaction)
      setCurrentValue(value)
    }
  }, [value, editorView, currentValue])

  // Debounced validation
  const debounceValidation = useCallback(
    debounce((value: string) => {
      validateJson(value)
    }, 500),
    []
  )

  const validateJson = useCallback(
    async (jsonString: string) => {
      if (!jsonString.trim()) {
        setValidationResult(null)
        onValidate?.(true, [])
        return
      }

      setIsValidating(true)

      try {
        const parsed = JSON.parse(jsonString)

        // Basic structure validation
        const errors: string[] = []
        const warnings: string[] = []

        if (!parsed.nodes || !Array.isArray(parsed.nodes)) {
          errors.push('Missing or invalid "nodes" array')
        }

        if (!parsed.edges || !Array.isArray(parsed.edges)) {
          errors.push('Missing or invalid "edges" array')
        }

        // Node validation
        if (parsed.nodes) {
          parsed.nodes.forEach((node: any, index: number) => {
            if (!node.id) {
              errors.push(`Node ${index} is missing required "id" field`)
            }
            if (!node.type) {
              errors.push(`Node ${index} is missing required "type" field`)
            }
            if (!node.position) {
              warnings.push(`Node ${index} is missing position information`)
            }
          })
        }

        // Edge validation
        if (parsed.edges) {
          parsed.edges.forEach((edge: any, index: number) => {
            if (!edge.id) {
              errors.push(`Edge ${index} is missing required "id" field`)
            }
            if (!edge.source) {
              errors.push(`Edge ${index} is missing required "source" field`)
            }
            if (!edge.target) {
              errors.push(`Edge ${index} is missing required "target" field`)
            }
          })
        }

        // Advanced validation via API if available
        if (errors.length === 0) {
          try {
            const apiResult = await api.flows.validate(parsed)
            if (!apiResult.success && apiResult.error) {
              errors.push(apiResult.error)
            }
          } catch (apiError) {
            warnings.push('Could not validate with API service')
          }
        }

        const result = {
          isValid: errors.length === 0,
          errors,
          warnings,
          nodeCount: parsed.nodes ? parsed.nodes.length : 0,
          edgeCount: parsed.edges ? parsed.edges.length : 0,
        }

        setValidationResult(result)
        onValidate?.(result.isValid, errors)
      } catch (error) {
        const result = {
          isValid: false,
          errors: [
            error instanceof Error ? error.message : 'Invalid JSON format',
          ],
          warnings: [],
          nodeCount: 0,
          edgeCount: 0,
        }

        setValidationResult(result)
        onValidate?.(false, result.errors)
      } finally {
        setIsValidating(false)
      }
    },
    [onValidate]
  )

  const handleValidate = () => {
    validateJson(currentValue)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentValue)
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error)
    }
  }

  const handleDownload = () => {
    const blob = new Blob([currentValue], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `flow-${flowId || 'export'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(currentValue)
      const formatted = JSON.stringify(parsed, null, 2)

      if (editorView) {
        const transaction = editorView.state.update({
          changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: formatted,
          },
        })
        editorView.dispatch(transaction)
      }
    } catch (error) {
      console.error('Failed to format JSON:', error)
    }
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Code className="h-5 w-5" />
              Flow JSON Editor
            </CardTitle>
            <CardDescription>
              Edit and validate Flowise flow JSON data
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleFormat}
              disabled={readOnly}
              title="Format JSON"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              title="Copy to clipboard"
            >
              <Copy className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownload}
              title="Download JSON"
            >
              <Download className="h-4 w-4" />
            </Button>
            {showValidation && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleValidate}
                disabled={isValidating}
                title="Validate JSON"
              >
                {isValidating ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                ) : (
                  <CheckCircle className="h-4 w-4" />
                )}
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Editor */}
          <div className="relative">
            <div
              ref={setEditorRef}
              className="overflow-hidden rounded-md border"
              style={{ height: `${height}px` }}
            />
          </div>

          {/* Validation Results */}
          {showValidation && validationResult && (
            <div
              className={cn('rounded-lg border p-4', {
                'border-green-200 bg-green-50': validationResult.isValid,
                'border-red-200 bg-red-50': !validationResult.isValid,
              })}
            >
              <div className="flex items-start gap-2">
                {validationResult.isValid ? (
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" />
                ) : (
                  <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" />
                )}
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2">
                    <p
                      className={cn('text-sm font-medium', {
                        'text-green-800': validationResult.isValid,
                        'text-red-800': !validationResult.isValid,
                      })}
                    >
                      {validationResult.isValid ? 'Valid JSON' : 'Invalid JSON'}
                    </p>
                    {validationResult.isValid && (
                      <div className="flex gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {validationResult.nodeCount} nodes
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {validationResult.edgeCount} edges
                        </Badge>
                      </div>
                    )}
                  </div>

                  {/* Errors */}
                  {validationResult.errors.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-red-800">
                        Errors:
                      </p>
                      <ul className="space-y-1 text-xs text-red-700">
                        {validationResult.errors.map((error, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-red-500">•</span>
                            {error}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Warnings */}
                  {validationResult.warnings.length > 0 && (
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-yellow-800">
                        Warnings:
                      </p>
                      <ul className="space-y-1 text-xs text-yellow-700">
                        {validationResult.warnings.map((warning, index) => (
                          <li key={index} className="flex items-start gap-1">
                            <span className="text-yellow-500">•</span>
                            {warning}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Utility function for debouncing
function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}
