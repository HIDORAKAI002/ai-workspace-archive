'use client'

import React, { useState, useMemo } from 'react'
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
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Download,
  Filter,
  ChevronDown,
  ChevronRight,
  Timer,
  Database,
  Eye,
  Code,
  FileText,
  TrendingUp,
  TrendingDown,
  Minus,
} from 'lucide-react'
import { TestResult, TestLog, LOG_LEVELS, TEST_STATUSES } from '@/types'
import { formatDistanceToNow } from 'date-fns'

interface TestResultsProps {
  testResults: TestResult[]
  title?: string
  className?: string
  onRetryTest?: (testId: string) => void
  onViewDetails?: (testId: string) => void
}

export function TestResults({
  testResults,
  title,
  className = '',
  onRetryTest,
  onViewDetails,
}: TestResultsProps) {
  const [selectedFilter, setSelectedFilter] = useState<
    'all' | 'passed' | 'failed' | 'pending' | 'running'
  >('all')
  const [expandedResults, setExpandedResults] = useState<Set<string>>(new Set())
  const [expandedLogs, setExpandedLogs] = useState<Set<string>>(new Set())
  const [sortBy, setSortBy] = useState<'recent' | 'duration' | 'status'>(
    'recent'
  )

  const filteredResults = useMemo(() => {
    const filtered =
      selectedFilter === 'all'
        ? testResults
        : testResults.filter((result) => result.status === selectedFilter)

    // Sort results
    switch (sortBy) {
      case 'recent':
        filtered.sort(
          (a, b) =>
            new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
        )
        break
      case 'duration':
        filtered.sort((a, b) => (b.duration || 0) - (a.duration || 0))
        break
      case 'status':
        filtered.sort((a, b) => {
          const statusOrder = {
            failed: 0,
            error: 1,
            running: 2,
            pending: 3,
            passed: 4,
          }
          return statusOrder[a.status] - statusOrder[b.status]
        })
        break
    }

    return filtered
  }, [testResults, selectedFilter, sortBy])

  const testStats = useMemo(() => {
    const total = testResults.length
    const passed = testResults.filter((r) => r.status === 'passed').length
    const failed = testResults.filter((r) => r.status === 'failed').length
    const running = testResults.filter((r) => r.status === 'running').length
    const pending = testResults.filter((r) => r.status === 'pending').length
    const errors = testResults.filter((r) => r.status === 'error').length
    const avgDuration =
      testResults.reduce((sum, r) => sum + (r.duration || 0), 0) / total

    return {
      total,
      passed,
      failed,
      running,
      pending,
      errors,
      avgDuration,
      successRate: total > 0 ? (passed / total) * 100 : 0,
    }
  }, [testResults])

  const toggleExpanded = (testId: string) => {
    const newExpanded = new Set(expandedResults)
    if (newExpanded.has(testId)) {
      newExpanded.delete(testId)
    } else {
      newExpanded.add(testId)
    }
    setExpandedResults(newExpanded)
  }

  const toggleLogsExpanded = (testId: string) => {
    const newExpanded = new Set(expandedLogs)
    if (newExpanded.has(testId)) {
      newExpanded.delete(testId)
    } else {
      newExpanded.add(testId)
    }
    setExpandedLogs(newExpanded)
  }

  const getStatusIcon = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
      case 'running':
        return <Play className="h-4 w-4 animate-pulse text-blue-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-gray-600" />
      case 'error':
        return <AlertCircle className="h-4 w-4 text-orange-600" />
      default:
        return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: TestResult['status']) => {
    switch (status) {
      case 'passed':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'failed':
        return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
      case 'running':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'pending':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      case 'error':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400'
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
    }
  }

  const getLogLevelIcon = (level: TestLog['level']) => {
    switch (level) {
      case 'error':
        return <XCircle className="h-3 w-3 text-red-600" />
      case 'warn':
        return <AlertCircle className="h-3 w-3 text-yellow-600" />
      case 'info':
        return <FileText className="h-3 w-3 text-blue-600" />
      case 'debug':
        return <Code className="h-3 w-3 text-gray-600" />
      default:
        return <FileText className="h-3 w-3 text-gray-600" />
    }
  }

  const getLogLevelColor = (level: TestLog['level']) => {
    switch (level) {
      case 'error':
        return 'text-red-600 dark:text-red-400'
      case 'warn':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'info':
        return 'text-blue-600 dark:text-blue-400'
      case 'debug':
        return 'text-gray-600 dark:text-gray-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const exportResults = () => {
    const exportData = {
      summary: testStats,
      results: filteredResults,
      exportedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `test-results-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const getSuccessRateIcon = () => {
    if (testStats.successRate >= 80)
      return <TrendingUp className="h-4 w-4 text-green-600" />
    if (testStats.successRate >= 60)
      return <Minus className="h-4 w-4 text-yellow-600" />
    return <TrendingDown className="h-4 w-4 text-red-600" />
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            {title || 'Test Results'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={exportResults}>
              <Download className="h-4 w-4" />
              <span className="ml-1">Export</span>
            </Button>
          </div>
        </div>
        <CardDescription>
          Comprehensive test execution results and analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Summary Statistics */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-lg bg-gray-50 p-4 text-center dark:bg-gray-900/50">
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {testStats.total}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Total Tests
            </div>
          </div>
          <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {testStats.passed}
            </div>
            <div className="text-sm text-green-600 dark:text-green-400">
              Passed
            </div>
          </div>
          <div className="rounded-lg bg-red-50 p-4 text-center dark:bg-red-900/20">
            <div className="text-2xl font-bold text-red-600 dark:text-red-400">
              {testStats.failed + testStats.errors}
            </div>
            <div className="text-sm text-red-600 dark:text-red-400">Failed</div>
          </div>
          <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
            <div className="flex items-center justify-center gap-2">
              {getSuccessRateIcon()}
              <span className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                {testStats.successRate.toFixed(1)}%
              </span>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Success Rate
            </div>
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Filter:
            </span>
          </div>
          {(['all', 'passed', 'failed', 'pending', 'running'] as const).map(
            (filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="capitalize"
              >
                {filter === 'all' ? 'All' : filter}
                <span className="ml-1 text-xs">
                  (
                  {filter === 'all'
                    ? testStats.total
                    : filter === 'failed'
                      ? testStats.failed + testStats.errors
                      : testStats[filter as keyof typeof testStats]}
                  )
                </span>
              </Button>
            )
          )}
          <div className="ml-4 flex items-center gap-2">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Sort by:
            </span>
            <Button
              variant={sortBy === 'recent' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('recent')}
            >
              Recent
            </Button>
            <Button
              variant={sortBy === 'duration' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('duration')}
            >
              Duration
            </Button>
            <Button
              variant={sortBy === 'status' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSortBy('status')}
            >
              Status
            </Button>
          </div>
        </div>

        {/* Test Results List */}
        <div className="space-y-4">
          {filteredResults.length === 0 ? (
            <div className="py-8 text-center">
              <Database className="mx-auto mb-4 h-12 w-12 text-gray-400" />
              <p className="mb-2 text-gray-600 dark:text-gray-400">
                No test results found
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                Try adjusting your filters or run some tests
              </p>
            </div>
          ) : (
            filteredResults.map((result) => (
              <div
                key={result.id}
                className="overflow-hidden rounded-lg border"
              >
                <div
                  className="cursor-pointer bg-gray-50 p-4 transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-800/50"
                  onClick={() => toggleExpanded(result.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <button className="flex items-center gap-2">
                        {expandedResults.has(result.id) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        {getStatusIcon(result.status)}
                      </button>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-gray-100">
                          {result.testName}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Flow: {result.flowId} • Started{' '}
                          {formatDistanceToNow(new Date(result.startTime))} ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.duration && (
                        <Badge
                          variant="outline"
                          className="flex items-center gap-1"
                        >
                          <Timer className="h-3 w-3" />
                          {result.duration}ms
                        </Badge>
                      )}
                      <Badge className={getStatusColor(result.status)}>
                        {result.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        {result.status === 'failed' && onRetryTest && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onRetryTest(result.id)
                            }}
                          >
                            <RotateCcw className="h-4 w-4" />
                          </Button>
                        )}
                        {onViewDetails && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              onViewDetails(result.id)
                            }}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {expandedResults.has(result.id) && (
                  <div className="border-t p-4">
                    <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {/* Input/Output */}
                      <div>
                        <h4 className="mb-2 font-medium">Input</h4>
                        <pre className="max-h-32 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
                          {JSON.stringify(result.input, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <h4 className="mb-2 font-medium">Output</h4>
                        <pre className="max-h-32 overflow-auto rounded bg-gray-100 p-3 text-sm dark:bg-gray-800">
                          {result.output
                            ? JSON.stringify(result.output, null, 2)
                            : 'No output'}
                        </pre>
                      </div>
                    </div>

                    {/* Error Message */}
                    {result.error && (
                      <div className="mb-4 rounded border border-red-200 bg-red-50 p-3 dark:border-red-800 dark:bg-red-900/20">
                        <h4 className="mb-2 font-medium text-red-800 dark:text-red-400">
                          Error
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-300">
                          {result.error}
                        </p>
                      </div>
                    )}

                    {/* Logs */}
                    {result.logs && result.logs.length > 0 && (
                      <div>
                        <button
                          onClick={() => toggleLogsExpanded(result.id)}
                          className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
                        >
                          {expandedLogs.has(result.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          Logs ({result.logs.length})
                        </button>
                        {expandedLogs.has(result.id) && (
                          <div className="max-h-64 overflow-auto rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
                            {result.logs.map((log) => (
                              <div
                                key={log.id}
                                className="mb-2 flex items-start gap-2 text-sm"
                              >
                                <span className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                                  {new Date(log.timestamp).toLocaleTimeString()}
                                </span>
                                <div className="flex items-center gap-1">
                                  {getLogLevelIcon(log.level)}
                                  <span
                                    className={`text-xs font-medium ${getLogLevelColor(log.level)}`}
                                  >
                                    {log.level.toUpperCase()}
                                  </span>
                                </div>
                                <span className="flex-1 text-gray-700 dark:text-gray-300">
                                  {log.message}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
