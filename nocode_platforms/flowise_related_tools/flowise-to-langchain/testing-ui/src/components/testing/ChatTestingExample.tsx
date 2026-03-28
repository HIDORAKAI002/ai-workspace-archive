'use client'

import React, { useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { MessageSquare, TestTube, Settings, BarChart3 } from 'lucide-react'
import { ChatInterface } from './ChatInterface'
import { FlowTester } from './FlowTester'
import { FlowiseFlow, TestResult } from '@/types'

interface ChatTestingExampleProps {
  flow: FlowiseFlow
  className?: string
}

export function ChatTestingExample({
  flow,
  className,
}: ChatTestingExampleProps) {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [activeTab, setActiveTab] = useState('chat')

  const handleTestResult = (result: TestResult) => {
    setTestResults((prev) => [result, ...prev.slice(0, 9)]) // Keep last 10 results
  }

  const getResultSummary = () => {
    const total = testResults.length
    const passed = testResults.filter((r) => r.status === 'passed').length
    const failed = testResults.filter((r) => r.status === 'failed').length
    const avgDuration =
      testResults.reduce((acc, r) => acc + (r.duration || 0), 0) / total || 0

    return { total, passed, failed, avgDuration }
  }

  const { total, passed, failed, avgDuration } = getResultSummary()

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Flow Testing Interface</h2>
          <p className="text-muted-foreground">
            Interactive testing environment for {flow.name}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{passed}</div>
            <div className="text-xs text-muted-foreground">Passed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">{failed}</div>
            <div className="text-xs text-muted-foreground">Failed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </div>

      {/* Testing Interface */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="chat" className="flex items-center space-x-2">
            <MessageSquare className="h-4 w-4" />
            <span>Chat Interface</span>
          </TabsTrigger>
          <TabsTrigger value="tester" className="flex items-center space-x-2">
            <TestTube className="h-4 w-4" />
            <span>Flow Tester</span>
          </TabsTrigger>
          <TabsTrigger value="results" className="flex items-center space-x-2">
            <BarChart3 className="h-4 w-4" />
            <span>Results</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MessageSquare className="h-5 w-5" />
                <span>Interactive Chat Testing</span>
              </CardTitle>
              <CardDescription>
                Chat with your flow in real-time to test its responses and
                behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-96">
                <ChatInterface
                  flow={flow}
                  onTestResult={handleTestResult}
                  className="h-full"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tester" className="space-y-4">
          <FlowTester
            flow={flow}
            onTestResult={handleTestResult}
            className="w-full"
          />
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="h-5 w-5" />
                <span>Test Results</span>
              </CardTitle>
              <CardDescription>
                Overview of all test executions and their results
              </CardDescription>
            </CardHeader>
            <CardContent>
              {testResults.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No test results yet. Run some tests to see results here.
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Summary Stats */}
                  <div className="grid grid-cols-4 gap-4">
                    <div className="rounded-lg bg-muted p-3 text-center">
                      <div className="text-2xl font-bold">{total}</div>
                      <div className="text-sm text-muted-foreground">
                        Total Tests
                      </div>
                    </div>
                    <div className="rounded-lg bg-green-50 p-3 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {passed}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Passed
                      </div>
                    </div>
                    <div className="rounded-lg bg-red-50 p-3 text-center">
                      <div className="text-2xl font-bold text-red-600">
                        {failed}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Failed
                      </div>
                    </div>
                    <div className="rounded-lg bg-blue-50 p-3 text-center">
                      <div className="text-2xl font-bold text-blue-600">
                        {Math.round(avgDuration)}ms
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Avg Duration
                      </div>
                    </div>
                  </div>

                  {/* Results List */}
                  <div className="space-y-2">
                    <h4 className="font-medium">Recent Results</h4>
                    {testResults.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center justify-between rounded-lg border p-3"
                      >
                        <div className="flex items-center space-x-3">
                          <Badge
                            variant={
                              result.status === 'passed'
                                ? 'default'
                                : 'destructive'
                            }
                            className="capitalize"
                          >
                            {result.status}
                          </Badge>
                          <div>
                            <div className="text-sm font-medium">
                              {result.testName}
                            </div>
                            <div className="max-w-64 truncate text-xs text-muted-foreground">
                              Input: {result.input}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {result.duration}ms
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {result.startTime.toLocaleTimeString()}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default ChatTestingExample
