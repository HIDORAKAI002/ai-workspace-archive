import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Zap,
  Pause,
  Play,
  RefreshCw,
} from 'lucide-react'
import { cn, getStatusColor, getStatusBgColor } from '@/lib/utils'

const statusVariants = cva(
  'inline-flex items-center gap-2 px-2 py-1 rounded-full text-xs font-medium border',
  {
    variants: {
      variant: {
        default: 'bg-background text-foreground border-border',
        success: 'bg-green-50 text-green-700 border-green-200',
        error: 'bg-red-50 text-red-700 border-red-200',
        warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        info: 'bg-blue-50 text-blue-700 border-blue-200',
        secondary: 'bg-secondary text-secondary-foreground border-secondary',
      },
      size: {
        sm: 'px-1.5 py-0.5 text-xs',
        default: 'px-2 py-1 text-xs',
        lg: 'px-3 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const pulseVariants = cva('h-2 w-2 rounded-full animate-pulse', {
  variants: {
    variant: {
      default: 'bg-gray-400',
      success: 'bg-green-500',
      error: 'bg-red-500',
      warning: 'bg-yellow-500',
      info: 'bg-blue-500',
      secondary: 'bg-secondary',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

export interface StatusIndicatorProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof statusVariants> {
  status:
    | 'success'
    | 'error'
    | 'warning'
    | 'info'
    | 'loading'
    | 'pending'
    | 'running'
    | 'paused'
    | 'stopped'
    | 'healthy'
  label?: string
  showIcon?: boolean
  showPulse?: boolean
  animated?: boolean
  customIcon?: React.ReactNode
}

const StatusIndicator = React.forwardRef<HTMLDivElement, StatusIndicatorProps>(
  (
    {
      className,
      variant,
      size,
      status,
      label,
      showIcon = true,
      showPulse = false,
      animated = true,
      customIcon,
      ...props
    },
    ref
  ) => {
    const getStatusVariant = (status: string) => {
      switch (status) {
        case 'success':
        case 'healthy':
          return 'success'
        case 'error':
          return 'error'
        case 'warning':
          return 'warning'
        case 'info':
        case 'loading':
        case 'pending':
        case 'running':
          return 'info'
        default:
          return 'default'
      }
    }

    const getStatusIcon = (status: string) => {
      if (customIcon) return customIcon

      const iconSize =
        size === 'sm' ? 'h-3 w-3' : size === 'lg' ? 'h-4 w-4' : 'h-3 w-3'

      switch (status) {
        case 'success':
        case 'healthy':
          return <CheckCircle className={cn(iconSize, 'text-green-600')} />
        case 'error':
          return <XCircle className={cn(iconSize, 'text-red-600')} />
        case 'warning':
          return <AlertCircle className={cn(iconSize, 'text-yellow-600')} />
        case 'info':
          return <AlertCircle className={cn(iconSize, 'text-blue-600')} />
        case 'loading':
          return (
            <RefreshCw
              className={cn(
                iconSize,
                'text-blue-600',
                animated && 'animate-spin'
              )}
            />
          )
        case 'pending':
          return <Clock className={cn(iconSize, 'text-blue-600')} />
        case 'running':
          return <Play className={cn(iconSize, 'text-blue-600')} />
        case 'paused':
          return <Pause className={cn(iconSize, 'text-yellow-600')} />
        case 'stopped':
          return <XCircle className={cn(iconSize, 'text-gray-600')} />
        default:
          return <AlertCircle className={cn(iconSize, 'text-gray-600')} />
      }
    }

    const statusVariant = variant || getStatusVariant(status)

    return (
      <div
        ref={ref}
        className={cn(
          statusVariants({ variant: statusVariant, size, className })
        )}
        role="status"
        aria-label={label || status}
        {...props}
      >
        {showPulse && (
          <div className={cn(pulseVariants({ variant: statusVariant }))} />
        )}
        {showIcon && getStatusIcon(status)}
        {label && <span className="capitalize">{label}</span>}
      </div>
    )
  }
)
StatusIndicator.displayName = 'StatusIndicator'

// Preset status components for common use cases
export const SuccessStatus = React.forwardRef<
  HTMLDivElement,
  Omit<StatusIndicatorProps, 'status'>
>((props, ref) => <StatusIndicator ref={ref} status="success" {...props} />)
SuccessStatus.displayName = 'SuccessStatus'

export const ErrorStatus = React.forwardRef<
  HTMLDivElement,
  Omit<StatusIndicatorProps, 'status'>
>((props, ref) => <StatusIndicator ref={ref} status="error" {...props} />)
ErrorStatus.displayName = 'ErrorStatus'

export const WarningStatus = React.forwardRef<
  HTMLDivElement,
  Omit<StatusIndicatorProps, 'status'>
>((props, ref) => <StatusIndicator ref={ref} status="warning" {...props} />)
WarningStatus.displayName = 'WarningStatus'

export const LoadingStatus = React.forwardRef<
  HTMLDivElement,
  Omit<StatusIndicatorProps, 'status'>
>((props, ref) => <StatusIndicator ref={ref} status="loading" {...props} />)
LoadingStatus.displayName = 'LoadingStatus'

export const RunningStatus = React.forwardRef<
  HTMLDivElement,
  Omit<StatusIndicatorProps, 'status'>
>((props, ref) => <StatusIndicator ref={ref} status="running" {...props} />)
RunningStatus.displayName = 'RunningStatus'

export { StatusIndicator, statusVariants }
