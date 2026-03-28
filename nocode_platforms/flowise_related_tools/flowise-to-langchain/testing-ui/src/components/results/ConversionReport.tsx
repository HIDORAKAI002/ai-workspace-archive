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
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Zap,
  Clock,
  Code,
  GitBranch,
  Activity,
  BarChart3,
  PieChart,
  Download,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronRight,
  Info,
  AlertCircle,
  Users,
  Database,
  Settings,
  Layers,
  Network,
  Cpu,
  HardDrive as Memory,
  HardDrive,
  Workflow,
} from 'lucide-react'
import { ConversionResult } from '@/types'
import { format } from 'date-fns'

interface ConversionReportProps {
  conversionResult: ConversionResult
  title?: string
  className?: string
  onExportReport?: () => void
}

interface ConversionMetric {
  name: string
  value: number
  unit: string
  status: 'good' | 'warning' | 'error'
  description: string
  icon: React.ReactNode
}

interface ConversionAnalysis {
  complexity: 'low' | 'medium' | 'high'
  nodeCount: number
  connectionCount: number
  codeLines: number
  estimatedPerformance: 'excellent' | 'good' | 'fair' | 'poor'
  maintainabilityScore: number
  testCoverage: number
}

export function ConversionReport({
  conversionResult,
  title,
  className = '',
  onExportReport,
}: ConversionReportProps) {
  const [showDetails, setShowDetails] = useState(false)
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(['overview'])
  )

  // Mock analysis data - in a real app, this would come from the conversion result
  const analysis: ConversionAnalysis = useMemo(
    () => ({
      complexity:
        conversionResult.langchainCode &&
        conversionResult.langchainCode.length > 1000
          ? 'high'
          : 'medium',
      nodeCount: Math.floor(Math.random() * 20) + 5,
      connectionCount: Math.floor(Math.random() * 15) + 3,
      codeLines: conversionResult.langchainCode?.split('\n').length || 0,
      estimatedPerformance:
        conversionResult.status === 'completed' ? 'good' : 'fair',
      maintainabilityScore: Math.floor(Math.random() * 30) + 70,
      testCoverage: Math.floor(Math.random() * 40) + 60,
    }),
    [conversionResult]
  )

  const metrics: ConversionMetric[] = useMemo(
    () => [
      {
        name: 'Code Quality',
        value: analysis.maintainabilityScore,
        unit: '%',
        status: analysis.maintainabilityScore > 80 ? 'good' : 'warning',
        description: 'Overall code quality and maintainability score',
        icon: <Code className="h-4 w-4" />,
      },
      {
        name: 'Complexity',
        value:
          analysis.complexity === 'low'
            ? 3
            : analysis.complexity === 'medium'
              ? 6
              : 9,
        unit: '/10',
        status:
          analysis.complexity === 'low'
            ? 'good'
            : analysis.complexity === 'medium'
              ? 'warning'
              : 'error',
        description: 'Flow complexity based on nodes and connections',
        icon: <Network className="h-4 w-4" />,
      },
      {
        name: 'Performance',
        value:
          analysis.estimatedPerformance === 'excellent'
            ? 95
            : analysis.estimatedPerformance === 'good'
              ? 85
              : analysis.estimatedPerformance === 'fair'
                ? 65
                : 45,
        unit: '%',
        status:
          analysis.estimatedPerformance === 'excellent' ||
          analysis.estimatedPerformance === 'good'
            ? 'good'
            : 'warning',
        description: 'Estimated runtime performance',
        icon: <Zap className="h-4 w-4" />,
      },
      {
        name: 'Test Coverage',
        value: analysis.testCoverage,
        unit: '%',
        status:
          analysis.testCoverage > 80
            ? 'good'
            : analysis.testCoverage > 60
              ? 'warning'
              : 'error',
        description: 'Code coverage by automated tests',
        icon: <Activity className="h-4 w-4" />,
      },
    ],
    [analysis]
  )

  const getStatusIcon = (status: ConversionResult['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-600" />
      case 'processing':
        return <Clock className="h-5 w-5 animate-pulse text-blue-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: ConversionResult['status']) => {
    switch (status) {
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

  const getMetricColor = (status: ConversionMetric['status']) => {
    switch (status) {
      case 'good':
        return 'text-green-600 dark:text-green-400'
      case 'warning':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'error':
        return 'text-red-600 dark:text-red-400'
      default:
        return 'text-gray-600 dark:text-gray-400'
    }
  }

  const getMetricIcon = (status: ConversionMetric['status']) => {
    switch (status) {
      case 'good':
        return <TrendingUp className="h-4 w-4 text-green-600" />
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error':
        return <TrendingDown className="h-4 w-4 text-red-600" />
      default:
        return <TrendingUp className="h-4 w-4 text-gray-600" />
    }
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections)
    if (newExpanded.has(section)) {
      newExpanded.delete(section)
    } else {
      newExpanded.add(section)
    }
    setExpandedSections(newExpanded)
  }

  const exportReport = () => {
    const reportData = {
      conversion: conversionResult,
      analysis,
      metrics,
      generatedAt: new Date().toISOString(),
    }

    const blob = new Blob([JSON.stringify(reportData, null, 2)], {
      type: 'application/json',
    })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `conversion-report-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            {title || 'Conversion Report'}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowDetails(!showDetails)}
            >
              {showDetails ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
              <span className="ml-1">
                {showDetails ? 'Hide' : 'Show'} Details
              </span>
            </Button>
            <Button variant="outline" size="sm" onClick={exportReport}>
              <Download className="h-4 w-4" />
              <span className="ml-1">Export</span>
            </Button>
          </div>
        </div>
        <CardDescription>
          Detailed analysis and metrics for the conversion process
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Overview Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('overview')}
            className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-800/50"
          >
            {expandedSections.has('overview') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <Info className="h-4 w-4" />
            <span className="font-medium">Overview</span>
            <Badge
              className={`ml-auto ${getStatusColor(conversionResult.status)}`}
            >
              {getStatusIcon(conversionResult.status)}
              <span className="ml-1 capitalize">{conversionResult.status}</span>
            </Badge>
          </button>

          {expandedSections.has('overview') && (
            <div className="mt-4 rounded-lg border p-4">
              <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                <div className="rounded-lg bg-blue-50 p-4 text-center dark:bg-blue-900/20">
                  <Layers className="mx-auto mb-2 h-8 w-8 text-blue-600" />
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {analysis.nodeCount}
                  </div>
                  <div className="text-sm text-blue-600 dark:text-blue-400">
                    Flow Nodes
                  </div>
                </div>
                <div className="rounded-lg bg-purple-50 p-4 text-center dark:bg-purple-900/20">
                  <GitBranch className="mx-auto mb-2 h-8 w-8 text-purple-600" />
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {analysis.connectionCount}
                  </div>
                  <div className="text-sm text-purple-600 dark:text-purple-400">
                    Connections
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-4 text-center dark:bg-green-900/20">
                  <FileText className="mx-auto mb-2 h-8 w-8 text-green-600" />
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {analysis.codeLines}
                  </div>
                  <div className="text-sm text-green-600 dark:text-green-400">
                    Lines of Code
                  </div>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p>
                  <strong>Started:</strong>{' '}
                  {format(new Date(conversionResult.createdAt), 'PPpp')}
                </p>
                <p>
                  <strong>Last Updated:</strong>{' '}
                  {format(new Date(conversionResult.updatedAt), 'PPpp')}
                </p>
                <p>
                  <strong>Flow ID:</strong> {conversionResult.flowId}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Metrics Section */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('metrics')}
            className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-800/50"
          >
            {expandedSections.has('metrics') ? (
              <ChevronDown className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
            <PieChart className="h-4 w-4" />
            <span className="font-medium">Quality Metrics</span>
          </button>

          {expandedSections.has('metrics') && (
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {metrics.map((metric) => (
                <div
                  key={metric.name}
                  className={`cursor-pointer rounded-lg border p-4 transition-all ${
                    selectedMetric === metric.name
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:border-gray-300 dark:hover:border-gray-600'
                  }`}
                  onClick={() =>
                    setSelectedMetric(
                      selectedMetric === metric.name ? null : metric.name
                    )
                  }
                >
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {metric.icon}
                      <span className="font-medium">{metric.name}</span>
                    </div>
                    {getMetricIcon(metric.status)}
                  </div>
                  <div className="flex items-end gap-2">
                    <span
                      className={`text-2xl font-bold ${getMetricColor(metric.status)}`}
                    >
                      {metric.value}
                    </span>
                    <span className="mb-1 text-sm text-gray-600 dark:text-gray-400">
                      {metric.unit}
                    </span>
                  </div>
                  {selectedMetric === metric.name && (
                    <div className="mt-2 border-t pt-2">
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {metric.description}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Issues Section */}
        {(conversionResult.errors?.length ||
          conversionResult.warnings?.length) && (
          <div className="mb-6">
            <button
              onClick={() => toggleSection('issues')}
              className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-800/50"
            >
              {expandedSections.has('issues') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">Issues & Warnings</span>
              <Badge variant="outline" className="ml-auto">
                {(conversionResult.errors?.length || 0) +
                  (conversionResult.warnings?.length || 0)}
              </Badge>
            </button>

            {expandedSections.has('issues') && (
              <div className="mt-4 space-y-4">
                {conversionResult.errors &&
                  conversionResult.errors.length > 0 && (
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-800 dark:bg-red-900/20">
                      <h4 className="mb-2 flex items-center gap-2 font-medium text-red-800 dark:text-red-400">
                        <XCircle className="h-4 w-4" />
                        Errors ({conversionResult.errors.length})
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

                {conversionResult.warnings &&
                  conversionResult.warnings.length > 0 && (
                    <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-800 dark:bg-yellow-900/20">
                      <h4 className="mb-2 flex items-center gap-2 font-medium text-yellow-800 dark:text-yellow-400">
                        <AlertTriangle className="h-4 w-4" />
                        Warnings ({conversionResult.warnings.length})
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
              </div>
            )}
          </div>
        )}

        {/* Recommendations Section */}
        {showDetails && (
          <div className="mb-6">
            <button
              onClick={() => toggleSection('recommendations')}
              className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-800/50"
            >
              {expandedSections.has('recommendations') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Settings className="h-4 w-4" />
              <span className="font-medium">Recommendations</span>
            </button>

            {expandedSections.has('recommendations') && (
              <div className="mt-4 space-y-3">
                {analysis.maintainabilityScore < 80 && (
                  <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 dark:border-blue-800 dark:bg-blue-900/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Code className="h-4 w-4 text-blue-600" />
                      <span className="font-medium text-blue-800 dark:text-blue-400">
                        Code Quality
                      </span>
                    </div>
                    <p className="text-sm text-blue-700 dark:text-blue-300">
                      Consider refactoring complex functions and improving code
                      documentation to enhance maintainability.
                    </p>
                  </div>
                )}

                {analysis.complexity === 'high' && (
                  <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Network className="h-4 w-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800 dark:text-yellow-400">
                        Complexity
                      </span>
                    </div>
                    <p className="text-sm text-yellow-700 dark:text-yellow-300">
                      High complexity detected. Consider breaking down large
                      flows into smaller, more manageable components.
                    </p>
                  </div>
                )}

                {analysis.testCoverage < 80 && (
                  <div className="rounded-lg border border-purple-200 bg-purple-50 p-3 dark:border-purple-800 dark:bg-purple-900/20">
                    <div className="mb-2 flex items-center gap-2">
                      <Activity className="h-4 w-4 text-purple-600" />
                      <span className="font-medium text-purple-800 dark:text-purple-400">
                        Test Coverage
                      </span>
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300">
                      Test coverage is below 80%. Add more unit tests to improve
                      code reliability and maintainability.
                    </p>
                  </div>
                )}

                {conversionResult.status === 'completed' && (
                  <div className="rounded-lg border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-900/20">
                    <div className="mb-2 flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800 dark:text-green-400">
                        Success
                      </span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Conversion completed successfully! Consider running tests
                      to validate the converted code.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Metadata Section */}
        {conversionResult.metadata && showDetails && (
          <div>
            <button
              onClick={() => toggleSection('metadata')}
              className="flex w-full items-center gap-2 rounded-lg bg-gray-50 p-3 text-left transition-colors hover:bg-gray-100 dark:bg-gray-900/50 dark:hover:bg-gray-800/50"
            >
              {expandedSections.has('metadata') ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              <Database className="h-4 w-4" />
              <span className="font-medium">Metadata</span>
            </button>

            {expandedSections.has('metadata') && (
              <div className="mt-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
                <pre className="overflow-auto text-sm text-gray-700 dark:text-gray-300">
                  {JSON.stringify(conversionResult.metadata, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
