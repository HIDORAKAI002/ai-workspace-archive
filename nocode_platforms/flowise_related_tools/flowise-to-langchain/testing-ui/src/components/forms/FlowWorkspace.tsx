'use client'

import React, { useState, useCallback } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import {
  FlowUploader,
  FlowJsonEditor,
  ConversionSettings,
  TestConfiguration,
} from './index'
import {
  Workflow,
  FileText,
  Settings,
  TestTube,
  Play,
  CheckCircle,
  AlertCircle,
  Download,
  Share,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { FlowiseFlow, ConversionResult, TestResult } from '@/types'
import { api } from '@/lib/api'

interface FlowWorkspaceProps {
  className?: string
  initialFlow?: FlowiseFlow
  onFlowChange?: (flow: FlowiseFlow) => void
  onConversionComplete?: (result: ConversionResult) => void
  onTestComplete?: (results: TestResult[]) => void
}

export function FlowWorkspace({
  className,
  initialFlow,
  onFlowChange,
  onConversionComplete,
  onTestComplete,
}: FlowWorkspaceProps) {
  const [currentFlow, setCurrentFlow] = useState<FlowiseFlow | null>(
    initialFlow || null
  )
  const [flowJson, setFlowJson] = useState<string>(
    initialFlow ? JSON.stringify(initialFlow, null, 2) : ''
  )
  const [isFlowValid, setIsFlowValid] = useState(true)
  const [activeTab, setActiveTab] = useState<
    'upload' | 'edit' | 'convert' | 'test'
  >('upload')

  // Conversion state
  const [conversionSettings, setConversionSettings] = useState<any>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [conversionResult, setConversionResult] =
    useState<ConversionResult | null>(null)

  // Test state
  const [testConfiguration, setTestConfiguration] = useState<any>(null)
  const [isRunningTests, setIsRunningTests] = useState(false)
  const [testResults, setTestResults] = useState<TestResult[]>([])

  const handleFlowUpload = useCallback(
    async (flow: FlowiseFlow) => {
      setCurrentFlow(flow)
      setFlowJson(JSON.stringify(flow, null, 2))
      setIsFlowValid(true)
      onFlowChange?.(flow)

      // Auto-advance to edit tab
      setActiveTab('edit')
    },
    [onFlowChange]
  )

  const handleFlowError = useCallback((error: string) => {
    console.error('Flow upload error:', error)
    // You could show a toast notification here
  }, [])

  const handleJsonChange = useCallback((json: string) => {
    setFlowJson(json)
  }, [])

  const handleJsonValidation = useCallback(
    (isValid: boolean, errors?: string[]) => {
      setIsFlowValid(isValid)

      if (isValid && flowJson) {
        try {
          const parsed = JSON.parse(flowJson)
          if (JSON.stringify(parsed) !== JSON.stringify(currentFlow)) {
            setCurrentFlow(parsed)
            onFlowChange?.(parsed)
          }
        } catch (error) {
          // Handle JSON parsing error
          console.error('JSON parsing error:', error)
        }
      }
    },
    [flowJson, currentFlow, onFlowChange]
  )

  const handleConversion = useCallback(
    async (settings: any) => {
      if (!currentFlow) return

      setIsConverting(true)
      try {
        const result = await api.conversion.convert(currentFlow.id, settings)
        setConversionResult(result)
        onConversionComplete?.(result)
      } catch (error) {
        console.error('Conversion error:', error)
        // Handle error
      } finally {
        setIsConverting(false)
      }
    },
    [currentFlow, onConversionComplete]
  )

  const handleTestRun = useCallback(
    async (config: any) => {
      if (!currentFlow) return

      setIsRunningTests(true)
      try {
        const results = await Promise.all(
          config.testCases.map(async (testCase: any) => {
            return await api.tests.run(currentFlow.id, testCase.input)
          })
        )
        setTestResults(results)
        onTestComplete?.(results)
      } catch (error) {
        console.error('Test run error:', error)
        // Handle error
      } finally {
        setIsRunningTests(false)
      }
    },
    [currentFlow, onTestComplete]
  )

  const getTabStatus = (tab: string) => {
    switch (tab) {
      case 'upload':
        return currentFlow ? 'complete' : 'pending'
      case 'edit':
        return currentFlow && isFlowValid ? 'complete' : 'pending'
      case 'convert':
        return conversionResult ? 'complete' : 'pending'
      case 'test':
        return testResults.length > 0 ? 'complete' : 'pending'
      default:
        return 'pending'
    }
  }

  const getTabIcon = (tab: string) => {
    const status = getTabStatus(tab)
    switch (status) {
      case 'complete':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'pending':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const canProceedToTab = (tab: string) => {
    switch (tab) {
      case 'upload':
        return true
      case 'edit':
        return currentFlow !== null
      case 'convert':
        return currentFlow !== null && isFlowValid
      case 'test':
        return currentFlow !== null && isFlowValid
      default:
        return false
    }
  }

  return (
    <Card className={cn('mx-auto w-full max-w-6xl', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Workflow className="h-5 w-5" />
          Flow Workspace
        </CardTitle>
        <CardDescription>
          Upload, edit, convert, and test your Flowise flows
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TabsPrimitive.Root
          value={activeTab}
          onValueChange={(value) => setActiveTab(value as any)}
        >
          <TabsPrimitive.List className="grid w-full grid-cols-4 border-b">
            <TabsPrimitive.Trigger
              value="upload"
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
                'hover:text-foreground data-[state=active]:text-foreground',
                'data-[state=active]:border-b-2 data-[state=active]:border-primary',
                !canProceedToTab('upload') && 'cursor-not-allowed opacity-50'
              )}
              disabled={!canProceedToTab('upload')}
            >
              <FileText className="h-4 w-4" />
              Upload
              {getTabIcon('upload')}
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="edit"
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
                'hover:text-foreground data-[state=active]:text-foreground',
                'data-[state=active]:border-b-2 data-[state=active]:border-primary',
                !canProceedToTab('edit') && 'cursor-not-allowed opacity-50'
              )}
              disabled={!canProceedToTab('edit')}
            >
              <FileText className="h-4 w-4" />
              Edit
              {getTabIcon('edit')}
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="convert"
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
                'hover:text-foreground data-[state=active]:text-foreground',
                'data-[state=active]:border-b-2 data-[state=active]:border-primary',
                !canProceedToTab('convert') && 'cursor-not-allowed opacity-50'
              )}
              disabled={!canProceedToTab('convert')}
            >
              <Settings className="h-4 w-4" />
              Convert
              {getTabIcon('convert')}
            </TabsPrimitive.Trigger>
            <TabsPrimitive.Trigger
              value="test"
              className={cn(
                'flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors',
                'hover:text-foreground data-[state=active]:text-foreground',
                'data-[state=active]:border-b-2 data-[state=active]:border-primary',
                !canProceedToTab('test') && 'cursor-not-allowed opacity-50'
              )}
              disabled={!canProceedToTab('test')}
            >
              <TestTube className="h-4 w-4" />
              Test
              {getTabIcon('test')}
            </TabsPrimitive.Trigger>
          </TabsPrimitive.List>

          <TabsPrimitive.Content value="upload" className="mt-4 space-y-4">
            <FlowUploader
              onUpload={handleFlowUpload}
              onError={handleFlowError}
              disabled={false}
            />

            {currentFlow && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-800">
                    Flow Loaded Successfully
                  </h4>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Name:</span>{' '}
                    {currentFlow.name}
                  </div>
                  <div>
                    <span className="font-medium">Nodes:</span>{' '}
                    {currentFlow.nodes.length}
                  </div>
                  <div>
                    <span className="font-medium">Edges:</span>{' '}
                    {currentFlow.edges.length}
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" onClick={() => setActiveTab('edit')}>
                    Edit Flow
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setActiveTab('convert')}
                  >
                    Convert to LangChain
                  </Button>
                </div>
              </div>
            )}
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="edit" className="mt-4 space-y-4">
            <FlowJsonEditor
              value={flowJson}
              onChange={handleJsonChange}
              onValidate={handleJsonValidation}
              flowId={currentFlow?.id}
              height={500}
              showValidation={true}
              autoValidate={true}
            />

            {isFlowValid && currentFlow && (
              <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800">
                    Flow is valid and ready for conversion
                  </span>
                </div>
                <Button
                  onClick={() => setActiveTab('convert')}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Configure Conversion
                </Button>
              </div>
            )}
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="convert" className="mt-4 space-y-4">
            <ConversionSettings
              onSettingsChange={setConversionSettings}
              onGenerate={handleConversion}
              isGenerating={isConverting}
            />

            {conversionResult && (
              <div className="rounded-lg border border-green-200 bg-green-50 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <h4 className="font-medium text-green-800">
                      Conversion Complete
                    </h4>
                  </div>
                  <Badge variant="secondary">{conversionResult.status}</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-green-700">
                  <div>
                    <span className="font-medium">Languages:</span>
                    {conversionResult.langchainCode && ' Python'}
                    {conversionResult.javascriptCode && ' JavaScript'}
                  </div>
                  <div>
                    <span className="font-medium">Files:</span> Generated
                    successfully
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" onClick={() => setActiveTab('test')}>
                    Test Conversion
                  </Button>
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Download Code
                  </Button>
                </div>
              </div>
            )}
          </TabsPrimitive.Content>

          <TabsPrimitive.Content value="test" className="mt-4 space-y-4">
            <TestConfiguration
              flowId={currentFlow?.id}
              flows={currentFlow ? [currentFlow] : []}
              onConfigChange={setTestConfiguration}
              onRunTests={handleTestRun}
              isRunning={isRunningTests}
            />

            {testResults.length > 0 && (
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                <div className="mb-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <h4 className="font-medium text-blue-800">Test Results</h4>
                </div>
                <div className="grid grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Total:</span>{' '}
                    {testResults.length}
                  </div>
                  <div>
                    <span className="font-medium">Passed:</span>{' '}
                    {testResults.filter((r) => r.status === 'passed').length}
                  </div>
                  <div>
                    <span className="font-medium">Failed:</span>{' '}
                    {testResults.filter((r) => r.status === 'failed').length}
                  </div>
                  <div>
                    <span className="font-medium">Duration:</span>{' '}
                    {testResults.reduce((acc, r) => acc + (r.duration || 0), 0)}
                    ms
                  </div>
                </div>
                <div className="mt-2 flex gap-2">
                  <Button size="sm" variant="outline">
                    <Download className="mr-1 h-4 w-4" />
                    Export Results
                  </Button>
                  <Button size="sm" variant="outline">
                    <Share className="mr-1 h-4 w-4" />
                    Share Results
                  </Button>
                </div>
              </div>
            )}
          </TabsPrimitive.Content>
        </TabsPrimitive.Root>
      </CardContent>
    </Card>
  )
}
