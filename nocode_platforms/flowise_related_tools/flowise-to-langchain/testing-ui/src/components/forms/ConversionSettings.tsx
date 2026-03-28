'use client'

import React, { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
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
  Settings,
  Code,
  Download,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Info,
  Zap,
  FileText,
  Cpu,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Validation schema
const conversionSettingsSchema = z.object({
  outputLanguage: z.enum(['python', 'javascript', 'both']),
  includeComments: z.boolean().default(true),
  includeDocstrings: z.boolean().default(true),
  useTypeHints: z.boolean().default(true),
  optimizeImports: z.boolean().default(true),
  formatCode: z.boolean().default(true),
  includeTesting: z.boolean().default(false),
  includeErrorHandling: z.boolean().default(true),
  includeLogging: z.boolean().default(false),
  packageManager: z.enum(['pip', 'conda', 'npm', 'yarn']).default('pip'),
  pythonVersion: z.enum(['3.8', '3.9', '3.10', '3.11', '3.12']).default('3.11'),
  nodeVersion: z.enum(['16', '18', '20', '21']).default('20'),
  langchainVersion: z.enum(['latest', '0.1.x', '0.2.x']).default('latest'),
  outputDirectory: z.string().default('./output'),
  projectName: z.string().min(1, 'Project name is required'),
  includeRequirements: z.boolean().default(true),
  includeReadme: z.boolean().default(true),
  includeExamples: z.boolean().default(false),
  customTemplate: z.string().optional(),
  environmentVariables: z.record(z.string()).optional(),
  customDependencies: z.array(z.string()).optional(),
})

type ConversionSettingsType = z.infer<typeof conversionSettingsSchema>

interface ConversionSettingsProps {
  initialSettings?: Partial<ConversionSettingsType>
  onSettingsChange?: (settings: ConversionSettingsType) => void
  onGenerate?: (settings: ConversionSettingsType) => void
  isGenerating?: boolean
  className?: string
  disabled?: boolean
}

export function ConversionSettings({
  initialSettings,
  onSettingsChange,
  onGenerate,
  isGenerating = false,
  className,
  disabled = false,
}: ConversionSettingsProps) {
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced' | 'output'>(
    'basic'
  )
  const [customDeps, setCustomDeps] = useState<string[]>([])
  const [newDep, setNewDep] = useState('')
  const [envVars, setEnvVars] = useState<Record<string, string>>({})
  const [newEnvKey, setNewEnvKey] = useState('')
  const [newEnvValue, setNewEnvValue] = useState('')

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<ConversionSettingsType>({
    resolver: zodResolver(conversionSettingsSchema),
    defaultValues: {
      outputLanguage: 'python',
      includeComments: true,
      includeDocstrings: true,
      useTypeHints: true,
      optimizeImports: true,
      formatCode: true,
      includeTesting: false,
      includeErrorHandling: true,
      includeLogging: false,
      packageManager: 'pip',
      pythonVersion: '3.11',
      nodeVersion: '20',
      langchainVersion: 'latest',
      outputDirectory: './output',
      projectName: 'flowise-conversion',
      includeRequirements: true,
      includeReadme: true,
      includeExamples: false,
      customDependencies: [],
      environmentVariables: {},
      ...initialSettings,
    },
  })

  const watchedValues = watch()
  const outputLanguage = watch('outputLanguage')

  // Update parent component when settings change
  useEffect(() => {
    if (isValid) {
      onSettingsChange?.(watchedValues)
    }
  }, [watchedValues, isValid, onSettingsChange])

  // Initialize custom dependencies and environment variables
  useEffect(() => {
    if (initialSettings?.customDependencies) {
      setCustomDeps(initialSettings.customDependencies)
    }
    if (initialSettings?.environmentVariables) {
      setEnvVars(initialSettings.environmentVariables)
    }
  }, [initialSettings])

  const handleAddDependency = () => {
    if (newDep.trim() && !customDeps.includes(newDep.trim())) {
      const updated = [...customDeps, newDep.trim()]
      setCustomDeps(updated)
      setValue('customDependencies', updated)
      setNewDep('')
    }
  }

  const handleRemoveDependency = (dep: string) => {
    const updated = customDeps.filter((d) => d !== dep)
    setCustomDeps(updated)
    setValue('customDependencies', updated)
  }

  const handleAddEnvVar = () => {
    if (newEnvKey.trim() && newEnvValue.trim() && !envVars[newEnvKey.trim()]) {
      const updated = { ...envVars, [newEnvKey.trim()]: newEnvValue.trim() }
      setEnvVars(updated)
      setValue('environmentVariables', updated)
      setNewEnvKey('')
      setNewEnvValue('')
    }
  }

  const handleRemoveEnvVar = (key: string) => {
    const updated = { ...envVars }
    delete updated[key]
    setEnvVars(updated)
    setValue('environmentVariables', updated)
  }

  const onSubmit = (data: ConversionSettingsType) => {
    onGenerate?.(data)
  }

  const resetToDefaults = () => {
    const defaults = conversionSettingsSchema.parse({})
    Object.entries(defaults).forEach(([key, value]) => {
      setValue(key as keyof ConversionSettingsType, value)
    })
    setCustomDeps([])
    setEnvVars({})
  }

  const tabs = [
    { id: 'basic', label: 'Basic', icon: Settings },
    { id: 'advanced', label: 'Advanced', icon: Cpu },
    { id: 'output', label: 'Output', icon: FileText },
  ]

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Conversion Settings
        </CardTitle>
        <CardDescription>
          Configure how your Flowise flow will be converted to LangChain code
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tab Navigation */}
          <div className="flex space-x-1 border-b">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() =>
                    setActiveTab(tab.id as 'basic' | 'advanced' | 'output')
                  }
                  className={cn(
                    'flex items-center gap-2 rounded-t-md px-4 py-2 text-sm font-medium transition-colors',
                    {
                      'bg-primary text-primary-foreground':
                        activeTab === tab.id,
                      'text-muted-foreground hover:text-foreground':
                        activeTab !== tab.id,
                    }
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Basic Settings */}
          {activeTab === 'basic' && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Output Language
                  </label>
                  <Controller
                    name="outputLanguage"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full rounded-md border bg-background p-2"
                        disabled={disabled}
                      >
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                        <option value="both">Both</option>
                      </select>
                    )}
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Project Name
                  </label>
                  <Controller
                    name="projectName"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="my-langchain-project"
                        disabled={disabled}
                        className={errors.projectName ? 'border-red-500' : ''}
                      />
                    )}
                  />
                  {errors.projectName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.projectName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {outputLanguage === 'python' || outputLanguage === 'both' ? (
                  <>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Python Version
                      </label>
                      <Controller
                        name="pythonVersion"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full rounded-md border bg-background p-2"
                            disabled={disabled}
                          >
                            <option value="3.8">Python 3.8</option>
                            <option value="3.9">Python 3.9</option>
                            <option value="3.10">Python 3.10</option>
                            <option value="3.11">Python 3.11</option>
                            <option value="3.12">Python 3.12</option>
                          </select>
                        )}
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Package Manager
                      </label>
                      <Controller
                        name="packageManager"
                        control={control}
                        render={({ field }) => (
                          <select
                            {...field}
                            className="w-full rounded-md border bg-background p-2"
                            disabled={disabled}
                          >
                            <option value="pip">pip</option>
                            <option value="conda">conda</option>
                            <option value="npm">npm</option>
                            <option value="yarn">yarn</option>
                          </select>
                        )}
                      />
                    </div>
                  </>
                ) : null}

                {outputLanguage === 'javascript' ||
                outputLanguage === 'both' ? (
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Node Version
                    </label>
                    <Controller
                      name="nodeVersion"
                      control={control}
                      render={({ field }) => (
                        <select
                          {...field}
                          className="w-full rounded-md border bg-background p-2"
                          disabled={disabled}
                        >
                          <option value="16">Node 16</option>
                          <option value="18">Node 18</option>
                          <option value="20">Node 20</option>
                          <option value="21">Node 21</option>
                        </select>
                      )}
                    />
                  </div>
                ) : null}

                <div>
                  <label className="mb-2 block text-sm font-medium">
                    LangChain Version
                  </label>
                  <Controller
                    name="langchainVersion"
                    control={control}
                    render={({ field }) => (
                      <select
                        {...field}
                        className="w-full rounded-md border bg-background p-2"
                        disabled={disabled}
                      >
                        <option value="latest">Latest</option>
                        <option value="0.1.x">0.1.x</option>
                        <option value="0.2.x">0.2.x</option>
                      </select>
                    )}
                  />
                </div>
              </div>

              {/* Code Generation Options */}
              <div className="space-y-3">
                <h4 className="font-medium">Code Generation Options</h4>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'includeComments', label: 'Include Comments' },
                    { name: 'includeDocstrings', label: 'Include Docstrings' },
                    { name: 'useTypeHints', label: 'Use Type Hints' },
                    { name: 'optimizeImports', label: 'Optimize Imports' },
                    { name: 'formatCode', label: 'Format Code' },
                    {
                      name: 'includeErrorHandling',
                      label: 'Include Error Handling',
                    },
                    { name: 'includeLogging', label: 'Include Logging' },
                    { name: 'includeTesting', label: 'Include Testing' },
                  ].map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center space-x-2"
                    >
                      <Controller
                        name={option.name as keyof ConversionSettingsType}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            name={field.name}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            checked={field.value as boolean}
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
            </div>
          )}

          {/* Advanced Settings */}
          {activeTab === 'advanced' && (
            <div className="space-y-4">
              {/* Custom Dependencies */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Custom Dependencies
                </label>
                <div className="mb-2 flex gap-2">
                  <Input
                    value={newDep}
                    onChange={(e) => setNewDep(e.target.value)}
                    placeholder="package-name==1.0.0"
                    disabled={disabled}
                    onKeyPress={(e) =>
                      e.key === 'Enter' &&
                      (e.preventDefault(), handleAddDependency())
                    }
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddDependency}
                    disabled={disabled || !newDep.trim()}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customDeps.map((dep) => (
                    <Badge
                      key={dep}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {dep}
                      <button
                        type="button"
                        onClick={() => handleRemoveDependency(dep)}
                        disabled={disabled}
                        className="text-xs hover:text-red-500"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Environment Variables */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Environment Variables
                </label>
                <div className="mb-2 grid grid-cols-2 gap-2">
                  <Input
                    value={newEnvKey}
                    onChange={(e) => setNewEnvKey(e.target.value)}
                    placeholder="VARIABLE_NAME"
                    disabled={disabled}
                  />
                  <Input
                    value={newEnvValue}
                    onChange={(e) => setNewEnvValue(e.target.value)}
                    placeholder="default_value"
                    disabled={disabled}
                    onKeyPress={(e) =>
                      e.key === 'Enter' &&
                      (e.preventDefault(), handleAddEnvVar())
                    }
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleAddEnvVar}
                  disabled={
                    disabled || !newEnvKey.trim() || !newEnvValue.trim()
                  }
                  className="mb-2"
                >
                  Add Variable
                </Button>
                <div className="space-y-2">
                  {Object.entries(envVars).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between rounded bg-muted p-2"
                    >
                      <span className="font-mono text-sm">
                        {key}={value}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleRemoveEnvVar(key)}
                        disabled={disabled}
                        className="text-red-500 hover:text-red-700"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Template */}
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Custom Template
                </label>
                <Controller
                  name="customTemplate"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      rows={4}
                      className="w-full rounded-md border bg-background p-2"
                      placeholder="Enter custom code template..."
                      disabled={disabled}
                    />
                  )}
                />
              </div>
            </div>
          )}

          {/* Output Settings */}
          {activeTab === 'output' && (
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Output Directory
                </label>
                <Controller
                  name="outputDirectory"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="./output"
                      disabled={disabled}
                    />
                  )}
                />
              </div>

              <div className="space-y-3">
                <h4 className="font-medium">Include in Output</h4>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    {
                      name: 'includeRequirements',
                      label: 'Requirements/Package file',
                    },
                    { name: 'includeReadme', label: 'README.md file' },
                    { name: 'includeExamples', label: 'Example usage files' },
                  ].map((option) => (
                    <div
                      key={option.name}
                      className="flex items-center space-x-2"
                    >
                      <Controller
                        name={option.name as keyof ConversionSettingsType}
                        control={control}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            name={field.name}
                            onChange={field.onChange}
                            onBlur={field.onBlur}
                            checked={field.value as boolean}
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
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-between border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={resetToDefaults}
              disabled={disabled}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset to Defaults
            </Button>

            <div className="flex gap-2">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {isValid ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Settings Valid
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-500" />
                    Check Settings
                  </>
                )}
              </div>

              <Button
                type="submit"
                disabled={disabled || !isValid || isGenerating}
                className="min-w-32"
              >
                {isGenerating ? (
                  <>
                    <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Zap className="mr-2 h-4 w-4" />
                    Generate Code
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
