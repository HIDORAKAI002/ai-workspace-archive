'use client'

import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Square,
  RotateCcw,
  Settings,
  ChevronDown,
  ChevronUp,
  TestTube,
  Zap,
  Clock,
  CheckCircle,
  AlertCircle,
  Activity,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FlowiseFlow, TestResult, TestLog } from '@/types'

interface FlowTesterProps {
  flow: FlowiseFlow
  onTestResult?: (result: TestResult) => void
  onFlowUpdate?: (flow: FlowiseFlow) => void
  className?: string
  compact?: boolean
}

interface TestConfiguration {
  timeout: number
  retries: number
  enableLogs: boolean
  logLevel: 'info' | 'warn' | 'error' | 'debug'
  parallelTests: number
  autoValidate: boolean
}

export function FlowTester({
  flow,
  onTestResult,
  onFlowUpdate,
  className,
  compact = false,
}: FlowTesterProps) {
  const [testInput, setTestInput] = useState('')
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<TestResult | null>(null)
  const [testHistory, setTestHistory] = useState<TestResult[]>([])
  const [showConfig, setShowConfig] = useState(false)
  const [showLogs, setShowLogs] = useState(false)
  const [config, setConfig] = useState<TestConfiguration>({
    timeout: 30000,
    retries: 3,
    enableLogs: true,
    logLevel: 'info',
    parallelTests: 1,
    autoValidate: true,
  })

  useEffect(() => {
    // Load test history from localStorage
    const savedHistory = localStorage.getItem(`test-history-${flow.id}`)
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory)
        setTestHistory(parsed)
      } catch (error) {
        console.error('Failed to load test history:', error)
      }
    }
  }, [flow.id])

  const saveTestHistory = (result: TestResult) => {
    const updatedHistory = [result, ...testHistory.slice(0, 9)] // Keep last 10 tests
    setTestHistory(updatedHistory)
    localStorage.setItem(
      `test-history-${flow.id}`,
      JSON.stringify(updatedHistory)
    )
  }

  const runTest = async (input: string = testInput) => {
    if (!input.trim() || isRunning) return

    setIsRunning(true)

    const testResult: TestResult = {
      id: Date.now().toString(),
      flowId: flow.id,
      testName: `Interactive Test - ${new Date().toLocaleTimeString()}`,
      status: 'running',
      startTime: new Date(),
      input: input.trim(),
      logs: [],
    }

    setCurrentTest(testResult)

    try {
      // Simulate test execution with progress updates
      const logs: TestLog[] = []

      // Initial log
      logs.push({
        id: '1',
        timestamp: new Date(),
        level: 'info',
        message: 'Test execution started',
        data: { input: input.trim() },
      })

      // Simulate processing steps
      const steps = [
        'Validating input format',
        'Initializing flow nodes',
        'Processing node connections',
        'Executing flow logic',
        'Generating response',
        'Validating output format',
      ]

      for (let i = 0; i < steps.length; i++) {
        await new Promise((resolve) =>
          setTimeout(resolve, 200 + Math.random() * 300)
        )

        logs.push({
          id: (i + 2).toString(),
          timestamp: new Date(),
          level: 'info',
          message: steps[i],
          data: { step: i + 1, total: steps.length },
        })

        setCurrentTest((prev) => (prev ? { ...prev, logs } : null))
      }

      // Simulate potential errors (10% chance)
      if (Math.random() < 0.1) {
        throw new Error('Simulated test failure')
      }

      // Complete test
      const completedResult: TestResult = {
        ...testResult,
        status: 'passed',
        endTime: new Date(),
        duration: Date.now() - testResult.startTime.getTime(),
        output: `Generated response for: "${input.trim()}"`,
        logs: [
          ...logs,
          {
            id: (logs.length + 1).toString(),
            timestamp: new Date(),
            level: 'info',
            message: 'Test completed successfully',
            data: { status: 'passed' },
          },
        ],
      }

      setCurrentTest(completedResult)
      saveTestHistory(completedResult)
      onTestResult?.(completedResult)
    } catch (error) {
      const errorResult: TestResult = {
        ...testResult,
        status: 'failed',
        endTime: new Date(),
        duration: Date.now() - testResult.startTime.getTime(),
        error: error instanceof Error ? error.message : 'Unknown error',
        logs: [
          ...testResult.logs,
          {
            id: (testResult.logs.length + 1).toString(),
            timestamp: new Date(),
            level: 'error',
            message: error instanceof Error ? error.message : 'Unknown error',
            data: { error: true },
          },
        ],
      }

      setCurrentTest(errorResult)
      saveTestHistory(errorResult)
      onTestResult?.(errorResult)
    } finally {
      setIsRunning(false)
    }
  }

  const stopTest = () => {
    setIsRunning(false)
    if (currentTest) {
      const stoppedResult: TestResult = {
        ...currentTest,
        status: 'error',
        endTime: new Date(),
        duration: Date.now() - currentTest.startTime.getTime(),
        error: 'Test stopped by user',
        logs: [
          ...currentTest.logs,
          {
            id: (currentTest.logs.length + 1).toString(),
            timestamp: new Date(),
            level: 'warn',
            message: 'Test execution stopped by user',
            data: { stopped: true },
          },
        ],
      }
      setCurrentTest(stoppedResult)
      saveTestHistory(stoppedResult)
      onTestResult?.(stoppedResult)
    }
  }

  const resetTest = () => {
    setCurrentTest(null)
    setTestInput('')
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running':
        return <Activity className="h-4 w-4 animate-spin" />
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'failed':
      case 'error':
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <TestTube className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'passed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'failed':
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (compact) {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="flex items-center space-x-2">
          <Input
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Enter test input..."
            disabled={isRunning}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                runTest()
              }
            }}
            className="flex-1"
          />
          <Button
            onClick={() => runTest()}
            disabled={!testInput.trim() || isRunning}
            size="sm"
          >
            {isRunning ? (
              <Square className="h-4 w-4" />
            ) : (
              <Play className="h-4 w-4" />
            )}
          </Button>
        </div>

        {currentTest && (
          <div className="flex items-center space-x-2 text-sm">
            {getStatusIcon(currentTest.status)}
            <span className="capitalize">{currentTest.status}</span>
            {currentTest.duration && (
              <span className="text-muted-foreground">
                • {currentTest.duration}ms
              </span>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="h-5 w-5" />
              <span>Flow Tester</span>
            </CardTitle>
            <CardDescription>
              Test your flow with interactive input and real-time monitoring
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowConfig(!showConfig)}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={resetTest}
              disabled={isRunning}
            >
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Configuration Panel */}
        {showConfig && (
          <div className="space-y-3 rounded-lg border p-4">
            <h4 className="text-sm font-medium">Test Configuration</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Timeout (ms)</label>
                <Input
                  type="number"
                  value={config.timeout}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      timeout: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium">Max Retries</label>
                <Input
                  type="number"
                  value={config.retries}
                  onChange={(e) =>
                    setConfig((prev) => ({
                      ...prev,
                      retries: Number(e.target.value),
                    }))
                  }
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        )}

        {/* Test Input */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Test Input</label>
          <div className="flex space-x-2">
            <Input
              value={testInput}
              onChange={(e) => setTestInput(e.target.value)}
              placeholder="Enter your test input here..."
              disabled={isRunning}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  runTest()
                }
              }}
              className="flex-1"
            />
            <Button
              onClick={() => runTest()}
              disabled={!testInput.trim() || isRunning}
            >
              {isRunning ? (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Test
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Current Test Status */}
        {currentTest && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Current Test</h4>
              <Badge
                variant="outline"
                className={getStatusColor(currentTest.status)}
              >
                {getStatusIcon(currentTest.status)}
                <span className="ml-1 capitalize">{currentTest.status}</span>
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Started:</span>
                <span className="ml-2">
                  {currentTest.startTime.toLocaleTimeString()}
                </span>
              </div>
              <div>
                <span className="text-muted-foreground">Duration:</span>
                <span className="ml-2">
                  {currentTest.duration
                    ? `${currentTest.duration}ms`
                    : 'Running...'}
                </span>
              </div>
            </div>

            {currentTest.output && (
              <div className="space-y-2">
                <span className="text-sm font-medium">Output:</span>
                <div className="rounded-lg bg-muted p-3 text-sm">
                  {currentTest.output}
                </div>
              </div>
            )}

            {currentTest.error && (
              <div className="space-y-2">
                <span className="text-sm font-medium text-red-600">Error:</span>
                <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {currentTest.error}
                </div>
              </div>
            )}

            {/* Logs */}
            <div className="space-y-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowLogs(!showLogs)}
                className="h-auto p-0 text-sm font-medium"
              >
                <span>Logs ({currentTest.logs.length})</span>
                {showLogs ? (
                  <ChevronUp className="ml-1 h-4 w-4" />
                ) : (
                  <ChevronDown className="ml-1 h-4 w-4" />
                )}
              </Button>

              {showLogs && (
                <div className="max-h-48 space-y-1 overflow-y-auto rounded-lg bg-gray-50 p-3">
                  {currentTest.logs.map((log) => (
                    <div
                      key={log.id}
                      className="flex items-start space-x-2 text-xs"
                    >
                      <span className="font-mono text-muted-foreground">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs',
                          log.level === 'error' &&
                            'border-red-200 text-red-700',
                          log.level === 'warn' &&
                            'border-yellow-200 text-yellow-700',
                          log.level === 'info' &&
                            'border-blue-200 text-blue-700'
                        )}
                      >
                        {log.level.toUpperCase()}
                      </Badge>
                      <span className="flex-1">{log.message}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Test History */}
        {testHistory.length > 0 && (
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Recent Tests</h4>
            <div className="space-y-2">
              {testHistory.slice(0, 5).map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between rounded-lg bg-muted p-2"
                >
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(test.status)}
                    <span className="max-w-48 truncate text-sm">
                      {test.input}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>{test.duration}ms</span>
                    <span>{test.startTime.toLocaleTimeString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
