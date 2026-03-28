'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Settings,
  TestTube,
  CheckCircle,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
  ExternalLink,
  Save,
  RefreshCw,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Separator } from '@/components/ui/separator'

import { FlowiseApiClient, FlowiseConfig } from '@/lib/flowise-api-client'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { crypto } from '@/lib/crypto'

// Validation schema
const settingsSchema = z.object({
  url: z
    .string()
    .url('Please enter a valid URL')
    .min(1, 'Flowise URL is required'),
  apiKey: z.string().optional(),
  timeout: z
    .number()
    .min(1000, 'Timeout must be at least 1000ms')
    .max(120000, 'Timeout cannot exceed 120000ms')
    .optional(),
  retryAttempts: z
    .number()
    .min(1, 'Retry attempts must be at least 1')
    .max(10, 'Retry attempts cannot exceed 10')
    .optional(),
  retryDelay: z
    .number()
    .min(100, 'Retry delay must be at least 100ms')
    .max(10000, 'Retry delay cannot exceed 10000ms')
    .optional(),
  cacheEnabled: z.boolean().optional(),
  cacheTtl: z
    .number()
    .min(60000, 'Cache TTL must be at least 1 minute')
    .max(3600000, 'Cache TTL cannot exceed 1 hour')
    .optional(),
})

type SettingsFormData = z.infer<typeof settingsSchema>

interface ConnectionStatus {
  status: 'idle' | 'testing' | 'connected' | 'error'
  message?: string
  details?: any
}

interface FlowiseSettingsProps {
  onConfigChange?: (config: FlowiseConfig) => void
  className?: string
}

export function FlowiseSettings({
  onConfigChange,
  className,
}: FlowiseSettingsProps) {
  // Local storage for persistence with encryption
  const [storedConfig, setStoredConfig] = useLocalStorage<FlowiseConfig>(
    'flowise-config',
    {
      url: 'http://localhost:3000',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      cacheEnabled: true,
      cacheTtl: 300000,
    },
    {
      // Custom serializer to encrypt sensitive data
      serialize: (value) => {
        const configCopy = { ...value }
        if (configCopy.apiKey) {
          configCopy.apiKey = crypto.encrypt(configCopy.apiKey)
        }
        return JSON.stringify(configCopy)
      },
      deserialize: (value) => {
        try {
          const config = JSON.parse(value)
          if (config.apiKey && crypto.isEncrypted(config.apiKey)) {
            config.apiKey = crypto.decrypt(config.apiKey)
          }
          return config
        } catch {
          return value
        }
      },
    }
  )

  // Form state
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      url: storedConfig.url,
      apiKey: storedConfig.apiKey || '',
      timeout: storedConfig.timeout || 30000,
      retryAttempts: storedConfig.retryAttempts || 3,
      retryDelay: storedConfig.retryDelay || 1000,
      cacheEnabled: storedConfig.cacheEnabled !== undefined ? storedConfig.cacheEnabled : true,
      cacheTtl: storedConfig.cacheTtl || 300000,
    },
  })

  // Component state
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    status: 'idle',
  })
  const [showApiKey, setShowApiKey] = useState(false)
  const [client, setClient] = useState<FlowiseApiClient>(
    new FlowiseApiClient(storedConfig)
  )
  const [isAutoTesting, setIsAutoTesting] = useState(false)

  // Watch form values for auto-testing
  const watchedValues = watch()

  // Auto-test connection when URL or API key changes
  useEffect(() => {
    if (!isAutoTesting || !watchedValues.url) return

    const timeoutId = setTimeout(() => {
      if (watchedValues.url !== storedConfig.url || 
          watchedValues.apiKey !== storedConfig.apiKey) {
        testConnection(watchedValues, true)
      }
    }, 1000) // Debounce for 1 second

    return () => clearTimeout(timeoutId)
  }, [watchedValues.url, watchedValues.apiKey, isAutoTesting, storedConfig])

  // Test connection to Flowise
  const testConnection = async (config?: SettingsFormData, silent = false) => {
    const testConfig = config || watchedValues
    
    if (!testConfig.url) {
      setConnectionStatus({
        status: 'error',
        message: 'Please enter a Flowise URL',
      })
      return false
    }

    if (!silent) {
      setConnectionStatus({ status: 'testing' })
    }

    try {
      const testClient = new FlowiseApiClient({
        url: testConfig.url,
        apiKey: testConfig.apiKey || undefined,
        timeout: testConfig.timeout || 30000,
      })

      const result = await testClient.testConnection()

      if (result.success) {
        setConnectionStatus({
          status: 'connected',
          message: 'Successfully connected to Flowise',
          details: result.data,
        })
        return true
      } else {
        setConnectionStatus({
          status: 'error',
          message: result.error || 'Connection test failed',
        })
        return false
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Connection test failed'
      setConnectionStatus({
        status: 'error',
        message,
      })
      return false
    }
  }

  // Save configuration
  const onSubmit = async (data: SettingsFormData) => {
    const config: FlowiseConfig = {
      url: data.url,
      apiKey: data.apiKey || undefined,
      timeout: data.timeout || 30000,
    }

    // Test connection before saving
    const isConnected = await testConnection(data)
    
    if (isConnected) {
      // Update stored config
      setStoredConfig(config)
      
      // Update client instance
      const newClient = new FlowiseApiClient(config)
      setClient(newClient)
      
      // Notify parent component
      onConfigChange?.(config)

      setConnectionStatus({
        status: 'connected',
        message: 'Configuration saved successfully',
      })
    }
  }

  // Reset to defaults
  const resetToDefaults = () => {
    const defaultConfig = {
      url: 'http://localhost:3000',
      apiKey: '',
      timeout: 30000,
    }
    
    setValue('url', defaultConfig.url)
    setValue('apiKey', defaultConfig.apiKey)
    setValue('timeout', defaultConfig.timeout)
    
    setConnectionStatus({ status: 'idle' })
  }

  // Load from environment
  const loadFromEnvironment = () => {
    if (process.env.NEXT_PUBLIC_FLOWISE_URL) {
      setValue('url', process.env.NEXT_PUBLIC_FLOWISE_URL)
    }
    if (process.env.NEXT_PUBLIC_FLOWISE_API_KEY) {
      setValue('apiKey', process.env.NEXT_PUBLIC_FLOWISE_API_KEY)
    }
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Flowise Integration Settings
          </CardTitle>
          <CardDescription>
            Configure your connection to the Flowise server to import and test flows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="connection" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="connection">Connection</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
              <TabsTrigger value="status">Status</TabsTrigger>
            </TabsList>

            <TabsContent value="connection" className="space-y-4">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Flowise URL */}
                <div className="space-y-2">
                  <Label htmlFor="url">Flowise Server URL *</Label>
                  <div className="flex gap-2">
                    <Input
                      id="url"
                      placeholder="http://localhost:3000"
                      {...register('url')}
                      className={errors.url ? 'border-red-500' : ''}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => window.open(watchedValues.url, '_blank')}
                      disabled={!watchedValues.url}
                      title="Open Flowise in new tab"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                  {errors.url && (
                    <p className="text-sm text-red-600">{errors.url.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    The URL where your Flowise instance is running
                  </p>
                </div>

                {/* API Key */}
                <div className="space-y-2">
                  <Label htmlFor="apiKey">API Key (Optional)</Label>
                  <div className="flex gap-2">
                    <Input
                      id="apiKey"
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="Your Flowise API key"
                      {...register('apiKey')}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setShowApiKey(!showApiKey)}
                    >
                      {showApiKey ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Required only if your Flowise instance has API key authentication enabled
                  </p>
                </div>

                {/* Connection Status */}
                {connectionStatus.status !== 'idle' && (
                  <Alert
                    variant={
                      connectionStatus.status === 'connected'
                        ? 'default'
                        : connectionStatus.status === 'error'
                        ? 'destructive'
                        : 'default'
                    }
                  >
                    {connectionStatus.status === 'testing' && (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    )}
                    {connectionStatus.status === 'connected' && (
                      <CheckCircle className="h-4 w-4" />
                    )}
                    {connectionStatus.status === 'error' && (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertDescription>{connectionStatus.message}</AlertDescription>
                  </Alert>
                )}

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Button type="submit" disabled={!isDirty}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Configuration
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => testConnection()}
                    disabled={connectionStatus.status === 'testing'}
                  >
                    {connectionStatus.status === 'testing' ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <TestTube className="mr-2 h-4 w-4" />
                    )}
                    Test Connection
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetToDefaults}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Reset to Defaults
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
              <div className="space-y-4">
                {/* Timeout Setting */}
                <div className="space-y-2">
                  <Label htmlFor="timeout">Request Timeout (ms)</Label>
                  <Input
                    id="timeout"
                    type="number"
                    min="1000"
                    max="120000"
                    step="1000"
                    {...register('timeout', { valueAsNumber: true })}
                    className={errors.timeout ? 'border-red-500' : ''}
                  />
                  {errors.timeout && (
                    <p className="text-sm text-red-600">{errors.timeout.message}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    How long to wait for API responses (1-120 seconds)
                  </p>
                </div>

                {/* Retry Settings */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="retryAttempts">Retry Attempts</Label>
                    <Input
                      id="retryAttempts"
                      type="number"
                      min="1"
                      max="10"
                      {...register('retryAttempts', { valueAsNumber: true })}
                      className={errors.retryAttempts ? 'border-red-500' : ''}
                    />
                    {errors.retryAttempts && (
                      <p className="text-sm text-red-600">{errors.retryAttempts.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Number of retry attempts on failure
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="retryDelay">Retry Delay (ms)</Label>
                    <Input
                      id="retryDelay"
                      type="number"
                      min="100"
                      max="10000"
                      step="100"
                      {...register('retryDelay', { valueAsNumber: true })}
                      className={errors.retryDelay ? 'border-red-500' : ''}
                    />
                    {errors.retryDelay && (
                      <p className="text-sm text-red-600">{errors.retryDelay.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      Initial delay between retries
                    </p>
                  </div>
                </div>

                {/* Cache Settings */}
                <Separator />
                <div className="space-y-4">
                  <h4 className="font-medium">Cache Settings</h4>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="cacheEnabled"
                      {...register('cacheEnabled')}
                    />
                    <Label htmlFor="cacheEnabled">Enable response caching</Label>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cacheTtl">Cache TTL (ms)</Label>
                    <Input
                      id="cacheTtl"
                      type="number"
                      min="60000"
                      max="3600000"
                      step="60000"
                      {...register('cacheTtl', { valueAsNumber: true })}
                      className={errors.cacheTtl ? 'border-red-500' : ''}
                      disabled={!watch('cacheEnabled')}
                    />
                    {errors.cacheTtl && (
                      <p className="text-sm text-red-600">{errors.cacheTtl.message}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      How long to cache responses (1-60 minutes)
                    </p>
                  </div>
                </div>

                {/* Auto-test toggle */}
                <Separator />
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="auto-test"
                    checked={isAutoTesting}
                    onChange={(e) => setIsAutoTesting(e.target.checked)}
                  />
                  <Label htmlFor="auto-test">Auto-test connection on changes</Label>
                </div>

                {/* Environment Variables */}
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Environment Variables</h4>
                  <p className="text-sm text-muted-foreground">
                    Load configuration from environment variables
                  </p>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <p>
                      <code>NEXT_PUBLIC_FLOWISE_URL</code>:{' '}
                      {process.env.NEXT_PUBLIC_FLOWISE_URL || 'Not set'}
                    </p>
                    <p>
                      <code>NEXT_PUBLIC_FLOWISE_API_KEY</code>:{' '}
                      {process.env.NEXT_PUBLIC_FLOWISE_API_KEY ? 'Set' : 'Not set'}
                    </p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={loadFromEnvironment}
                  >
                    Load from Environment
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="status" className="space-y-4">
              <div className="space-y-4">
                {/* Current Configuration */}
                <div className="space-y-2">
                  <h4 className="font-medium">Current Configuration</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>URL:</span>
                      <span className="font-mono">{storedConfig.url}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>API Key:</span>
                      <Badge variant={storedConfig.apiKey ? 'default' : 'secondary'}>
                        {storedConfig.apiKey ? 'Configured' : 'Not Set'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Timeout:</span>
                      <span className="font-mono">{storedConfig.timeout}ms</span>
                    </div>
                  </div>
                </div>

                {/* Connection Details */}
                {connectionStatus.status === 'connected' && connectionStatus.details && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <h4 className="font-medium">Server Information</h4>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span>Status:</span>
                          <Badge variant="default">Connected</Badge>
                        </div>
                        {connectionStatus.details.version && (
                          <div className="flex justify-between">
                            <span>Version:</span>
                            <span className="font-mono">
                              {connectionStatus.details.version}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                {/* Quick Actions */}
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Quick Actions</h4>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => testConnection()}
                      disabled={connectionStatus.status === 'testing'}
                    >
                      {connectionStatus.status === 'testing' ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <TestTube className="mr-2 h-4 w-4" />
                      )}
                      Test Connection
                    </Button>
                    {storedConfig.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(storedConfig.url, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Open Flowise
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default FlowiseSettings