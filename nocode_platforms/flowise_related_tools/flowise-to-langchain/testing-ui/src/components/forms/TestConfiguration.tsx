'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
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
  TestTube,
  Plus,
  Trash2,
  Play,
  Settings,
  Clock,
  AlertCircle,
  CheckCircle,
  Copy,
  Download,
  Upload,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { TestCase, TestAssertion, FlowiseFlow } from '@/types'

// Validation schemas
const testAssertionSchema = z.object({
  id: z.string(),
  type: z.enum(['equals', 'contains', 'matches', 'custom']),
  field: z.string().min(1, 'Field path is required'),
  value: z.any(),
  message: z.string().optional(),
})

const testCaseSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Test name is required'),
  description: z.string().optional(),
  input: z.any(),
  expectedOutput: z.any().optional(),
  timeout: z.number().min(1000).max(300000).optional(),
  assertions: z.array(testAssertionSchema),
})

const testConfigurationSchema = z.object({
  flowId: z.string().optional(),
  testCases: z.array(testCaseSchema),
  globalSettings: z.object({
    defaultTimeout: z.number().min(1000).max(300000).default(30000),
    maxRetries: z.number().min(0).max(10).default(3),
    parallelExecution: z.boolean().default(false),
    stopOnFirstFailure: z.boolean().default(false),
    generateReport: z.boolean().default(true),
    saveResults: z.boolean().default(true),
  }),
})

type TestConfigurationType = z.infer<typeof testConfigurationSchema>

interface TestConfigurationProps {
  flowId?: string
  flows?: FlowiseFlow[]
  initialConfig?: Partial<TestConfigurationType>
  onConfigChange?: (config: TestConfigurationType) => void
  onRunTests?: (config: TestConfigurationType) => void
  onSaveConfig?: (config: TestConfigurationType) => void
  onLoadConfig?: (file: File) => void
  isRunning?: boolean
  className?: string
  disabled?: boolean
}

export function TestConfiguration({
  flowId,
  flows = [],
  initialConfig,
  onConfigChange,
  onRunTests,
  onSaveConfig,
  onLoadConfig,
  isRunning = false,
  className,
  disabled = false,
}: TestConfigurationProps) {
  const [activeTestCase, setActiveTestCase] = useState<number>(0)
  const [jsonInput, setJsonInput] = useState('')
  const [jsonOutput, setJsonOutput] = useState('')
  const [inputFormat, setInputFormat] = useState<'json' | 'form'>('json')

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<TestConfigurationType>({
    resolver: zodResolver(testConfigurationSchema),
    defaultValues: {
      flowId: flowId || '',
      testCases: [],
      globalSettings: {
        defaultTimeout: 30000,
        maxRetries: 3,
        parallelExecution: false,
        stopOnFirstFailure: false,
        generateReport: true,
        saveResults: true,
      },
      ...initialConfig,
    },
  })

  const {
    fields: testCases,
    append: appendTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control,
    name: 'testCases',
  })

  const watchedValues = watch()

  // Update parent component when config changes
  useEffect(() => {
    if (isValid) {
      onConfigChange?.(watchedValues)
    }
  }, [watchedValues, isValid, onConfigChange])

  // Generate a unique ID for new items
  const generateId = () =>
    `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

  const addTestCase = () => {
    const newTestCase: TestCase = {
      id: generateId(),
      name: `Test Case ${testCases.length + 1}`,
      description: '',
      input: {},
      expectedOutput: {},
      timeout: 30000,
      assertions: [],
    }

    appendTestCase(newTestCase)
    setActiveTestCase(testCases.length)
  }

  const duplicateTestCase = (index: number) => {
    const original = testCases[index]
    const duplicated = {
      ...original,
      id: generateId(),
      name: `${original.name} (Copy)`,
    }
    appendTestCase(duplicated)
    setActiveTestCase(testCases.length)
  }

  const addAssertion = (testCaseIndex: number) => {
    const testCase = testCases[testCaseIndex]
    const newAssertion: TestAssertion = {
      id: generateId(),
      type: 'equals',
      field: '',
      value: '',
      message: '',
    }

    const updatedAssertions = [...testCase.assertions, newAssertion]
    setValue(`testCases.${testCaseIndex}.assertions`, updatedAssertions)
  }

  const removeAssertion = (testCaseIndex: number, assertionIndex: number) => {
    const testCase = testCases[testCaseIndex]
    const updatedAssertions = testCase.assertions.filter(
      (_, index) => index !== assertionIndex
    )
    setValue(`testCases.${testCaseIndex}.assertions`, updatedAssertions)
  }

  const updateTestInput = (testCaseIndex: number, input: any) => {
    setValue(`testCases.${testCaseIndex}.input`, input)
  }

  const updateTestOutput = (testCaseIndex: number, output: any) => {
    setValue(`testCases.${testCaseIndex}.expectedOutput`, output)
  }

  const handleJsonInputChange = (value: string) => {
    setJsonInput(value)
    try {
      const parsed = JSON.parse(value)
      updateTestInput(activeTestCase, parsed)
    } catch (error) {
      // Invalid JSON, don't update
    }
  }

  const handleJsonOutputChange = (value: string) => {
    setJsonOutput(value)
    try {
      const parsed = JSON.parse(value)
      updateTestOutput(activeTestCase, parsed)
    } catch (error) {
      // Invalid JSON, don't update
    }
  }

  const onSubmit = (data: TestConfigurationType) => {
    onRunTests?.(data)
  }

  const handleSaveConfig = () => {
    if (isValid) {
      onSaveConfig?.(watchedValues)
    }
  }

  const handleExportConfig = () => {
    if (isValid) {
      const configBlob = new Blob([JSON.stringify(watchedValues, null, 2)], {
        type: 'application/json',
      })
      const url = URL.createObjectURL(configBlob)
      const a = document.createElement('a')
      a.href = url
      a.download = `test-config-${Date.now()}.json`
      a.click()
      URL.revokeObjectURL(url)
    }
  }

  const handleImportConfig = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      onLoadConfig?.(file)
      // Reset the input
      event.target.value = ''
    }
  }

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TestTube className="h-5 w-5" />
              Test Configuration
            </CardTitle>
            <CardDescription>
              Configure test cases and settings for your Flowise flow
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportConfig}
              disabled={disabled || !isValid}
            >
              <Download className="mr-1 h-4 w-4" />
              Export
            </Button>
            <label className="cursor-pointer">
              <input
                type="file"
                accept=".json"
                onChange={handleImportConfig}
                className="hidden"
                disabled={disabled}
              />
              <Button variant="outline" size="sm" disabled={disabled} asChild>
                <span>
                  <Upload className="mr-1 h-4 w-4" />
                  Import
                </span>
              </Button>
            </label>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Flow Selection */}
          {flows.length > 0 && (
            <div>
              <label className="mb-2 block text-sm font-medium">
                Target Flow
              </label>
              <Controller
                name="flowId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    className="w-full rounded-md border bg-background p-2"
                    disabled={disabled}
                  >
                    <option value="">Select a flow</option>
                    {flows.map((flow) => (
                      <option key={flow.id} value={flow.id}>
                        {flow.name}
                      </option>
                    ))}
                  </select>
                )}
              />
            </div>
          )}

          {/* Global Settings */}
          <div className="space-y-4">
            <h4 className="flex items-center gap-2 font-medium">
              <Settings className="h-4 w-4" />
              Global Settings
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Default Timeout (ms)
                </label>
                <Controller
                  name="globalSettings.defaultTimeout"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={1000}
                      max={300000}
                      step={1000}
                      disabled={disabled}
                    />
                  )}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Max Retries
                </label>
                <Controller
                  name="globalSettings.maxRetries"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="number"
                      min={0}
                      max={10}
                      disabled={disabled}
                    />
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'parallelExecution', label: 'Parallel Execution' },
                { name: 'stopOnFirstFailure', label: 'Stop on First Failure' },
                { name: 'generateReport', label: 'Generate Report' },
                { name: 'saveResults', label: 'Save Results' },
              ].map((option) => (
                <div key={option.name} className="flex items-center space-x-2">
                  <Controller
                    name={
                      `globalSettings.${option.name}` as keyof TestConfigurationType
                    }
                    control={control}
                    render={({ field }) => (
                      <input
                        type="checkbox"
                        name={field.name}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        checked={Boolean(field.value)}
                        disabled={disabled}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                    )}
                  />
                  <label className="text-sm">{option.label}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Test Cases */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">Test Cases ({testCases.length})</h4>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTestCase}
                disabled={disabled}
              >
                <Plus className="mr-1 h-4 w-4" />
                Add Test Case
              </Button>
            </div>

            {testCases.length === 0 ? (
              <div className="py-8 text-center text-muted-foreground">
                <TestTube className="mx-auto mb-2 h-12 w-12 opacity-50" />
                <p>No test cases configured</p>
                <p className="text-sm">
                  Add your first test case to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Test Case Tabs */}
                <div className="flex flex-wrap gap-2">
                  {testCases.map((testCase, index) => (
                    <button
                      key={testCase.id}
                      type="button"
                      onClick={() => setActiveTestCase(index)}
                      className={cn(
                        'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
                        {
                          'bg-primary text-primary-foreground':
                            activeTestCase === index,
                          'bg-muted hover:bg-muted/80':
                            activeTestCase !== index,
                        }
                      )}
                    >
                      <span>{testCase.name}</span>
                      {testCase.assertions.length > 0 && (
                        <Badge variant="secondary" className="text-xs">
                          {testCase.assertions.length}
                        </Badge>
                      )}
                    </button>
                  ))}
                </div>

                {/* Active Test Case */}
                {testCases[activeTestCase] && (
                  <div className="space-y-4 rounded-lg border p-4">
                    <div className="flex items-center justify-between">
                      <div className="grid flex-1 grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Test Name
                          </label>
                          <Controller
                            name={`testCases.${activeTestCase}.name`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                placeholder="Test name"
                                disabled={disabled}
                              />
                            )}
                          />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-medium">
                            Timeout (ms)
                          </label>
                          <Controller
                            name={`testCases.${activeTestCase}.timeout`}
                            control={control}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="number"
                                min={1000}
                                max={300000}
                                step={1000}
                                disabled={disabled}
                              />
                            )}
                          />
                        </div>
                      </div>
                      <div className="ml-4 flex items-center gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => duplicateTestCase(activeTestCase)}
                          disabled={disabled}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeTestCase(activeTestCase)}
                          disabled={disabled || testCases.length === 1}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Description
                      </label>
                      <Controller
                        name={`testCases.${activeTestCase}.description`}
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            rows={2}
                            className="w-full rounded-md border bg-background p-2"
                            placeholder="Test description..."
                            disabled={disabled}
                          />
                        )}
                      />
                    </div>

                    {/* Input Configuration */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium">
                          Test Input
                        </label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={
                              inputFormat === 'json' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setInputFormat('json')}
                          >
                            JSON
                          </Button>
                          <Button
                            type="button"
                            variant={
                              inputFormat === 'form' ? 'default' : 'outline'
                            }
                            size="sm"
                            onClick={() => setInputFormat('form')}
                          >
                            Form
                          </Button>
                        </div>
                      </div>
                      <textarea
                        value={
                          jsonInput ||
                          JSON.stringify(
                            testCases[activeTestCase].input,
                            null,
                            2
                          )
                        }
                        onChange={(e) => handleJsonInputChange(e.target.value)}
                        rows={4}
                        className="w-full rounded-md border bg-background p-2 font-mono text-sm"
                        placeholder="Enter test input JSON..."
                        disabled={disabled}
                      />
                    </div>

                    {/* Expected Output */}
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Expected Output
                      </label>
                      <textarea
                        value={
                          jsonOutput ||
                          JSON.stringify(
                            testCases[activeTestCase].expectedOutput,
                            null,
                            2
                          )
                        }
                        onChange={(e) => handleJsonOutputChange(e.target.value)}
                        rows={4}
                        className="w-full rounded-md border bg-background p-2 font-mono text-sm"
                        placeholder="Enter expected output JSON..."
                        disabled={disabled}
                      />
                    </div>

                    {/* Assertions */}
                    <div>
                      <div className="mb-2 flex items-center justify-between">
                        <label className="block text-sm font-medium">
                          Assertions
                        </label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => addAssertion(activeTestCase)}
                          disabled={disabled}
                        >
                          <Plus className="mr-1 h-4 w-4" />
                          Add Assertion
                        </Button>
                      </div>
                      {testCases[activeTestCase].assertions.map(
                        (assertion, assertionIndex) => (
                          <div
                            key={assertion.id}
                            className="mb-2 flex items-center gap-2"
                          >
                            <Controller
                              name={`testCases.${activeTestCase}.assertions.${assertionIndex}.type`}
                              control={control}
                              render={({ field }) => (
                                <select
                                  {...field}
                                  className="rounded-md border bg-background p-2"
                                  disabled={disabled}
                                >
                                  <option value="equals">Equals</option>
                                  <option value="contains">Contains</option>
                                  <option value="matches">Matches</option>
                                  <option value="custom">Custom</option>
                                </select>
                              )}
                            />
                            <Controller
                              name={`testCases.${activeTestCase}.assertions.${assertionIndex}.field`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Field path"
                                  disabled={disabled}
                                />
                              )}
                            />
                            <Controller
                              name={`testCases.${activeTestCase}.assertions.${assertionIndex}.value`}
                              control={control}
                              render={({ field }) => (
                                <Input
                                  {...field}
                                  placeholder="Expected value"
                                  disabled={disabled}
                                />
                              )}
                            />
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                removeAssertion(activeTestCase, assertionIndex)
                              }
                              disabled={disabled}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleSaveConfig}
                disabled={disabled || !isValid}
              >
                Save Config
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isValid ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Configuration Valid
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Check Configuration
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              disabled={
                disabled || !isValid || isRunning || testCases.length === 0
              }
              className="min-w-32"
            >
              {isRunning ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  Running...
                </>
              ) : (
                <>
                  <Play className="mr-2 h-4 w-4" />
                  Run Tests
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
