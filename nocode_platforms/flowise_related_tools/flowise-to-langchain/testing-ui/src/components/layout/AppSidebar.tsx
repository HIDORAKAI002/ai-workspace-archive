'use client'

import { useState } from 'react'
import {
  BarChart3,
  GitBranch,
  Code,
  TestTube,
  FileCheck,
  Settings,
  ChevronDown,
  ChevronRight,
  Activity,
  Zap,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { NavigationItem } from '@/types'

interface AppSidebarProps {
  isOpen: boolean
  currentPage: string
  navigationItems: NavigationItem[]
  onPageChange: (page: string) => void
}

// Icon mapping
const iconMap = {
  BarChart3,
  GitBranch,
  Code,
  TestTube,
  FileCheck,
  Settings,
  Activity,
  Zap,
}

export function AppSidebar({
  isOpen,
  currentPage,
  navigationItems,
  onPageChange,
}: AppSidebarProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>(['main'])

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    )
  }

  const quickStats = {
    activeTests: 2,
    totalFlows: 8,
    recentResults: 15,
    systemLoad: 45,
  }

  const recentActivity = [
    { id: '1', action: 'Flow uploaded', time: '2m ago', status: 'success' },
    { id: '2', action: 'Test completed', time: '5m ago', status: 'success' },
    { id: '3', action: 'Conversion failed', time: '8m ago', status: 'error' },
  ]

  if (!isOpen) {
    return (
      <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-16 border-r border-border bg-background">
        <div className="flex flex-col items-center space-y-2 py-4">
          {navigationItems.map((item) => {
            const Icon = iconMap[item.icon as keyof typeof iconMap]
            return (
              <Button
                key={item.id}
                variant={currentPage === item.id ? 'default' : 'ghost'}
                size="icon"
                onClick={() => onPageChange(item.id)}
                className="h-10 w-10"
                title={item.label}
              >
                <Icon className="h-5 w-5" />
              </Button>
            )
          })}
        </div>
      </aside>
    )
  }

  return (
    <aside className="fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background">
      <ScrollArea className="h-full px-3 py-4">
        <div className="space-y-6">
          {/* Navigation */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Navigation
              </h2>
            </div>
            <nav className="space-y-1">
              {navigationItems.map((item) => {
                const Icon = iconMap[item.icon as keyof typeof iconMap]
                return (
                  <Button
                    key={item.id}
                    variant={currentPage === item.id ? 'default' : 'ghost'}
                    onClick={() => onPageChange(item.id)}
                    className="w-full justify-start"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {item.label}
                  </Button>
                )
              })}
            </nav>
          </div>

          <Separator />

          {/* Quick Stats */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Quick Stats
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm">Active Tests</span>
                </div>
                <Badge variant="secondary">{quickStats.activeTests}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                <div className="flex items-center gap-2">
                  <GitBranch className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Total Flows</span>
                </div>
                <Badge variant="secondary">{quickStats.totalFlows}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                <div className="flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-purple-500" />
                  <span className="text-sm">Results</span>
                </div>
                <Badge variant="secondary">{quickStats.recentResults}</Badge>
              </div>
              <div className="flex items-center justify-between rounded-md bg-muted/50 p-2">
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orange-500" />
                  <span className="text-sm">System Load</span>
                </div>
                <Badge variant="secondary">{quickStats.systemLoad}%</Badge>
              </div>
            </div>
          </div>

          <Separator />

          {/* Recent Activity */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Recent Activity
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => toggleSection('activity')}
                className="h-6 w-6 p-0"
              >
                {expandedSections.includes('activity') ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </Button>
            </div>
            {expandedSections.includes('activity') && (
              <div className="space-y-2">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="rounded-md bg-muted/30 p-2">
                    <div className="mb-1 flex items-center justify-between">
                      <span className="text-xs font-medium">
                        {activity.action}
                      </span>
                      <div
                        className={cn(
                          'h-2 w-2 rounded-full',
                          activity.status === 'success'
                            ? 'bg-green-500'
                            : 'bg-red-500'
                        )}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
