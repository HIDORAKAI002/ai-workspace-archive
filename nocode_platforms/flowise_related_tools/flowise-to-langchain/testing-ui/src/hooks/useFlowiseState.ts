'use client'

import { useState, useCallback, useEffect, useMemo } from 'react'
import { FlowiseApiClient, FlowiseConfig, FlowiseFlow } from '@/lib/flowise-api-client'
import { FlowiseFlow as LocalFlowiseFlow } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useNotifications } from '@/lib/notifications'
import { crypto } from '@/lib/crypto'

interface FlowiseState {
  // Configuration
  config: FlowiseConfig
  isConfigured: boolean
  
  // Connection
  connectionStatus: 'disconnected' | 'connecting' | 'connected' | 'error'
  connectionMessage?: string
  lastConnectionTest?: Date
  
  // Flows
  flows: FlowiseFlow[]
  selectedFlows: Set<string>
  importedFlows: LocalFlowiseFlow[]
  starredFlows: Set<string>
  
  // UI state
  loading: boolean
  error: string | null
  lastRefresh?: Date
  
  // Cache and performance
  cacheSize: number
  apiCallCount: number
  lastApiCall?: Date
}

interface FlowiseActions {
  // Configuration
  updateConfig: (config: Partial<FlowiseConfig>) => Promise<void>
  resetConfig: () => void
  
  // Connection
  testConnection: () => Promise<boolean>
  connect: () => Promise<void>
  disconnect: () => void
  
  // Flows
  loadFlows: (force?: boolean) => Promise<void>
  importFlow: (flow: FlowiseFlow) => Promise<LocalFlowiseFlow>
  importMultipleFlows: (flowIds: string[]) => Promise<LocalFlowiseFlow[]>
  selectFlow: (flowId: string) => void
  selectAllFlows: () => void
  clearSelection: () => void
  toggleStarFlow: (flowId: string) => void
  
  // Cache management
  clearCache: () => void
  getCacheStats: () => { size: number; keys: string[] }
  
  // Utilities
  exportState: () => string
  importState: (state: string) => void
  reset: () => void
}

export function useFlowiseState(): FlowiseState & FlowiseActions {
  const notifications = useNotifications()

  // Persistent state
  const [config, setConfig] = useLocalStorage<FlowiseConfig>(
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
  
  const [starredFlows, setStarredFlows] = useLocalStorage<Set<string>>('starred-flows', new Set())
  const [importedFlows, setImportedFlows] = useLocalStorage<LocalFlowiseFlow[]>('imported-flows', [])

  // Transient state
  const [connectionStatus, setConnectionStatus] = useState<FlowiseState['connectionStatus']>('disconnected')
  const [connectionMessage, setConnectionMessage] = useState<string>()
  const [lastConnectionTest, setLastConnectionTest] = useState<Date>()
  const [flows, setFlows] = useState<FlowiseFlow[]>([])
  const [selectedFlows, setSelectedFlows] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastRefresh, setLastRefresh] = useState<Date>()
  const [apiCallCount, setApiCallCount] = useState(0)
  const [lastApiCall, setLastApiCall] = useState<Date>()

  // API client instance
  const client = useMemo(() => new FlowiseApiClient(config), [config])

  // Computed state
  const isConfigured = useMemo(() => {
    return Boolean(config.url && config.url !== '')
  }, [config])

  const cacheSize = useMemo(() => {
    // This would need to be implemented in the API client
    return 0
  }, [])

  // Configuration actions
  const updateConfig = useCallback(async (newConfig: Partial<FlowiseConfig>) => {
    const updatedConfig = { ...config, ...newConfig }
    setConfig(updatedConfig)
    
    // Update client configuration
    client.updateConfig(newConfig)
    
    // Test connection if URL changed
    if (newConfig.url && newConfig.url !== config.url) {
      await testConnection()
    }
    
    notifications.configurationSaved()
  }, [config, setConfig, client, notifications])

  const resetConfig = useCallback(() => {
    setConfig({
      url: 'http://localhost:3000',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      cacheEnabled: true,
      cacheTtl: 300000,
    })
    setConnectionStatus('disconnected')
    setConnectionMessage(undefined)
  }, [setConfig])

  // Connection actions
  const testConnection = useCallback(async (): Promise<boolean> => {
    if (!isConfigured) {
      setConnectionStatus('error')
      setConnectionMessage('Configuration incomplete')
      return false
    }

    setConnectionStatus('connecting')
    setConnectionMessage('Testing connection...')
    setLastConnectionTest(new Date())
    setApiCallCount(prev => prev + 1)
    setLastApiCall(new Date())

    try {
      const result = await client.testConnection()
      
      if (result.success) {
        setConnectionStatus('connected')
        setConnectionMessage('Connected successfully')
        setError(null)
        notifications.flowiseConnectionSuccess(config.url)
        return true
      } else {
        setConnectionStatus('error')
        setConnectionMessage(result.error || 'Connection failed')
        setError(result.error || 'Connection failed')
        notifications.flowiseConnectionError(result.error || 'Connection failed')
        return false
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Connection test failed'
      setConnectionStatus('error')
      setConnectionMessage(message)
      setError(message)
      notifications.flowiseConnectionError(message)
      return false
    }
  }, [isConfigured, client, config.url, notifications])

  const connect = useCallback(async () => {
    const success = await testConnection()
    if (success) {
      await loadFlows()
    }
  }, [testConnection])

  const disconnect = useCallback(() => {
    setConnectionStatus('disconnected')
    setConnectionMessage(undefined)
    setFlows([])
    setSelectedFlows(new Set())
    setError(null)
  }, [])

  // Flow actions
  const loadFlows = useCallback(async (force = false) => {
    if (connectionStatus !== 'connected' && !force) {
      return
    }

    setLoading(true)
    setError(null)
    setApiCallCount(prev => prev + 1)
    setLastApiCall(new Date())

    try {
      const result = await client.getFlows()
      
      if (result.success && result.data) {
        setFlows(result.data.flows)
        setLastRefresh(new Date())
        setError(null)
      } else {
        throw new Error(result.error || 'Failed to load flows')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load flows'
      setError(message)
      notifications.error('Load Failed', message)
    } finally {
      setLoading(false)
    }
  }, [connectionStatus, client, notifications])

  const importFlow = useCallback(async (flow: FlowiseFlow): Promise<LocalFlowiseFlow> => {
    const localFlow: LocalFlowiseFlow = {
      id: flow.id,
      name: flow.name,
      description: flow.description || '',
      nodes: flow.flowData?.nodes || [],
      edges: flow.flowData?.edges || [],
      metadata: {
        flowiseId: flow.id,
        deployed: flow.deployed,
        isPublic: flow.isPublic,
        category: flow.category,
        originalFlowData: flow.flowData,
        importedAt: new Date().toISOString(),
      },
      createdAt: new Date(flow.createdDate),
      updatedAt: new Date(flow.updatedDate),
    }

    // Add to imported flows
    setImportedFlows(prev => {
      const existing = prev.find(f => f.id === flow.id)
      if (existing) {
        // Update existing
        return prev.map(f => f.id === flow.id ? localFlow : f)
      } else {
        // Add new
        return [...prev, localFlow]
      }
    })

    notifications.flowImportSuccess(flow.name)
    return localFlow
  }, [setImportedFlows, notifications])

  const importMultipleFlows = useCallback(async (flowIds: string[]): Promise<LocalFlowiseFlow[]> => {
    const flowsToImport = flows.filter(f => flowIds.includes(f.id))
    const imported: LocalFlowiseFlow[] = []

    for (const flow of flowsToImport) {
      try {
        const localFlow = await importFlow(flow)
        imported.push(localFlow)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Import failed'
        notifications.flowImportError(flow.name, message)
      }
    }

    if (imported.length > 0) {
      notifications.flowImportSuccess('Multiple Flows', imported.length)
    }

    return imported
  }, [flows, importFlow, notifications])

  const selectFlow = useCallback((flowId: string) => {
    setSelectedFlows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(flowId)) {
        newSet.delete(flowId)
      } else {
        newSet.add(flowId)
      }
      return newSet
    })
  }, [])

  const selectAllFlows = useCallback(() => {
    setSelectedFlows(new Set(flows.map(f => f.id)))
  }, [flows])

  const clearSelection = useCallback(() => {
    setSelectedFlows(new Set())
  }, [])

  const toggleStarFlow = useCallback((flowId: string) => {
    setStarredFlows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(flowId)) {
        newSet.delete(flowId)
      } else {
        newSet.add(flowId)
      }
      return newSet
    })
  }, [setStarredFlows])

  // Cache management
  const clearCache = useCallback(() => {
    // This would need to be implemented in the API client
    notifications.cacheCleared()
  }, [notifications])

  const getCacheStats = useCallback(() => {
    // This would need to be implemented in the API client
    return { size: 0, keys: [] }
  }, [])

  // Utilities
  const exportState = useCallback(() => {
    const state = {
      config,
      starredFlows: Array.from(starredFlows),
      importedFlows,
      timestamp: new Date().toISOString(),
    }
    return JSON.stringify(state, null, 2)
  }, [config, starredFlows, importedFlows])

  const importState = useCallback((stateJson: string) => {
    try {
      const state = JSON.parse(stateJson)
      
      if (state.config) {
        setConfig(state.config)
      }
      
      if (state.starredFlows) {
        setStarredFlows(new Set(state.starredFlows))
      }
      
      if (state.importedFlows) {
        setImportedFlows(state.importedFlows)
      }
      
      notifications.success('State Imported', 'Flowise state has been imported successfully')
    } catch (err) {
      notifications.error('Import Failed', 'Failed to import state: Invalid format')
    }
  }, [setConfig, setStarredFlows, setImportedFlows, notifications])

  const reset = useCallback(() => {
    resetConfig()
    setStarredFlows(new Set())
    setImportedFlows([])
    setFlows([])
    setSelectedFlows(new Set())
    setConnectionStatus('disconnected')
    setConnectionMessage(undefined)
    setError(null)
    notifications.info('Reset Complete', 'Flowise state has been reset')
  }, [resetConfig, setStarredFlows, setImportedFlows, notifications])

  // Auto-connect on mount if configured
  useEffect(() => {
    if (isConfigured && connectionStatus === 'disconnected') {
      testConnection()
    }
  }, [isConfigured, connectionStatus, testConnection])

  return {
    // State
    config,
    isConfigured,
    connectionStatus,
    connectionMessage,
    lastConnectionTest,
    flows,
    selectedFlows,
    importedFlows,
    starredFlows,
    loading,
    error,
    lastRefresh,
    cacheSize,
    apiCallCount,
    lastApiCall,
    
    // Actions
    updateConfig,
    resetConfig,
    testConnection,
    connect,
    disconnect,
    loadFlows,
    importFlow,
    importMultipleFlows,
    selectFlow,
    selectAllFlows,
    clearSelection,
    toggleStarFlow,
    clearCache,
    getCacheStats,
    exportState,
    importState,
    reset,
  }
}

export default useFlowiseState