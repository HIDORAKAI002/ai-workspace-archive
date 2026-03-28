'use client'

import React, { useState, useEffect, useMemo, useCallback } from 'react'
import {
  Search,
  Filter,
  Grid,
  List,
  SortAsc,
  SortDesc,
  Star,
  Clock,
  Eye,
  Download,
  ExternalLink,
  MoreHorizontal,
  Bookmark,
  Heart,
  Share,
  Copy,
  Trash2,
  GitBranch,
  Tag,
  Calendar,
  User,
  FileText,
  Loader2,
  RefreshCw,
  ChevronDown,
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Checkbox } from '@/components/ui/checkbox'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  FlowiseApiClient,
  FlowiseFlow,
  FlowiseListResponse,
} from '@/lib/flowise-api-client'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { FlowiseFlow as LocalFlowiseFlow } from '@/types'

interface FlowBrowserProps {
  client: FlowiseApiClient
  onImport?: (flow: LocalFlowiseFlow) => void
  onFlowSelect?: (flow: FlowiseFlow) => void
  onError?: (error: string) => void
  className?: string
}

interface FlowFilters {
  search: string
  category: string
  deployed: string
  isPublic: string
  starred: boolean
  sortBy: 'name' | 'createdDate' | 'updatedDate' | 'popularity'
  sortOrder: 'asc' | 'desc'
  tags: string[]
}

interface ViewOptions {
  layout: 'grid' | 'list'
  pageSize: number
  showPreview: boolean
  compactView: boolean
}

export function FlowBrowser({
  client,
  onImport,
  onFlowSelect,
  onError,
  className,
}: FlowBrowserProps) {
  // State
  const [flows, setFlows] = useState<FlowiseFlow[]>([])
  const [filteredFlows, setFilteredFlows] = useState<FlowiseFlow[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedFlows, setSelectedFlows] = useState<Set<string>>(new Set())
  const [starredFlows, setStarredFlows] = useLocalStorage<Set<string>>('starred-flows', new Set())

  // Filters and view options
  const [filters, setFilters] = useLocalStorage<FlowFilters>('flow-browser-filters', {
    search: '',
    category: '',
    deployed: '',
    isPublic: '',
    starred: false,
    sortBy: 'updatedDate',
    sortOrder: 'desc',
    tags: [],
  })

  const [viewOptions, setViewOptions] = useLocalStorage<ViewOptions>('flow-browser-view', {
    layout: 'grid',
    pageSize: 12,
    showPreview: true,
    compactView: false,
  })

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(filteredFlows.length / viewOptions.pageSize)
  const paginatedFlows = useMemo(() => {
    const start = (currentPage - 1) * viewOptions.pageSize
    const end = start + viewOptions.pageSize
    return filteredFlows.slice(start, end)
  }, [filteredFlows, currentPage, viewOptions.pageSize])

  // Load flows on mount
  useEffect(() => {
    loadFlows()
  }, [])

  // Filter flows when filters or flows change
  useEffect(() => {
    filterFlows()
  }, [flows, filters, starredFlows])

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [filters])

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
  const filterFlows = useCallback(() => {
    let filtered = [...flows]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (flow) =>
          flow.name.toLowerCase().includes(searchLower) ||
          flow.description?.toLowerCase().includes(searchLower) ||
          flow.id.toLowerCase().includes(searchLower) ||
          flow.category?.toLowerCase().includes(searchLower)
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

    // Starred filter
    if (filters.starred) {
      filtered = filtered.filter((flow) => starredFlows.has(flow.id))
    }

    // Tags filter
    if (filters.tags.length > 0) {
      filtered = filtered.filter((flow) => 
        filters.tags.some(tag => 
          flow.category?.toLowerCase().includes(tag.toLowerCase()) ||
          flow.name.toLowerCase().includes(tag.toLowerCase())
        )
      )
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
        case 'popularity':
          // Mock popularity based on deployment status and public visibility
          const aScore = (a.deployed ? 2 : 0) + (a.isPublic ? 1 : 0)
          const bScore = (b.deployed ? 2 : 0) + (b.isPublic ? 1 : 0)
          comparison = aScore - bScore
          break
      }

      return filters.sortOrder === 'desc' ? -comparison : comparison
    })

    setFilteredFlows(filtered)
  }, [flows, filters, starredFlows])

  // Get unique categories and tags
  const { categories, tags } = useMemo(() => {
    const cats = new Set(flows.filter(f => f.category).map(f => f.category!))
    const allTags = new Set<string>()
    
    flows.forEach(flow => {
      if (flow.category) allTags.add(flow.category)
      // Add more tag extraction logic here if needed
    })
    
    return {
      categories: Array.from(cats).sort(),
      tags: Array.from(allTags).sort()
    }
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
      starred: false,
      sortBy: 'updatedDate',
      sortOrder: 'desc',
      tags: [],
    })
  }

  // Toggle flow star
  const toggleFlowStar = (flowId: string) => {
    setStarredFlows(prev => {
      const newSet = new Set(prev)
      if (newSet.has(flowId)) {
        newSet.delete(flowId)
      } else {
        newSet.add(flowId)
      }
      return newSet
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

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  // Get node count from flow data
  const getNodeCount = (flow: FlowiseFlow) => {
    return flow.flowData?.nodes?.length || 0
  }

  // Get complexity indicator
  const getComplexityLevel = (nodeCount: number) => {
    if (nodeCount <= 3) return { level: 'Simple', color: 'bg-green-100 text-green-800' }
    if (nodeCount <= 7) return { level: 'Medium', color: 'bg-yellow-100 text-yellow-800' }
    return { level: 'Complex', color: 'bg-red-100 text-red-800' }
  }

  return (
    <div className={className}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <GitBranch className="h-5 w-5" />
                Flow Browser
              </CardTitle>
              <CardDescription>
                Browse, search, and manage your Flowise flows
              </CardDescription>
            </div>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={loadFlows} disabled={loading}>
                {loading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Refresh
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="mr-2 h-4 w-4" />
                    View
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Layout</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setViewOptions(prev => ({ ...prev, layout: 'grid' }))}>
                    <Grid className="mr-2 h-4 w-4" />
                    Grid View
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewOptions(prev => ({ ...prev, layout: 'list' }))}>
                    <List className="mr-2 h-4 w-4" />
                    List View
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuLabel>Options</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => setViewOptions(prev => ({ ...prev, showPreview: !prev.showPreview }))}>
                    <Eye className="mr-2 h-4 w-4" />
                    {viewOptions.showPreview ? 'Hide' : 'Show'} Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setViewOptions(prev => ({ ...prev, compactView: !prev.compactView }))}>
                    <MoreHorizontal className="mr-2 h-4 w-4" />
                    {viewOptions.compactView ? 'Normal' : 'Compact'} View
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Filters */}
          <div className="space-y-4 mb-6">
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
                  <SelectItem value="popularity">Popularity</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                onClick={() => updateFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc')}
              >
                {filters.sortOrder === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />}
              </Button>
            </div>

            {/* Additional filters */}
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  checked={filters.starred}
                  onCheckedChange={(checked) => updateFilter('starred', !!checked)}
                />
                <Label>Starred only</Label>
              </div>

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

              <Select
                value={filters.isPublic}
                onValueChange={(value) => updateFilter('isPublic', value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All</SelectItem>
                  <SelectItem value="true">Public</SelectItem>
                  <SelectItem value="false">Private</SelectItem>
                </SelectContent>
              </Select>

              {(filters.search || filters.category || filters.deployed || filters.isPublic || filters.starred) && (
                <Button variant="outline" size="sm" onClick={clearFilters}>
                  <X className="mr-2 h-4 w-4" />
                  Clear filters
                </Button>
              )}
            </div>

            {/* Results summary */}
            <div className="text-sm text-muted-foreground">
              Showing {paginatedFlows.length} of {filteredFlows.length} flows
              {selectedFlows.size > 0 && ` (${selectedFlows.size} selected)`}
            </div>
          </div>

          {/* Error display */}
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Flow grid/list */}
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading flows...</span>
            </div>
          ) : filteredFlows.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              {flows.length === 0 ? 'No flows found' : 'No flows match your filters'}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Flow items */}
              <div className={
                viewOptions.layout === 'grid' 
                  ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                  : 'space-y-3'
              }>
                {paginatedFlows.map((flow) => (
                  <FlowCard
                    key={flow.id}
                    flow={flow}
                    layout={viewOptions.layout}
                    compact={viewOptions.compactView}
                    showPreview={viewOptions.showPreview}
                    isSelected={selectedFlows.has(flow.id)}
                    isStarred={starredFlows.has(flow.id)}
                    onSelect={() => toggleFlowSelection(flow.id)}
                    onStar={() => toggleFlowStar(flow.id)}
                    onImport={() => onImport?.(convertToLocalFlow(flow))}
                    onView={() => onFlowSelect?.(flow)}
                    nodeCount={getNodeCount(flow)}
                    complexity={getComplexityLevel(getNodeCount(flow))}
                    formatDate={formatDate}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  >
                    Previous
                  </Button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      const page = i + 1
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </Button>
                      )
                    })}
                  </div>
                  
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Flow card component
interface FlowCardProps {
  flow: FlowiseFlow
  layout: 'grid' | 'list'
  compact: boolean
  showPreview: boolean
  isSelected: boolean
  isStarred: boolean
  onSelect: () => void
  onStar: () => void
  onImport: () => void
  onView: () => void
  nodeCount: number
  complexity: { level: string; color: string }
  formatDate: (date: string) => string
}

function FlowCard({
  flow,
  layout,
  compact,
  showPreview,
  isSelected,
  isStarred,
  onSelect,
  onStar,
  onImport,
  onView,
  nodeCount,
  complexity,
  formatDate,
}: FlowCardProps) {
  return (
    <Card className={`transition-colors hover:bg-muted/50 ${isSelected ? 'ring-2 ring-primary' : ''}`}>
      <CardContent className={compact ? 'p-3' : 'p-4'}>
        <div className={layout === 'list' ? 'flex items-start gap-4' : 'space-y-3'}>
          {/* Selection checkbox */}
          <div className="flex items-start gap-3">
            <Checkbox checked={isSelected} onCheckedChange={onSelect} />
            
            <div className="flex-1 min-w-0">
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium truncate flex items-center gap-2">
                    {flow.name}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onStar}
                      className={`p-1 h-auto ${isStarred ? 'text-yellow-500' : 'text-muted-foreground'}`}
                    >
                      <Star className={`h-3 w-3 ${isStarred ? 'fill-current' : ''}`} />
                    </Button>
                  </h3>
                  
                  {!compact && flow.description && (
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {flow.description}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" onClick={onView}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={onImport}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={onView}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={onImport}>
                        <Download className="mr-2 h-4 w-4" />
                        Import Flow
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigator.clipboard.writeText(flow.id)}>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy ID
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-2 mt-2">
                {flow.deployed && (
                  <Badge variant="default" className="text-xs">
                    <GitBranch className="w-3 h-3 mr-1" />
                    Deployed
                  </Badge>
                )}
                {flow.isPublic && (
                  <Badge variant="secondary" className="text-xs">Public</Badge>
                )}
                {flow.category && (
                  <Badge variant="outline" className="text-xs">
                    <Tag className="w-3 h-3 mr-1" />
                    {flow.category}
                  </Badge>
                )}
                <Badge variant="outline" className={`text-xs ${complexity.color}`}>
                  {complexity.level}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <FileText className="w-3 h-3 mr-1" />
                  {nodeCount} nodes
                </Badge>
                <Badge variant="outline" className="text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {formatDate(flow.updatedDate)}
                </Badge>
              </div>

              {/* Preview section */}
              {showPreview && !compact && (
                <div className="mt-3 p-3 bg-muted/50 rounded-md">
                  <div className="text-xs text-muted-foreground">
                    <div className="flex justify-between">
                      <span>Created: {formatDate(flow.createdDate)}</span>
                      <span>ID: {flow.id.slice(0, 8)}...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Helper function to convert Flowise flow to local format
function convertToLocalFlow(flow: FlowiseFlow): LocalFlowiseFlow {
  return {
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
}

export default FlowBrowser