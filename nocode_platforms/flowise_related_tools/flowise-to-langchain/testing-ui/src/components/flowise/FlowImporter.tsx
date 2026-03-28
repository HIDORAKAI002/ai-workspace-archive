'use client'

import React, { useState, useEffect, useMemo } from 'react'
import {
  Search,
  Filter,
  Download,
  Eye,
  Calendar,
  GitBranch,
  Loader2,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Clock,
  Tag,
  User,
  FileText,
  Import,
  X,
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
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  FlowiseApiClient,
  FlowiseFlow,
  FlowiseResponse,
  FlowiseListResponse,
} from '@/lib/flowise-api-client'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FlowiseFlow as LocalFlowiseFlow } from '@/types'

interface ImportProgress {
  status: 'idle' | 'importing' | 'success' | 'error'
  progress: number
  message: string
  details?: any
}

interface FlowImporterProps {
  client: FlowiseApiClient
  onImport?: (flow: LocalFlowiseFlow) => void
  onError?: (error: string) => void
  className?: string
}

interface FlowFilters {
  search: string
  category: string
  deployed: string
  isPublic: string
  sortBy: 'name' | 'createdDate' | 'updatedDate'
  sortOrder: 'asc' | 'desc'
}

export function FlowImporter({
  client,
  onImport,
  onError,
  className,
}: FlowImporterProps) {
  // State
  const [flows, setFlows] = useState<FlowiseFlow[]>([])
  const [filteredFlows, setFilteredFlows] = useState<FlowiseFlow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFlows, setSelectedFlows] = useState<Set<string>>(new Set())
  const [previewFlow, setPreviewFlow] = useState<FlowiseFlow | null>(null)
  const [importProgress, setImportProgress] = useState<ImportProgress>({
    status: 'idle',
    progress: 0,
    message: '',
  })

  // Filters
  const [filters, setFilters] = useLocalStorage<FlowFilters>(
    'flowise-import-filters',
    {
      search: '',
      category: '',
      deployed: '',
      isPublic: '',
      sortBy: 'updatedDate',
      sortOrder: 'desc',
    }
  )

  // Load flows on mount
  useEffect(() => {
    loadFlows()
  }, [])

  // Filter flows when filters or flows change
  useEffect(() => {
    filterFlows()
  }, [flows, filters])

  // Load flows from Flowise
  const loadFlows = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await client.getFlows()
      
      if (response.success && response.data) {
        setFlows(response.data.flows)
      } else {
        throw new Error(response.error || 'Failed to load flows')
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load flows'
      setError(message)
      onError?.(message)
    } finally {
      setLoading(false)
    }
  }

  // Filter and sort flows
  const filterFlows = () => {
    let filtered = [...flows]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (flow) =>
          flow.name.toLowerCase().includes(searchLower) ||
          flow.description?.toLowerCase().includes(searchLower) ||
          flow.id.toLowerCase().includes(searchLower)
      )
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter((flow) => flow.category === filters.category)
    }

    // Deployed filter
    if (filters.deployed) {
      const isDeployed = filters.deployed === 'true'
      filtered = filtered.filter((flow) => flow.deployed === isDeployed)
    }

    // Public filter
    if (filters.isPublic) {
      const isPublic = filters.isPublic === 'true'
      filtered = filtered.filter((flow) => flow.isPublic === isPublic)
    }

    // Sort
    filtered.sort((a, b) => {
      let comparison = 0
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name)
          break
        case 'createdDate':
          comparison = new Date(a.createdDate).getTime() - new Date(b.createdDate).getTime()
          break
        case 'updatedDate':
          comparison = new Date(a.updatedDate).getTime() - new Date(b.updatedDate).getTime()
          break
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    setFilteredFlows(filtered)
  }

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(flows.filter(f => f.category).map(f => f.category!))
    return Array.from(cats).sort()
  }, [flows])

  // Update filters
  const updateFilter = <K extends keyof FlowFilters>(
    key: K,
    value: FlowFilters[K]
  ) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({
      search: '',
      category: '',
      deployed: '',
      isPublic: '',
      sortBy: 'updatedDate',
      sortOrder: 'desc',
    })
  }

  // Toggle flow selection
  const toggleFlowSelection = (flowId: string) => {
    const newSelection = new Set(selectedFlows)
    if (newSelection.has(flowId)) {
      newSelection.delete(flowId)
    } else {
      newSelection.add(flowId)
    }
    setSelectedFlows(newSelection)
  }

  // Select all filtered flows
  const selectAllFlows = () => {
    if (selectedFlows.size === filteredFlows.length) {
      setSelectedFlows(new Set())
    } else {
      setSelectedFlows(new Set(filteredFlows.map(f => f.id)))
    }
  }

  // Import selected flows
  const importSelectedFlows = async () => {
    if (selectedFlows.size === 0) return

    setImportProgress({
      status: 'importing',
      progress: 0,
      message: 'Starting import...',
    })

    const flowsToImport = flows.filter(f => selectedFlows.has(f.id))
    let imported = 0
    let errors: string[] = []

    for (const flow of flowsToImport) {
      try {
        setImportProgress({
          status: 'importing',
          progress: (imported / flowsToImport.length) * 100,
          message: `Importing ${flow.name}...`,
        })

        // Convert Flowise flow to local format
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
          },
          createdAt: new Date(flow.createdDate),
          updatedAt: new Date(flow.updatedDate),
        }

        // Call import callback
        onImport?.(localFlow)
        imported++

        // Small delay to show progress
        await new Promise(resolve => setTimeout(resolve, 200))
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Import failed'
        errors.push(`${flow.name}: ${message}`)
      }
    }

    // Update progress based on results
    if (errors.length === 0) {
      setImportProgress({
        status: 'success',
        progress: 100,
        message: `Successfully imported ${imported} flow${imported !== 1 ? 's' : ''}`,
      })
    } else {
      setImportProgress({
        status: 'error',
        progress: 100,
        message: `Imported ${imported} flows with ${errors.length} errors`,
        details: errors,
      })
    }

    // Clear selection
    setSelectedFlows(new Set())

    // Reset progress after delay
    setTimeout(() => {
      setImportProgress({
        status: 'idle',
        progress: 0,
        message: '',
      })
    }, 3000)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Import className="h-5 w-5" />
            Import Flows from Flowise
          </CardTitle>
          <CardDescription>
            Browse and import flows from your Flowise instance
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="space-y-4">
            <div className="flex flex-wrap gap-4">
              {/* Search */}
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search flows..."
                    value={filters.search}
                    onChange={(e) => updateFilter('search', e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category */}
              <Select
                value={filters.category}
                onValueChange={(value) => updateFilter('category', value)}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="All categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Deployed */}
              <Select
                value={filters.deployed}
                onValueChange={(value) => updateFilter('deployed', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="true">Deployed</SelectItem>
                  <SelectItem value="false">Not deployed</SelectItem>
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select
                value={filters.sortBy}
                onValueChange={(value) => updateFilter('sortBy', value as any)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name</SelectItem>
                  <SelectItem value="createdDate">Created</SelectItem>
                  <SelectItem value="updatedDate">Updated</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {filters.sortOrder === 'asc' ? '↑' : '↓'}
              </Button>

              <Button variant="outline" onClick={clearFilters}>
                Clear
              </Button>

              <Button variant="outline" onClick={loadFlows} disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh
              </Button>
            </div>

            {/* Selection controls */}
            {filteredFlows.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    checked={selectedFlows.size === filteredFlows.length}
                    onCheckedChange={selectAllFlows}
                  />
                  <Label>
                    Select all ({selectedFlows.size}/{filteredFlows.length})
                  </Label>
                </div>

                {selectedFlows.size > 0 && (
                  <Button onClick={importSelectedFlows}>
                    <Download className="mr-2 h-4 w-4" />
                    Import Selected ({selectedFlows.size})
                  </Button>
                )}
              </div>
            )}

            {/* Import progress */}
            {importProgress.status !== 'idle' && (
              <Alert
                variant={
                  importProgress.status === 'success'
                    ? 'default'
                    : importProgress.status === 'error'
                    ? 'destructive'
                    : 'default'
                }
              >
                {importProgress.status === 'importing' && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                {importProgress.status === 'success' && (
                  <CheckCircle className="h-4 w-4" />
                )}
                {importProgress.status === 'error' && (
                  <AlertCircle className="h-4 w-4" />
                )}
                <AlertDescription>
                  <div>
                    {importProgress.message}
                    {importProgress.status === 'importing' && (
                      <Progress value={importProgress.progress} className="mt-2" />
                    )}
                    {importProgress.details && (
                      <details className="mt-2">
                        <summary>Error details</summary>
                        <ul className="mt-1 list-disc list-inside">
                          {importProgress.details.map((error: string, index: number) => (
                            <li key={index} className="text-xs">{error}</li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </div>
                </AlertDescription>
              </Alert>
            )}

            {/* Error display */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Flow list */}
          <div className="mt-6">
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2">Loading flows...</span>
              </div>
            ) : filteredFlows.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {flows.length === 0 ? 'No flows found' : 'No flows match your filters'}
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredFlows.map((flow) => (
                  <Card key={flow.id} className="transition-colors hover:bg-muted/50">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-4">
                        {/* Selection checkbox */}
                        <Checkbox
                          checked={selectedFlows.has(flow.id)}
                          onCheckedChange={() => toggleFlowSelection(flow.id)}
                        />

                        {/* Flow info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium truncate">{flow.name}</h3>
                              {flow.description && (
                                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                  {flow.description}
                                </p>
                              )}
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2 ml-4">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => setPreviewFlow(flow)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-4xl max-h-[80vh]">
                                  <DialogHeader>
                                    <DialogTitle>{flow.name}</DialogTitle>
                                    <DialogDescription>
                                      Flow preview and metadata
                                    </DialogDescription>
                                  </DialogHeader>
                                  {previewFlow && (
                                    <FlowPreview flow={previewFlow} />
                                  )}
                                </DialogContent>
                              </Dialog>

                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedFlows(new Set([flow.id]))
                                  importSelectedFlows()
                                }}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          {/* Metadata */}
                          <div className="flex flex-wrap items-center gap-2 mt-3">
                            {flow.deployed && (
                              <Badge variant="default">
                                <GitBranch className="w-3 h-3 mr-1" />
                                Deployed
                              </Badge>
                            )}
                            {flow.isPublic && (
                              <Badge variant="secondary">Public</Badge>
                            )}
                            {flow.category && (
                              <Badge variant="outline">
                                <Tag className="w-3 h-3 mr-1" />
                                {flow.category}
                              </Badge>
                            )}
                            <Badge variant="outline">
                              <Clock className="w-3 h-3 mr-1" />
                              {formatDate(flow.updatedDate)}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Flow preview component
function FlowPreview({ flow }: { flow: FlowiseFlow }) {
  const nodeCount = flow.flowData?.nodes?.length || 0
  const edgeCount = flow.flowData?.edges?.length || 0

  return (
    <Tabs defaultValue="metadata" className="w-full">
      <TabsList>
        <TabsTrigger value="metadata">Metadata</TabsTrigger>
        <TabsTrigger value="structure">Structure</TabsTrigger>
        <TabsTrigger value="raw">Raw Data</TabsTrigger>
      </TabsList>

      <TabsContent value="metadata" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Name</Label>
            <p className="text-sm">{flow.name}</p>
          </div>
          <div>
            <Label>ID</Label>
            <p className="text-sm font-mono">{flow.id}</p>
          </div>
          <div>
            <Label>Description</Label>
            <p className="text-sm">{flow.description || 'No description'}</p>
          </div>
          <div>
            <Label>Category</Label>
            <p className="text-sm">{flow.category || 'Uncategorized'}</p>
          </div>
          <div>
            <Label>Created</Label>
            <p className="text-sm">{new Date(flow.createdDate).toLocaleString()}</p>
          </div>
          <div>
            <Label>Updated</Label>
            <p className="text-sm">{new Date(flow.updatedDate).toLocaleString()}</p>
          </div>
          <div>
            <Label>Status</Label>
            <div className="flex gap-2">
              {flow.deployed && <Badge>Deployed</Badge>}
              {flow.isPublic && <Badge variant="secondary">Public</Badge>}
            </div>
          </div>
          <div>
            <Label>Structure</Label>
            <p className="text-sm">{nodeCount} nodes, {edgeCount} edges</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="structure" className="space-y-4">
        <div className="space-y-4">
          <div>
            <Label>Nodes ({nodeCount})</Label>
            <ScrollArea className="h-32 w-full border rounded-md p-4">
              {flow.flowData?.nodes?.map((node: any, index: number) => (
                <div key={index} className="text-sm py-1">
                  <span className="font-mono">{node.id}</span> - {node.data?.label || node.type}
                </div>
              )) || <p className="text-muted-foreground">No nodes</p>}
            </ScrollArea>
          </div>
          
          <div>
            <Label>Edges ({edgeCount})</Label>
            <ScrollArea className="h-32 w-full border rounded-md p-4">
              {flow.flowData?.edges?.map((edge: any, index: number) => (
                <div key={index} className="text-sm py-1">
                  <span className="font-mono">{edge.source}</span> → <span className="font-mono">{edge.target}</span>
                </div>
              )) || <p className="text-muted-foreground">No edges</p>}
            </ScrollArea>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="raw" className="space-y-4">
        <ScrollArea className="h-96 w-full">
          <pre className="text-xs bg-muted p-4 rounded-md overflow-auto">
            {JSON.stringify(flow, null, 2)}
          </pre>
        </ScrollArea>
      </TabsContent>
    </Tabs>
  )
}

export default FlowImporter