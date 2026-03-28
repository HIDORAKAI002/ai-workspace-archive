'use client'

import * as React from 'react'
import { X } from 'lucide-react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

const modalVariants = cva(
  'fixed inset-0 z-50 flex items-center justify-center p-4',
  {
    variants: {
      variant: {
        default: 'bg-black/50 backdrop-blur-sm',
        blur: 'bg-black/20 backdrop-blur-md',
        solid: 'bg-black/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

const modalContentVariants = cva(
  'relative bg-background rounded-lg shadow-lg border max-h-[90vh] overflow-hidden',
  {
    variants: {
      size: {
        sm: 'max-w-sm w-full',
        md: 'max-w-md w-full',
        lg: 'max-w-lg w-full',
        xl: 'max-w-xl w-full',
        '2xl': 'max-w-2xl w-full',
        '3xl': 'max-w-3xl w-full',
        '4xl': 'max-w-4xl w-full',
        '5xl': 'max-w-5xl w-full',
        '6xl': 'max-w-6xl w-full',
        '7xl': 'max-w-7xl w-full',
        full: 'max-w-full w-full h-full',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
)

export interface ModalProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof modalVariants> {
  isOpen: boolean
  onClose: () => void
  size?: VariantProps<typeof modalContentVariants>['size']
  title?: string
  description?: string
  showCloseButton?: boolean
  closeOnOverlayClick?: boolean
  closeOnEscapeKey?: boolean
  preventScroll?: boolean
}

const Modal = React.forwardRef<HTMLDivElement, ModalProps>(
  (
    {
      className,
      variant,
      size = 'md',
      isOpen,
      onClose,
      title,
      description,
      showCloseButton = true,
      closeOnOverlayClick = true,
      closeOnEscapeKey = true,
      preventScroll = true,
      children,
      ...props
    },
    ref
  ) => {
    const [isMounted, setIsMounted] = React.useState(false)

    // Handle escape key
    React.useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && closeOnEscapeKey) {
          onClose()
        }
      }

      if (isOpen && closeOnEscapeKey) {
        document.addEventListener('keydown', handleEscape)
      }

      return () => {
        document.removeEventListener('keydown', handleEscape)
      }
    }, [isOpen, closeOnEscapeKey, onClose])

    // Handle body scroll
    React.useEffect(() => {
      if (isOpen && preventScroll) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'unset'
      }

      return () => {
        document.body.style.overflow = 'unset'
      }
    }, [isOpen, preventScroll])

    // Handle mount/unmount for animation
    React.useEffect(() => {
      if (isOpen) {
        setIsMounted(true)
      } else {
        const timer = setTimeout(() => setIsMounted(false), 150)
        return () => clearTimeout(timer)
      }
    }, [isOpen])

    const handleOverlayClick = (e: React.MouseEvent) => {
      if (e.target === e.currentTarget && closeOnOverlayClick) {
        onClose()
      }
    }

    if (!isMounted) return null

    return (
      <div
        ref={ref}
        className={cn(
          modalVariants({ variant, className }),
          isOpen ? 'animate-in fade-in-0' : 'animate-out fade-out-0'
        )}
        onClick={handleOverlayClick}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'modal-title' : undefined}
        aria-describedby={description ? 'modal-description' : undefined}
        {...props}
      >
        <div
          className={cn(
            modalContentVariants({ size }),
            isOpen ? 'animate-in zoom-in-95' : 'animate-out zoom-out-95'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {(title || description || showCloseButton) && (
            <div className="flex items-start justify-between border-b p-4">
              <div className="flex-1">
                {title && (
                  <h2 id="modal-title" className="text-lg font-semibold">
                    {title}
                  </h2>
                )}
                {description && (
                  <p
                    id="modal-description"
                    className="mt-1 text-sm text-muted-foreground"
                  >
                    {description}
                  </p>
                )}
              </div>
              {showCloseButton && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-4 h-8 w-8 shrink-0"
                  onClick={onClose}
                  aria-label="Close modal"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}

          {/* Content */}
          <div className="max-h-[calc(90vh-8rem)] overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    )
  }
)
Modal.displayName = 'Modal'

// Modal content components
const ModalHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex flex-col space-y-1.5 border-b p-4', className)}
    {...props}
  />
))
ModalHeader.displayName = 'ModalHeader'

const ModalTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h2
    ref={ref}
    className={cn(
      'text-lg font-semibold leading-none tracking-tight',
      className
    )}
    {...props}
  />
))
ModalTitle.displayName = 'ModalTitle'

const ModalDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn('text-sm text-muted-foreground', className)}
    {...props}
  />
))
ModalDescription.displayName = 'ModalDescription'

const ModalContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props} />
))
ModalContent.displayName = 'ModalContent'

const ModalFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex items-center justify-end gap-2 border-t p-4',
      className
    )}
    {...props}
  />
))
ModalFooter.displayName = 'ModalFooter'

// Confirmation modal component
export interface ConfirmationModalProps extends Omit<ModalProps, 'children'> {
  onConfirm: () => void
  onCancel?: () => void
  confirmText?: string
  cancelText?: string
  confirmVariant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  loading?: boolean
}

const ConfirmationModal = React.forwardRef<
  HTMLDivElement,
  ConfirmationModalProps
>(
  (
    {
      onConfirm,
      onCancel,
      confirmText = 'Confirm',
      cancelText = 'Cancel',
      confirmVariant = 'default',
      loading = false,
      ...props
    },
    ref
  ) => {
    const handleCancel = () => {
      if (onCancel) {
        onCancel()
      } else {
        props.onClose()
      }
    }

    return (
      <Modal ref={ref} {...props}>
        <ModalContent>
          <ModalFooter>
            <Button variant="outline" onClick={handleCancel} disabled={loading}>
              {cancelText}
            </Button>
            <Button
              variant={confirmVariant}
              onClick={onConfirm}
              disabled={loading}
            >
              {loading ? 'Loading...' : confirmText}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }
)
ConfirmationModal.displayName = 'ConfirmationModal'

export {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalDescription,
  ModalContent,
  ModalFooter,
  ConfirmationModal,
  modalVariants,
}
