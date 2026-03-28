'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Play, Square, RotateCcw, Download, Copy, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { FlowiseFlow, TestResult } from '@/types'
import { ChatInput } from './ChatInput'
import { MessageBubble } from './MessageBubble'
import { FlowTester } from './FlowTester'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
  metadata?: {
    flowId?: string
    testResult?: TestResult
    isTyping?: boolean
    error?: string
  }
}

interface ChatInterfaceProps {
  flow: FlowiseFlow
  onTestResult?: (result: TestResult) => void
  onFlowUpdate?: (flow: FlowiseFlow) => void
  className?: string
}

export function ChatInterface({
  flow,
  onTestResult,
  onFlowUpdate,
  className,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'system',
      content: `Ready to test flow: ${flow.name}`,
      timestamp: new Date(),
    },
  ])
  const [isRunning, setIsRunning] = useState(false)
  const [isTyping, setIsTyping] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isRunning) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsRunning(true)
    setIsTyping(true)

    try {
      // Add typing indicator
      const typingMessage: ChatMessage = {
        id: 'typing',
        role: 'assistant',
        content: 'Processing...',
        timestamp: new Date(),
        metadata: { isTyping: true },
      }
      setMessages((prev) => [...prev, typingMessage])

      // Simulate API call to test flow
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Remove typing indicator
      setMessages((prev) => prev.filter((msg) => msg.id !== 'typing'))

      // Add response
      const assistantMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Flow executed successfully with input: "${content}"`,
        timestamp: new Date(),
        metadata: {
          flowId: flow.id,
          testResult: {
            id: Date.now().toString(),
            flowId: flow.id,
            testName: 'Interactive Test',
            status: 'passed',
            startTime: new Date(Date.now() - 1500),
            endTime: new Date(),
            duration: 1500,
            input: content,
            output: `Response for: ${content}`,
            logs: [
              {
                id: '1',
                timestamp: new Date(),
                level: 'info',
                message: 'Flow execution started',
              },
              {
                id: '2',
                timestamp: new Date(),
                level: 'info',
                message: 'Flow execution completed',
              },
            ],
          },
        },
      }

      setMessages((prev) => [...prev, assistantMessage])

      if (onTestResult && assistantMessage.metadata?.testResult) {
        onTestResult(assistantMessage.metadata.testResult)
      }
    } catch (error) {
      // Remove typing indicator
      setMessages((prev) => prev.filter((msg) => msg.id !== 'typing'))

      const errorMessage: ChatMessage = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        timestamp: new Date(),
        metadata: {
          error: error instanceof Error ? error.message : 'Unknown error',
        },
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsRunning(false)
      setIsTyping(false)
    }
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: '1',
        role: 'system',
        content: `Ready to test flow: ${flow.name}`,
        timestamp: new Date(),
      },
    ])
  }

  const handleStopExecution = () => {
    setIsRunning(false)
    setIsTyping(false)
    setMessages((prev) => prev.filter((msg) => msg.id !== 'typing'))
  }

  const handleExportChat = () => {
    const chatExport = {
      flow: flow.name,
      messages: messages.filter((msg) => msg.role !== 'system'),
      timestamp: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(chatExport, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `chat-export-${flow.name}-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const handleCopyChat = async () => {
    const chatText = messages
      .filter((msg) => msg.role !== 'system')
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join('\n')

    try {
      await navigator.clipboard.writeText(chatText)
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy chat:', error)
    }
  }

  return (
    <Card className={cn('flex h-full flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold">
          Interactive Flow Testing
        </CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            disabled={isRunning}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopyChat}
            disabled={isRunning}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleExportChat}
            disabled={isRunning}
          >
            <Download className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClearChat}
            disabled={isRunning}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
          {isRunning ? (
            <Button
              variant="destructive"
              size="sm"
              onClick={handleStopExecution}
            >
              <Square className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="default" size="sm" disabled={messages.length <= 1}>
              <Play className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col p-4">
        {/* Flow Info */}
        <div className="mb-4 rounded-lg bg-muted p-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">{flow.name}</h3>
              {flow.description && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {flow.description}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">
                Nodes: {flow.nodes.length}
              </p>
              <p className="text-xs text-muted-foreground">
                Edges: {flow.edges.length}
              </p>
            </div>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="mb-4 rounded-lg border p-3">
            <FlowTester
              flow={flow}
              onTestResult={onTestResult}
              onFlowUpdate={onFlowUpdate}
              compact
            />
          </div>
        )}

        {/* Messages */}
        <div className="mb-4 flex-1 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              isTyping={message.metadata?.isTyping}
            />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isRunning}
          placeholder="Type your message to test the flow..."
        />
      </CardContent>
    </Card>
  )
}
