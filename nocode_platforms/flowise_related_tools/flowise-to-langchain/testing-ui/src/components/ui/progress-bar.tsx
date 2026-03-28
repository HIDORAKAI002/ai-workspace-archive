import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const progressVariants = cva(
  'w-full bg-secondary rounded-full overflow-hidden',
  {
    variants: {
      size: {
        sm: 'h-1',
        default: 'h-2',
        lg: 'h-3',
        xl: 'h-4',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

const progressBarVariants = cva(
  'h-full transition-all duration-300 ease-in-out',
  {
    variants: {
      variant: {
        default: 'bg-primary',
        secondary: 'bg-secondary',
        success: 'bg-green-500',
        error: 'bg-red-500',
        warning: 'bg-yellow-500',
        info: 'bg-blue-500',
      },
      animated: {
        true: 'bg-gradient-to-r from-transparent via-current to-transparent bg-[length:200%_100%] animate-pulse',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      animated: false,
    },
  }
)

export interface ProgressBarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof progressVariants> {
  value: number
  max?: number
  variant?: 'default' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  animated?: boolean
  indeterminate?: boolean
  label?: string
  showValue?: boolean
  showPercentage?: boolean
  formatValue?: (value: number, max: number) => string
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      className,
      size,
      value,
      max = 100,
      variant = 'default',
      animated = false,
      indeterminate = false,
      label,
      showValue = false,
      showPercentage = false,
      formatValue,
      ...props
    },
    ref
  ) => {
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))

    const displayValue = formatValue
      ? formatValue(value, max)
      : `${value}/${max}`
    const displayPercentage = `${Math.round(percentage)}%`

    return (
      <div ref={ref} className={cn('w-full', className)} {...props}>
        {/* Label and value display */}
        {(label || showValue || showPercentage) && (
          <div className="mb-1 flex items-center justify-between">
            {label && <span className="text-sm font-medium">{label}</span>}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              {showValue && <span>{displayValue}</span>}
              {showPercentage && <span>{displayPercentage}</span>}
            </div>
          </div>
        )}

        {/* Progress bar container */}
        <div
          className={cn(progressVariants({ size, className }))}
          role="progressbar"
          aria-valuenow={indeterminate ? undefined : value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label}
        >
          {indeterminate ? (
            // Indeterminate progress bar
            <div className="h-full animate-[shimmer_2s_infinite] animate-pulse bg-primary bg-gradient-to-r from-transparent via-primary to-transparent bg-[length:200%_100%]" />
          ) : (
            // Determinate progress bar
            <div
              className={cn(progressBarVariants({ variant, animated }))}
              style={{ width: `${percentage}%` }}
            />
          )}
        </div>
      </div>
    )
  }
)
ProgressBar.displayName = 'ProgressBar'

// Circular progress variant
export interface CircularProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  variant?: 'default' | 'secondary' | 'success' | 'error' | 'warning' | 'info'
  showValue?: boolean
  showPercentage?: boolean
  animated?: boolean
  indeterminate?: boolean
}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      className,
      value,
      max = 100,
      size = 40,
      strokeWidth = 4,
      variant = 'default',
      showValue = false,
      showPercentage = false,
      animated = false,
      indeterminate = false,
      ...props
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const percentage = Math.min(100, Math.max(0, (value / max) * 100))
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    const getStrokeColor = (variant: string) => {
      switch (variant) {
        case 'success':
          return 'stroke-green-500'
        case 'error':
          return 'stroke-red-500'
        case 'warning':
          return 'stroke-yellow-500'
        case 'info':
          return 'stroke-blue-500'
        case 'secondary':
          return 'stroke-secondary'
        default:
          return 'stroke-primary'
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          'relative inline-flex items-center justify-center',
          className
        )}
        style={{ width: size, height: size }}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="-rotate-90 transform"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-secondary opacity-20"
          />

          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={strokeDasharray}
            strokeDashoffset={indeterminate ? 0 : strokeDashoffset}
            strokeLinecap="round"
            className={cn(
              getStrokeColor(variant),
              'transition-all duration-300 ease-in-out',
              indeterminate && 'origin-center animate-spin',
              animated && 'animate-pulse'
            )}
            style={
              indeterminate
                ? {
                    strokeDasharray: `${circumference * 0.25} ${circumference * 0.75}`,
                    animationDuration: '2s',
                  }
                : {}
            }
          />
        </svg>

        {/* Center content */}
        {(showValue || showPercentage) && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">
              {showPercentage ? `${Math.round(percentage)}%` : value}
            </span>
          </div>
        )}
      </div>
    )
  }
)
CircularProgress.displayName = 'CircularProgress'

// Multi-step progress component
export interface StepProgressProps
  extends React.HTMLAttributes<HTMLDivElement> {
  steps: Array<{
    label: string
    completed?: boolean
    current?: boolean
    error?: boolean
  }>
  variant?: 'default' | 'compact'
  orientation?: 'horizontal' | 'vertical'
}

const StepProgress = React.forwardRef<HTMLDivElement, StepProgressProps>(
  (
    {
      className,
      steps,
      variant = 'default',
      orientation = 'horizontal',
      ...props
    },
    ref
  ) => {
    const isHorizontal = orientation === 'horizontal'

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          isHorizontal ? 'flex-row items-center' : 'flex-col',
          className
        )}
        {...props}
      >
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            <div
              className={cn(
                'flex items-center',
                isHorizontal ? 'flex-row' : 'flex-col',
                !isHorizontal && 'w-full'
              )}
            >
              {/* Step indicator */}
              <div
                className={cn(
                  'flex items-center justify-center rounded-full border-2 text-sm font-medium',
                  step.completed
                    ? 'border-primary bg-primary text-primary-foreground'
                    : step.current
                      ? 'border-primary bg-primary/10 text-primary'
                      : step.error
                        ? 'border-red-500 bg-red-100 text-red-700'
                        : 'border-muted-foreground/20 bg-muted text-muted-foreground',
                  variant === 'compact' ? 'h-6 w-6 text-xs' : 'h-8 w-8 text-sm'
                )}
              >
                {step.completed ? '✓' : index + 1}
              </div>

              {/* Step label */}
              {variant !== 'compact' && (
                <span
                  className={cn(
                    'text-sm font-medium',
                    isHorizontal ? 'ml-2' : 'mt-1',
                    step.completed
                      ? 'text-primary'
                      : step.current
                        ? 'text-primary'
                        : step.error
                          ? 'text-red-700'
                          : 'text-muted-foreground'
                  )}
                >
                  {step.label}
                </span>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'bg-muted-foreground/20',
                  isHorizontal ? 'mx-2 h-0.5 flex-1' : 'my-1 ml-4 h-4 w-0.5'
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    )
  }
)
StepProgress.displayName = 'StepProgress'

export { ProgressBar, CircularProgress, StepProgress, progressVariants }
