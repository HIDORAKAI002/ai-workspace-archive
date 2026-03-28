'use client'

import React from 'react'
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  Wifi,
  WifiOff,
  Activity,
  Zap,
  Shield,
  Clock,
  TrendingUp,
  TrendingDown,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { Card, CardContent } from '@/components/ui/card'

interface FlowiseStatusIndicatorProps {
  status: 'disconnected' | 'connecting' | 'connected' | 'error'
  message?: string
  lastTested?: Date
  latency?: number
  capabilities?: string[]
  showDetails?: boolean
  className?: string
}

export function FlowiseStatusIndicator({
  status,
  message,
  lastTested,
  latency,
  capabilities = [],
  showDetails = false,
  className,
}: FlowiseStatusIndicatorProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'connected':
        return {
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          variant: 'default' as const,
          text: 'Connected',
          description: 'Successfully connected to Flowise',
        }
      case 'connecting':
        return {
          icon: Loader2,
          color: 'text-blue-600',
          bgColor: 'bg-blue-50',
          borderColor: 'border-blue-200',
          variant: 'secondary' as const,
          text: 'Connecting...',
          description: 'Establishing connection to Flowise',
          animate: true,
        }
      case 'error':
        return {
          icon: AlertCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          variant: 'destructive' as const,
          text: 'Error',
          description: 'Connection failed',
        }
      default:
        return {
          icon: WifiOff,
          color: 'text-gray-600',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          variant: 'outline' as const,
          text: 'Disconnected',
          description: 'Not connected to Flowise',
        }
    }
  }

  const getLatencyInfo = () => {
    if (!latency) return null
    
    if (latency < 100) {
      return {
        level: 'excellent',
        color: 'text-green-600',
        icon: TrendingUp,
        text: 'Excellent',
      }
    } else if (latency < 300) {
      return {
        level: 'good',
        color: 'text-green-600',
        icon: Activity,
        text: 'Good',
      }
    } else if (latency < 1000) {
      return {
        level: 'moderate',
        color: 'text-yellow-600',
        icon: Activity,
        text: 'Moderate',
      }
    } else {
      return {
        level: 'slow',
        color: 'text-red-600',
        icon: TrendingDown,
        text: 'Slow',
      }
    }
  }

  const statusConfig = getStatusConfig()
  const latencyInfo = getLatencyInfo()
  const StatusIcon = statusConfig.icon

  if (!showDetails) {
    // Simple badge version
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={statusConfig.variant} className={`flex items-center gap-1 ${className}`}>
            <StatusIcon 
              className={`h-3 w-3 ${statusConfig.color} ${statusConfig.animate ? 'animate-spin' : ''}`} 
            />
            {statusConfig.text}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <div className="space-y-1">
            <p className="font-medium">{statusConfig.description}</p>
            {message && <p className="text-sm">{message}</p>}
            {lastTested && (
              <p className="text-xs text-muted-foreground">
                Last tested: {lastTested.toLocaleTimeString()}
              </p>
            )}
          </div>
        </TooltipContent>
      </Tooltip>
    )
  }

  // Detailed card version
  return (
    <Card className={`${statusConfig.bgColor} ${statusConfig.borderColor} ${className}`}>
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Main status */}
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${statusConfig.bgColor}`}>
              <StatusIcon 
                className={`h-5 w-5 ${statusConfig.color} ${statusConfig.animate ? 'animate-spin' : ''}`} 
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{statusConfig.description}</h3>
                <Badge variant={statusConfig.variant} className="text-xs">
                  {statusConfig.text}
                </Badge>
              </div>
              {message && (
                <p className="text-sm text-muted-foreground mt-1">{message}</p>
              )}
            </div>
          </div>

          {/* Connection details */}
          {status === 'connected' && (
            <div className="space-y-3">
              {/* Latency indicator */}
              {latencyInfo && (
                <div className="flex items-center gap-2">
                  <latencyInfo.icon className={`h-4 w-4 ${latencyInfo.color}`} />
                  <span className="text-sm font-medium">Response Time:</span>
                  <span className={`text-sm ${latencyInfo.color}`}>
                    {latency}ms ({latencyInfo.text})
                  </span>
                </div>
              )}

              {/* Capabilities */}
              {capabilities.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Capabilities:</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {capabilities.map((capability) => (
                      <Badge key={capability} variant="outline" className="text-xs">
                        {capability}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {/* Last tested */}
              {lastTested && (
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>Last tested: {lastTested.toLocaleString()}</span>
                </div>
              )}
            </div>
          )}

          {/* Connection progress for connecting state */}
          {status === 'connecting' && (
            <div className="space-y-2">
              <Progress value={undefined} className="h-2" />
              <p className="text-xs text-muted-foreground">
                Establishing secure connection...
              </p>
            </div>
          )}

          {/* Error details */}
          {status === 'error' && message && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-800">{message}</p>
              {lastTested && (
                <p className="text-xs text-red-600 mt-1">
                  Failed at: {lastTested.toLocaleString()}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Performance metrics indicator
interface PerformanceMetricsProps {
  cacheHitRate?: number
  averageResponseTime?: number
  errorRate?: number
  queueSize?: number
  className?: string
}

export function PerformanceMetrics({
  cacheHitRate = 0,
  averageResponseTime = 0,
  errorRate = 0,
  queueSize = 0,
  className,
}: PerformanceMetricsProps) {
  const getPerformanceColor = (value: number, thresholds: [number, number]) => {
    if (value >= thresholds[1]) return 'text-green-600'
    if (value >= thresholds[0]) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <Card className={className}>
      <CardContent className="p-4">
        <div className="space-y-3">
          <h3 className="font-medium text-sm">Performance Metrics</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Cache Hit Rate */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Zap className="h-3 w-3 text-blue-600" />
                <span className="text-xs text-muted-foreground">Cache Hit Rate</span>
              </div>
              <div className="flex items-center gap-2">
                <Progress value={cacheHitRate * 100} className="h-1 flex-1" />
                <span className={`text-xs font-medium ${getPerformanceColor(cacheHitRate, [0.7, 0.85])}`}>
                  {Math.round(cacheHitRate * 100)}%
                </span>
              </div>
            </div>

            {/* Response Time */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Activity className="h-3 w-3 text-green-600" />
                <span className="text-xs text-muted-foreground">Avg Response</span>
              </div>
              <div className={`text-xs font-medium ${getPerformanceColor(2000 - averageResponseTime, [500, 1500])}`}>
                {averageResponseTime}ms
              </div>
            </div>

            {/* Error Rate */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-3 w-3 text-red-600" />
                <span className="text-xs text-muted-foreground">Error Rate</span>
              </div>
              <div className={`text-xs font-medium ${getPerformanceColor(1 - errorRate, [0.95, 0.98])}`}>
                {Math.round(errorRate * 100)}%
              </div>
            </div>

            {/* Queue Size */}
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-3 w-3 text-purple-600" />
                <span className="text-xs text-muted-foreground">Queue Size</span>
              </div>
              <div className={`text-xs font-medium ${getPerformanceColor(10 - queueSize, [5, 8])}`}>
                {queueSize}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default FlowiseStatusIndicator