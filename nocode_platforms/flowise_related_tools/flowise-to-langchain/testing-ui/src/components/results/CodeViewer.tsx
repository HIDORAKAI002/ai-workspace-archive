'use client'

import React, { useState, useEffect } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  vscDarkPlus,
  oneLight,
} from 'react-syntax-highlighter/dist/esm/styles/prism'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Copy, Download, Eye, EyeOff, FileText, Code, Zap } from 'lucide-react'
import { useTheme } from 'next-themes'
import { ConversionResult } from '@/types'

interface CodeViewerProps {
  conversionResult: ConversionResult
  title?: string
  className?: string
}

export function CodeViewer({
  conversionResult,
  title,
  className = '',
}: CodeViewerProps) {
  const { theme } = useTheme()
  const [activeLanguage, setActiveLanguage] = useState<
    'langchain' | 'python' | 'javascript'
  >('langchain')
  const [copied, setCopied] = useState(false)
  const [showLineNumbers, setShowLineNumbers] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const getCodeContent = () => {
    switch (activeLanguage) {
      case 'langchain':
        return conversionResult.langchainCode || ''
      case 'python':
        return conversionResult.pythonCode || ''
      case 'javascript':
        return conversionResult.javascriptCode || ''
      default:
        return ''
    }
  }

  const getLanguageDisplayName = () => {
    switch (activeLanguage) {
      case 'langchain':
        return 'LangChain'
      case 'python':
        return 'Python'
      case 'javascript':
        return 'JavaScript'
      default:
        return activeLanguage
    }
  }

  const getLanguageForHighlighter = () => {
    switch (activeLanguage) {
      case 'langchain':
        return 'python' // LangChain code is typically Python
      case 'python':
        return 'python'
      case 'javascript':
        return 'javascript'
      default:
        return 'text'
    }
  }

  const copyToClipboard = async () => {
    const code = getCodeContent()
    if (!code) return

    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code:', err)
    }
  }

  const downloadCode = () => {
    const code = getCodeContent()
    if (!code) return

    const extension = activeLanguage === 'javascript' ? 'js' : 'py'
    const filename = `converted-${activeLanguage}-${Date.now()}.${extension}`
    const blob = new Blob([code], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.click()
    URL.revokeObjectURL(url)
  }

  const getAvailableLanguages = () => {
    const languages = []
    if (conversionResult.langchainCode) languages.push('langchain')
    if (conversionResult.pythonCode) languages.push('python')
    if (conversionResult.javascriptCode) languages.push('javascript')
    return languages
  }

  const getStatusColor = () => {
    switch (conversionResult.status) {
      case 'completed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'processing':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getStatusIcon = () => {
    switch (conversionResult.status) {
      case 'completed':
        return <Zap className="h-4 w-4" />
      case 'failed':
        return <FileText className="h-4 w-4" />
      case 'processing':
        return <Code className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  const availableLanguages = getAvailableLanguages()
  const code = getCodeContent()
  const syntaxStyle = mounted && theme === 'dark' ? vscDarkPlus : oneLight

  if (!mounted) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {title || 'Code Viewer'}
          </CardTitle>
          <CardDescription>Loading code viewer...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse">
            <div className="h-64 rounded-lg bg-gray-200 dark:bg-gray-700"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            {title || 'Converted Code'}
          </CardTitle>
          <Badge className={`${getStatusColor()}`}>
            {getStatusIcon()}
            <span className="ml-1 capitalize">{conversionResult.status}</span>
          </Badge>
        </div>
        <CardDescription>
          View and download the converted code in different formats
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Language Selection */}
        <div className="mb-4 flex flex-wrap gap-2">
          {availableLanguages.map((lang) => (
            <Button
              key={lang}
              variant={activeLanguage === lang ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveLanguage(lang as typeof activeLanguage)}
              className="capitalize"
            >
              {lang === 'langchain' ? 'LangChain' : lang}
            </Button>
          ))}
        </div>

        {/* Code Actions */}
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline">{getLanguageDisplayName()}</Badge>
            {code && (
              <Badge variant="outline" className="text-xs">
                {code.split('\n').length} lines
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLineNumbers(!showLineNumbers)}
            >
              {showLineNumbers ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="ml-1">
                {showLineNumbers ? 'Hide' : 'Show'} Lines
              </span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={copyToClipboard}
              disabled={!code}
            >
              <Copy className="h-4 w-4" />
              <span className="ml-1">{copied ? 'Copied!' : 'Copy'}</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={downloadCode}
              disabled={!code}
            >
              <Download className="h-4 w-4" />
              <span className="ml-1">Download</span>
            </Button>
          </div>
        </div>

        {/* Code Display */}
        <div className="relative">
          {code ? (
            <div className="overflow-hidden rounded-lg border">
              <SyntaxHighlighter
                language={getLanguageForHighlighter()}
                style={syntaxStyle}
                showLineNumbers={showLineNumbers}
                wrapLongLines={true}
                customStyle={{
                  margin: 0,
                  fontSize: '14px',
                  lineHeight: '1.4',
                }}
              >
                {code}
              </SyntaxHighlighter>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center rounded-lg border bg-gray-50 dark:bg-gray-900">
              <div className="text-center">
                <Code className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                <p className="mb-2 text-gray-600 dark:text-gray-400">
                  No {getLanguageDisplayName()} code available
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  Try selecting a different language or check the conversion
                  status
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Errors and Warnings */}
        {conversionResult.errors && conversionResult.errors.length > 0 && (
          <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
            <h4 className="mb-2 font-medium text-red-800 dark:text-red-400">
              Errors:
            </h4>
            <ul className="space-y-1">
              {conversionResult.errors.map((error, index) => (
                <li
                  key={index}
                  className="text-sm text-red-700 dark:text-red-300"
                >
                  • {error}
                </li>
              ))}
            </ul>
          </div>
        )}

        {conversionResult.warnings && conversionResult.warnings.length > 0 && (
          <div className="mt-4 rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
            <h4 className="mb-2 font-medium text-yellow-800 dark:text-yellow-400">
              Warnings:
            </h4>
            <ul className="space-y-1">
              {conversionResult.warnings.map((warning, index) => (
                <li
                  key={index}
                  className="text-sm text-yellow-700 dark:text-yellow-300"
                >
                  • {warning}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
