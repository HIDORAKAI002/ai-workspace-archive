'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { formatDate } from '@/lib/utils'
import {
  User,
  Bot,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface MessageBubbleProps {
  message: {
    id: string
    role: 'user' | 'assistant' | 'system'
    content: string
    timestamp: Date
    metadata?: {
      flowId?: string
      testResult?: {
        id: string
        status: 'pending' | 'running' | 'passed' | 'failed' | 'error'
        duration?: number
        input?: any
        output?: any
        error?: string
      }
      isTyping?: boolean
      error?: string
    }
  }
  isTyping?: boolean
  className?: string
}

export function MessageBubble({
  message,
  isTyping,
  className,
}: MessageBubbleProps) {
  const isUser = message.role === 'user'
  const isSystem = message.role === 'system'
  const isAssistant = message.role === 'assistant'

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'failed':
      case 'error':
        return <AlertCircle className="h-3 w-3 text-red-500" />
      case 'running':
        return <Clock className="h-3 w-3 text-blue-500" />
      default:
        return <Clock className="h-3 w-3 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'failed':
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (isSystem) {
    return (
      <div className={cn('mb-4 flex justify-center', className)}>
        <div className="flex items-center space-x-2 rounded-full bg-muted px-3 py-1 text-sm text-muted-foreground">
          <Settings className="h-3 w-3" />
          <span>{message.content}</span>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        'mb-4 flex w-full',
        isUser ? 'justify-end' : 'justify-start',
        className
      )}
    >
      <div
        className={cn(
          'flex max-w-[80%] space-x-2',
          isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'
        )}
      >
        {/* Avatar */}
        <div
          className={cn(
            'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
            isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
          )}
        >
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </div>

        {/* Message Content */}
        <div
          className={cn(
            'flex flex-col space-y-2',
            isUser ? 'items-end' : 'items-start'
          )}
        >
          {/* Message Bubble */}
          <div
            className={cn(
              'relative break-words rounded-lg px-4 py-2',
              isUser
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground',
              isTyping && 'animate-pulse'
            )}
          >
            <div className="whitespace-pre-wrap text-sm">
              {isTyping ? (
                <div className="flex space-x-1">
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-current"
                    style={{ animationDelay: '0ms' }}
                  />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-current"
                    style={{ animationDelay: '150ms' }}
                  />
                  <div
                    className="h-2 w-2 animate-bounce rounded-full bg-current"
                    style={{ animationDelay: '300ms' }}
                  />
                </div>
              ) : (
                message.content
              )}
            </div>

            {/* Arrow */}
            <div
              className={cn(
                'absolute top-3 h-0 w-0 border-4 border-transparent',
                isUser
                  ? 'right-[-8px] border-l-primary'
                  : 'left-[-8px] border-r-muted'
              )}
            />
          </div>

          {/* Test Result Badge */}
          {message.metadata?.testResult && (
            <div
              className={cn(
                'flex items-center space-x-2 rounded-md border px-2 py-1 text-xs',
                getStatusColor(message.metadata.testResult.status)
              )}
            >
              {getStatusIcon(message.metadata.testResult.status)}
              <span className="capitalize">
                {message.metadata.testResult.status}
              </span>
              {message.metadata.testResult.duration && (
                <span>• {message.metadata.testResult.duration}ms</span>
              )}
            </div>
          )}

          {/* Error Badge */}
          {message.metadata?.error && (
            <div className="flex items-center space-x-2 rounded-md border border-red-200 bg-red-100 px-2 py-1 text-xs text-red-800">
              <AlertCircle className="h-3 w-3" />
              <span>Error: {message.metadata.error}</span>
            </div>
          )}

          {/* Timestamp */}
          <div
            className={cn(
              'text-xs text-muted-foreground',
              isUser ? 'text-right' : 'text-left'
            )}
          >
            {formatDate(message.timestamp)}
          </div>
        </div>
      </div>
    </div>
  )
}
