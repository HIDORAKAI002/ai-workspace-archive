'use client'

import * as React from 'react'
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<ErrorFallbackProps>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
  showDetails?: boolean
  className?: string
}

interface ErrorFallbackProps {
  error: Error
  errorInfo: React.ErrorInfo
  resetError: () => void
  showDetails?: boolean
  className?: string
}

const DefaultErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  errorInfo,
  resetError,
  showDetails = false,
  className,
}) => {
  const [detailsVisible, setDetailsVisible] = React.useState(false)

  const handleReload = () => {
    window.location.reload()
  }

  const handleGoHome = () => {
    window.location.href = '/'
  }

  const handleReportError = () => {
    // In a real app, you might send this to an error reporting service
    console.error('Error reported:', error, errorInfo)

    // For now, just copy to clipboard
    const errorReport = `Error: ${error.message}\nStack: ${error.stack}\nComponent Stack: ${errorInfo.componentStack}`
    navigator.clipboard
      ?.writeText(errorReport)
      .then(() => alert('Error details copied to clipboard'))
      .catch(() => console.error('Failed to copy to clipboard'))
  }

  return (
    <div
      className={cn(
        'flex min-h-[400px] items-center justify-center p-4',
        className
      )}
    >
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-destructive">
            Something went wrong
          </CardTitle>
          <CardDescription>
            An unexpected error has occurred. Please try refreshing the page or
            go back to the home page.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Error message */}
          <div className="rounded-md border border-destructive/20 bg-destructive/10 p-3">
            <p className="text-sm font-medium text-destructive">
              Error: {error.message}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={resetError} variant="default" className="flex-1">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
            <Button onClick={handleReload} variant="outline" className="flex-1">
              Reload Page
            </Button>
            <Button onClick={handleGoHome} variant="outline" className="flex-1">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </div>

          {/* Show details toggle */}
          {showDetails && (
            <div className="space-y-2">
              <Button
                onClick={() => setDetailsVisible(!detailsVisible)}
                variant="ghost"
                size="sm"
                className="w-full"
              >
                {detailsVisible ? 'Hide' : 'Show'} Technical Details
              </Button>

              {detailsVisible && (
                <div className="space-y-2">
                  <div className="rounded-md bg-muted p-3">
                    <p className="mb-2 text-xs font-medium">Stack Trace:</p>
                    <pre className="max-h-32 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                      {error.stack}
                    </pre>
                  </div>

                  <div className="rounded-md bg-muted p-3">
                    <p className="mb-2 text-xs font-medium">Component Stack:</p>
                    <pre className="max-h-32 overflow-auto whitespace-pre-wrap text-xs text-muted-foreground">
                      {errorInfo.componentStack}
                    </pre>
                  </div>

                  <Button
                    onClick={handleReportError}
                    variant="outline"
                    size="sm"
                    className="w-full"
                  >
                    <Bug className="mr-2 h-4 w-4" />
                    Report Error
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

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    this.setState({
      error,
      errorInfo,
    })

    // Call the onError callback if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  render() {
    if (this.state.hasError && this.state.error && this.state.errorInfo) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback

      return (
        <FallbackComponent
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          resetError={this.resetError}
          showDetails={this.props.showDetails}
          className={this.props.className}
        />
      )
    }

    return this.props.children
  }
}

// Hook for functional components to handle errors
export const useErrorHandler = () => {
  const [error, setError] = React.useState<Error | null>(null)

  const resetError = React.useCallback(() => {
    setError(null)
  }, [])

  const handleError = React.useCallback((error: Error) => {
    setError(error)
  }, [])

  React.useEffect(() => {
    if (error) {
      throw error
    }
  }, [error])

  return { handleError, resetError }
}

export { ErrorBoundary, DefaultErrorFallback }
export type { ErrorBoundaryProps, ErrorFallbackProps }
