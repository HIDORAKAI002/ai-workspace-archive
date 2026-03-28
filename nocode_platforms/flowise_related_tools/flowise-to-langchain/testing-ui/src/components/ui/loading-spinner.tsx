import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const spinnerVariants = cva(
  'animate-spin rounded-full border-2 border-current border-t-transparent',
  {
    variants: {
      size: {
        sm: 'h-4 w-4',
        default: 'h-6 w-6',
        lg: 'h-8 w-8',
        xl: 'h-12 w-12',
      },
      variant: {
        default: 'text-primary',
        secondary: 'text-secondary',
        accent: 'text-accent',
        muted: 'text-muted-foreground',
        destructive: 'text-destructive',
      },
    },
    defaultVariants: {
      size: 'default',
      variant: 'default',
    },
  }
)

const dotSpinnerVariants = cva('inline-flex items-center space-x-1', {
  variants: {
    size: {
      sm: 'text-xs',
      default: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
    variant: {
      default: 'text-primary',
      secondary: 'text-secondary',
      accent: 'text-accent',
      muted: 'text-muted-foreground',
      destructive: 'text-destructive',
    },
  },
  defaultVariants: {
    size: 'default',
    variant: 'default',
  },
})

export interface LoadingSpinnerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spinnerVariants> {
  type?: 'circular' | 'dots' | 'pulse'
  text?: string
  inline?: boolean
}

const LoadingSpinner = React.forwardRef<HTMLDivElement, LoadingSpinnerProps>(
  (
    { className, size, variant, type = 'circular', text, inline, ...props },
    ref
  ) => {
    const renderSpinner = () => {
      switch (type) {
        case 'circular':
          return (
            <div
              className={cn(spinnerVariants({ size, variant, className }))}
              aria-label="Loading"
              role="status"
            />
          )
        case 'dots':
          return (
            <div
              className={cn(dotSpinnerVariants({ size, variant, className }))}
              role="status"
            >
              <div className="animate-pulse">●</div>
              <div className="animation-delay-100 animate-pulse">●</div>
              <div className="animation-delay-200 animate-pulse">●</div>
            </div>
          )
        case 'pulse':
          return (
            <div className={cn('animate-pulse', className)} role="status">
              <div
                className={cn(
                  'rounded bg-current',
                  size === 'sm'
                    ? 'h-4 w-4'
                    : size === 'lg'
                      ? 'h-8 w-8'
                      : size === 'xl'
                        ? 'h-12 w-12'
                        : 'h-6 w-6'
                )}
              />
            </div>
          )
        default:
          return null
      }
    }

    const content = (
      <>
        {renderSpinner()}
        {text && (
          <span
            className={cn(
              'ml-2 text-sm text-muted-foreground',
              inline ? 'inline' : 'mt-2 block'
            )}
          >
            {text}
          </span>
        )}
      </>
    )

    return (
      <div
        ref={ref}
        className={cn(
          'flex',
          inline
            ? 'inline-flex items-center'
            : 'flex-col items-center justify-center',
          className
        )}
        {...props}
      >
        {content}
      </div>
    )
  }
)
LoadingSpinner.displayName = 'LoadingSpinner'

export { LoadingSpinner, spinnerVariants }
