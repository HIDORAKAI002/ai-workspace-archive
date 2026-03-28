'use client'

import React, { useState, useEffect } from 'react'
import { 
  Plus, 
  Settings, 
  Import, 
  Upload, 
  AlertCircle, 
  CheckCircle, 
  Loader2, 
  GitBranch,
  Star,
  Download,
  RefreshCw,
  TrendingUp,
  Activity,
  Database,
  Shield,
  Zap,
  BarChart3,
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

import { FlowiseSettings } from './FlowiseSettings'
import { FlowImporter } from './FlowImporter'
import { FlowBrowser } from './FlowBrowser'
import { FlowUploader } from '@/components/forms/FlowUploader'
import { useFlowiseState } from '@/hooks/useFlowiseState'
import { useNotifications } from '@/lib/notifications'
import { FlowiseFlow } from '@/types'

interface FloWiseIntegrationProps {
  onFlowImport?: (flow: FlowiseFlow) => void
  onFlowUpload?: (flow: FlowiseFlow) => void
  onError?: (error: string) => void
  className?: string
}

export function FloWiseIntegration({
  onFlowImport,
  onFlowUpload,
  onError,
  className,
}: FloWiseIntegrationProps) {
  // Enhanced state management
  const flowiseState = useFlowiseState()
  const notifications = useNotifications()

  // Dialog states
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [importerOpen, setImporterOpen] = useState(false)
  const [browserOpen, setBrowserOpen] = useState(false)

  // Local state for quick stats
  const [quickStats, setQuickStats] = useState({
    totalFlows: 0,
    deployedFlows: 0,
    publicFlows: 0,
    starredFlows: 0,
  })

  // Update quick stats when flows change
  useEffect(() => {
    const stats = {
      totalFlows: flowiseState.flows.length,
      deployedFlows: flowiseState.flows.filter(f => f.deployed).length,
      publicFlows: flowiseState.flows.filter(f => f.isPublic).length,
      starredFlows: flowiseState.starredFlows.size,
    }
    setQuickStats(stats)
  }, [flowiseState.flows, flowiseState.starredFlows])

  // Forward errors to parent component
  useEffect(() => {
    if (flowiseState.error) {
      onError?.(flowiseState.error)
    }
  }, [flowiseState.error, onError])

  // Handle configuration changes
  const handleConfigChange = async (newConfig: any) => {
    await flowiseState.updateConfig(newConfig)
    setSettingsOpen(false)
  }

  // Handle flow import from Flowise
  const handleFlowImport = async (flow: any) => {
    const localFlow = await flowiseState.importFlow(flow)
    onFlowImport?.(localFlow as FlowiseFlow)
    setImporterOpen(false)
    setBrowserOpen(false)
  }

  // Handle flow upload (traditional file upload)
  const handleFlowUpload = (flow: FlowiseFlow) => {
    onFlowUpload?.(flow)
  }

  // Handle bulk import
  const handleBulkImport = async () => {
    if (flowiseState.selectedFlows.size === 0) return
    
    const flowIds = Array.from(flowiseState.selectedFlows)
    await flowiseState.importMultipleFlows(flowIds)
    flowiseState.clearSelection()
  }

  // Get status icon and color based on new state
  const getStatusInfo = () => {
    switch (flowiseState.connectionStatus) {
      case 'connected':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          variant: 'default' as const,
          text: 'Connected',
        }
      case 'connecting':
        return {
          icon: Loader2,
          color: 'text-blue-600',
          variant: 'secondary' as const,
          text: 'Connecting...',
          animate: true,
        }
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          variant: 'destructive' as const,
          text: 'Error',
        }
      default:
        return {
          icon: AlertCircle,
          color: 'text-gray-600',
          variant: 'outline' as const,
          text: 'Disconnected',
        }
    }
  }

  const statusInfo = getStatusInfo()
  const StatusIcon = statusInfo.icon

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Flowise Integration Hub
              </CardTitle>
              <CardDescription>
                Advanced integration with your Flowise instance - import, manage, and deploy flows
              </CardDescription>
            </div>
            
            {/* Status and quick actions */}
            <div className="flex items-center gap-2">
              <Badge variant={statusInfo.variant} className="flex items-center gap-1">
                <StatusIcon 
                  className={`h-3 w-3 ${statusInfo.color} ${statusInfo.animate ? 'animate-spin' : ''}`} 
                />
                {statusInfo.text}
              </Badge>
              
              {flowiseState.selectedFlows.size > 0 && (
                <Button size="sm" onClick={handleBulkImport}>
                  <Download className="mr-2 h-4 w-4" />
                  Import Selected ({flowiseState.selectedFlows.size})
                </Button>
              )}
              
              <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh]">
                  <DialogHeader>
                    <DialogTitle>Flowise Configuration</DialogTitle>
                    <DialogDescription>
                      Configure your Flowise connection and advanced settings
                    </DialogDescription>
                  </DialogHeader>
                  <FlowiseSettings onConfigChange={handleConfigChange} />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Status message and performance indicators */}
          <div className="space-y-4 mb-6">
            {flowiseState.connectionMessage && (
              <Alert
                variant={flowiseState.connectionStatus === 'connected' ? 'default' : 'destructive'}
              >
                <StatusIcon className="h-4 w-4" />
                <AlertDescription>
                  {flowiseState.connectionMessage}
                  {flowiseState.lastConnectionTest && (
                    <span className="text-xs text-muted-foreground ml-2">
                      (Last tested: {flowiseState.lastConnectionTest.toLocaleTimeString()})
                    </span>
                  )}
                </AlertDescription>
              </Alert>
            )}

            {/* Performance metrics bar */}
            {flowiseState.connectionStatus === 'connected' && (
              <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">API Calls: {flowiseState.apiCallCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Cache: {flowiseState.cacheSize} items</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm font-medium">Starred: {quickStats.starredFlows}</span>
                </div>
                {flowiseState.lastRefresh && (
                  <div className="flex items-center gap-2 ml-auto">
                    <RefreshCw className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      Last sync: {flowiseState.lastRefresh.toLocaleTimeString()}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>

          <Tabs defaultValue="dashboard" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="dashboard" className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Dashboard
              </TabsTrigger>
              <TabsTrigger value="browser" className="flex items-center gap-2">
                <GitBranch className="h-4 w-4" />
                Flow Browser
              </TabsTrigger>
              <TabsTrigger value="import" className="flex items-center gap-2">
                <Import className="h-4 w-4" />
                Quick Import
              </TabsTrigger>
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                File Upload
              </TabsTrigger>
            </TabsList>

            {/* Dashboard Tab */}
            <TabsContent value="dashboard" className="space-y-6">
              {flowiseState.connectionStatus === 'connected' ? (
                <div className="space-y-6">
                  {/* Quick stats grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <GitBranch className="h-5 w-5 text-blue-600" />
                        <div>
                          <div className="text-2xl font-bold">{quickStats.totalFlows}</div>
                          <div className="text-sm text-muted-foreground">Total Flows</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-green-600" />
                        <div>
                          <div className="text-2xl font-bold">{quickStats.deployedFlows}</div>
                          <div className="text-sm text-muted-foreground">Deployed</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-purple-600" />
                        <div>
                          <div className="text-2xl font-bold">{quickStats.publicFlows}</div>
                          <div className="text-sm text-muted-foreground">Public</div>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 text-yellow-600" />
                        <div>
                          <div className="text-2xl font-bold">{quickStats.starredFlows}</div>
                          <div className="text-sm text-muted-foreground">Starred</div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Recent activity */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {flowiseState.importedFlows.slice(0, 5).map((flow) => (
                          <div key={flow.id} className="flex items-center gap-3 p-2 border rounded-lg">
                            <GitBranch className="h-4 w-4 text-muted-foreground" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">{flow.name}</p>
                              <p className="text-xs text-muted-foreground">
                                Imported {new Date(flow.metadata?.importedAt || flow.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {flow.nodes.length} nodes
                            </Badge>
                          </div>
                        ))}
                        {flowiseState.importedFlows.length === 0 && (
                          <div className="text-center py-4 text-muted-foreground">
                            No imported flows yet
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <Button 
                      className="h-auto p-4 flex-col gap-2" 
                      variant="outline"
                      onClick={() => setBrowserOpen(true)}
                    >
                      <GitBranch className="h-6 w-6" />
                      <span>Browse All Flows</span>
                    </Button>
                    <Button 
                      className="h-auto p-4 flex-col gap-2" 
                      variant="outline"
                      onClick={flowiseState.loadFlows}
                      disabled={flowiseState.loading}
                    >
                      {flowiseState.loading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <RefreshCw className="h-6 w-6" />
                      )}
                      <span>Refresh Flows</span>
                    </Button>
                    <Button 
                      className="h-auto p-4 flex-col gap-2" 
                      variant="outline"
                      onClick={() => window.open(flowiseState.config.url, '_blank')}
                    >
                      <TrendingUp className="h-6 w-6" />
                      <span>Open Flowise</span>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <AlertCircle className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">Connect to Flowise</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Configure your Flowise connection to access the full integration dashboard
                  </p>
                  <div className="flex gap-2 justify-center">
                    <Button onClick={() => setSettingsOpen(true)}>
                      <Settings className="mr-2 h-4 w-4" />
                      Configure Connection
                    </Button>
                    <Button variant="outline" onClick={flowiseState.testConnection}>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Test Connection
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Flow Browser Tab */}
            <TabsContent value="browser" className="space-y-4">
              {flowiseState.connectionStatus === 'connected' ? (
                <FlowBrowser
                  client={new (require('@/lib/flowise-api-client').FlowiseApiClient)(flowiseState.config)}
                  onImport={handleFlowImport}
                  onError={onError}
                />
              ) : (
                <div className="text-center py-8">
                  <GitBranch className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Connection Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect to Flowise to browse available flows
                  </p>
                  <Button onClick={() => setSettingsOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Connection
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Quick Import Tab */}
            <TabsContent value="import" className="space-y-4">
              {flowiseState.connectionStatus === 'connected' ? (
                <Dialog open={importerOpen} onOpenChange={setImporterOpen}>
                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="font-medium mb-2">Quick Flow Import</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Select and import flows directly from your Flowise instance
                      </p>
                      <DialogTrigger asChild>
                        <Button size="lg">
                          <Plus className="mr-2 h-5 w-5" />
                          Browse & Import Flows
                        </Button>
                      </DialogTrigger>
                    </div>
                  </div>
                  <DialogContent className="max-w-6xl max-h-[90vh]">
                    <DialogHeader>
                      <DialogTitle>Import Flows from Flowise</DialogTitle>
                      <DialogDescription>
                        Select flows to import from your Flowise instance
                      </DialogDescription>
                    </DialogHeader>
                    <FlowImporter
                      client={new (require('@/lib/flowise-api-client').FlowiseApiClient)(flowiseState.config)}
                      onImport={handleFlowImport}
                      onError={onError}
                    />
                  </DialogContent>
                </Dialog>
              ) : (
                <div className="text-center py-8">
                  <Import className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="font-medium mb-2">Connection Required</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect to Flowise to import flows
                  </p>
                  <Button onClick={() => setSettingsOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configure Connection
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* File Upload Tab */}
            <TabsContent value="upload" className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Upload Flow File</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Upload a JSON file exported from Flowise or other compatible sources
                </p>
                
                <FlowUploader
                  onUpload={handleFlowUpload}
                  onError={onError}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default FloWiseIntegration