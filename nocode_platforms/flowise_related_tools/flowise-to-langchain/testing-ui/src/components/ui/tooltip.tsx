'use client'

import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tooltipVariants = cva(
  'absolute z-50 px-3 py-1.5 text-sm font-medium text-white bg-gray-900 rounded-md shadow-md pointer-events-none transition-opacity duration-200',
  {
    variants: {
      variant: {
        default: 'bg-gray-900 text-white',
        dark: 'bg-gray-900 text-white',
        light: 'bg-white text-gray-900 border border-gray-200',
        error: 'bg-red-600 text-white',
        warning: 'bg-yellow-600 text-white',
        success: 'bg-green-600 text-white',
        info: 'bg-blue-600 text-white',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        default: 'px-3 py-1.5 text-sm',
        lg: 'px-4 py-2 text-base',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

const arrowVariants = cva('absolute w-2 h-2 rotate-45', {
  variants: {
    variant: {
      default: 'bg-gray-900',
      dark: 'bg-gray-900',
      light: 'bg-white border border-gray-200',
      error: 'bg-red-600',
      warning: 'bg-yellow-600',
      success: 'bg-green-600',
      info: 'bg-blue-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
})

type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export interface TooltipProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'>,
    VariantProps<typeof tooltipVariants> {
  content: React.ReactNode
  position?: TooltipPosition
  delay?: number
  disabled?: boolean
  showArrow?: boolean
  maxWidth?: string
  multiline?: boolean
  interactive?: boolean
  offset?: number
}

const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  (
    {
      className,
      variant,
      size,
      content,
      position = 'top',
      delay = 300,
      disabled = false,
      showArrow = true,
      maxWidth = '200px',
      multiline = false,
      interactive = false,
      offset = 8,
      children,
      ...props
    },
    ref
  ) => {
    const [isVisible, setIsVisible] = React.useState(false)
    const [actualPosition, setActualPosition] =
      React.useState<TooltipPosition>(position)
    const triggerRef = React.useRef<HTMLDivElement>(null)
    const tooltipRef = React.useRef<HTMLDivElement>(null)
    const timeoutRef = React.useRef<NodeJS.Timeout>()
    const leaveTimeoutRef = React.useRef<NodeJS.Timeout>()

    const showTooltip = React.useCallback(() => {
      if (disabled || !content) return

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        setIsVisible(true)
      }, delay)
    }, [disabled, content, delay])

    const hideTooltip = React.useCallback(() => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      if (interactive) {
        leaveTimeoutRef.current = setTimeout(() => {
          setIsVisible(false)
        }, 100)
      } else {
        setIsVisible(false)
      }
    }, [interactive])

    const handleTooltipEnter = React.useCallback(() => {
      if (leaveTimeoutRef.current) {
        clearTimeout(leaveTimeoutRef.current)
      }
    }, [])

    const handleTooltipLeave = React.useCallback(() => {
      if (interactive) {
        leaveTimeoutRef.current = setTimeout(() => {
          setIsVisible(false)
        }, 100)
      }
    }, [interactive])

    // Calculate position
    const getTooltipPosition = React.useCallback(() => {
      if (!triggerRef.current || !tooltipRef.current) return {}

      const triggerRect = triggerRef.current.getBoundingClientRect()
      const tooltipRect = tooltipRef.current.getBoundingClientRect()
      const viewport = {
        width: window.innerWidth,
        height: window.innerHeight,
      }

      let newPosition = position
      let top = 0
      let left = 0

      // Calculate initial position
      switch (position) {
        case 'top':
          top = triggerRect.top - tooltipRect.height - offset
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'bottom':
          top = triggerRect.bottom + offset
          left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2
          break
        case 'left':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.left - tooltipRect.width - offset
          break
        case 'right':
          top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2
          left = triggerRect.right + offset
          break
      }

      // Check if tooltip fits in viewport and adjust if necessary
      if (top < 0 && position === 'top') {
        newPosition = 'bottom'
        top = triggerRect.bottom + offset
      } else if (
        top + tooltipRect.height > viewport.height &&
        position === 'bottom'
      ) {
        newPosition = 'top'
        top = triggerRect.top - tooltipRect.height - offset
      }

      if (left < 0 && position === 'left') {
        newPosition = 'right'
        left = triggerRect.right + offset
      } else if (
        left + tooltipRect.width > viewport.width &&
        position === 'right'
      ) {
        newPosition = 'left'
        left = triggerRect.left - tooltipRect.width - offset
      }

      // Ensure tooltip stays within viewport bounds
      left = Math.max(8, Math.min(left, viewport.width - tooltipRect.width - 8))
      top = Math.max(8, Math.min(top, viewport.height - tooltipRect.height - 8))

      setActualPosition(newPosition)
      return { top, left }
    }, [position, offset])

    // Position tooltip
    React.useEffect(() => {
      if (isVisible && tooltipRef.current) {
        const { top, left } = getTooltipPosition()
        if (top !== undefined && left !== undefined) {
          tooltipRef.current.style.top = `${top}px`
          tooltipRef.current.style.left = `${left}px`
        }
      }
    }, [isVisible, getTooltipPosition])

    // Cleanup timeouts
    React.useEffect(() => {
      return () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
        }
        if (leaveTimeoutRef.current) {
          clearTimeout(leaveTimeoutRef.current)
        }
      }
    }, [])

    const getArrowClasses = (pos: TooltipPosition) => {
      switch (pos) {
        case 'top':
          return 'top-full left-1/2 -translate-x-1/2 -translate-y-px'
        case 'bottom':
          return 'bottom-full left-1/2 -translate-x-1/2 translate-y-px'
        case 'left':
          return 'left-full top-1/2 -translate-y-1/2 -translate-x-px'
        case 'right':
          return 'right-full top-1/2 -translate-y-1/2 translate-x-px'
        default:
          return ''
      }
    }

    if (!content) {
      return <div ref={ref}>{children}</div>
    }

    return (
      <>
        <div
          ref={triggerRef}
          onMouseEnter={showTooltip}
          onMouseLeave={hideTooltip}
          onFocus={showTooltip}
          onBlur={hideTooltip}
          className="inline-block"
          {...props}
        >
          {children}
        </div>

        {isVisible && (
          <div
            ref={tooltipRef}
            className={cn(
              tooltipVariants({ variant, size, className }),
              multiline ? 'whitespace-pre-wrap' : 'whitespace-nowrap',
              interactive ? 'pointer-events-auto' : 'pointer-events-none'
            )}
            style={{
              maxWidth,
              position: 'fixed',
              zIndex: 50,
            }}
            role="tooltip"
            onMouseEnter={handleTooltipEnter}
            onMouseLeave={handleTooltipLeave}
          >
            {content}
            {showArrow && (
              <div
                className={cn(
                  arrowVariants({ variant }),
                  getArrowClasses(actualPosition)
                )}
              />
            )}
          </div>
        )}
      </>
    )
  }
)
Tooltip.displayName = 'Tooltip'

// Convenience components for different tooltip types
export const InfoTooltip = React.forwardRef<
  HTMLDivElement,
  Omit<TooltipProps, 'variant'>
>((props, ref) => <Tooltip ref={ref} variant="info" {...props} />)
InfoTooltip.displayName = 'InfoTooltip'

export const ErrorTooltip = React.forwardRef<
  HTMLDivElement,
  Omit<TooltipProps, 'variant'>
>((props, ref) => <Tooltip ref={ref} variant="error" {...props} />)
ErrorTooltip.displayName = 'ErrorTooltip'

export const WarningTooltip = React.forwardRef<
  HTMLDivElement,
  Omit<TooltipProps, 'variant'>
>((props, ref) => <Tooltip ref={ref} variant="warning" {...props} />)
WarningTooltip.displayName = 'WarningTooltip'

export const SuccessTooltip = React.forwardRef<
  HTMLDivElement,
  Omit<TooltipProps, 'variant'>
>((props, ref) => <Tooltip ref={ref} variant="success" {...props} />)
SuccessTooltip.displayName = 'SuccessTooltip'

export { Tooltip, tooltipVariants }
