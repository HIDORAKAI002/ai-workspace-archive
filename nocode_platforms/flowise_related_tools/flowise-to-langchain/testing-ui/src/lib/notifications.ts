// Notification system for the Flowise integration
// This provides a centralized way to handle notifications throughout the app

interface NotificationOptions {
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  duration?: number
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'default' | 'destructive'
  }>
  persistent?: boolean
}

interface Notification extends NotificationOptions {
  id: string
  timestamp: Date
  read: boolean
  dismissed: boolean
}

type NotificationListener = (notification: Notification) => void

class NotificationManager {
  private notifications: Map<string, Notification> = new Map()
  private listeners: Set<NotificationListener> = new Set()
  private nextId = 1

  // Add a notification
  add(options: NotificationOptions): string {
    const id = `notification-${this.nextId++}`
    const notification: Notification = {
      ...options,
      id,
      timestamp: new Date(),
      read: false,
      dismissed: false,
      duration: options.duration || (options.persistent ? 0 : this.getDefaultDuration(options.type)),
    }

    this.notifications.set(id, notification)
    
    // Notify listeners
    this.notifyListeners(notification)

    // Auto-dismiss if not persistent
    if (notification.duration && notification.duration > 0) {
      setTimeout(() => {
        this.dismiss(id)
      }, notification.duration)
    }

    return id
  }

  // Get default duration based on type
  private getDefaultDuration(type: string): number {
    switch (type) {
      case 'error':
        return 0 // Persistent by default
      case 'warning':
        return 8000
      case 'success':
        return 4000
      case 'info':
      default:
        return 6000
    }
  }

  // Quick methods for different notification types
  info(title: string, message: string, options?: Partial<NotificationOptions>): string {
    return this.add({ ...options, title, message, type: 'info' })
  }

  success(title: string, message: string, options?: Partial<NotificationOptions>): string {
    return this.add({ ...options, title, message, type: 'success' })
  }

  warning(title: string, message: string, options?: Partial<NotificationOptions>): string {
    return this.add({ ...options, title, message, type: 'warning' })
  }

  error(title: string, message: string, options?: Partial<NotificationOptions>): string {
    return this.add({ ...options, title, message, type: 'error', persistent: true })
  }

  // Dismiss a notification
  dismiss(id: string): boolean {
    const notification = this.notifications.get(id)
    if (notification) {
      notification.dismissed = true
      this.notifications.delete(id)
      return true
    }
    return false
  }

  // Mark as read
  markAsRead(id: string): boolean {
    const notification = this.notifications.get(id)
    if (notification) {
      notification.read = true
      return true
    }
    return false
  }

  // Get all notifications
  getAll(): Notification[] {
    return Array.from(this.notifications.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  }

  // Get unread notifications
  getUnread(): Notification[] {
    return this.getAll().filter(n => !n.read)
  }

  // Clear all notifications
  clear(): void {
    this.notifications.clear()
  }

  // Add listener
  addListener(listener: NotificationListener): () => void {
    this.listeners.add(listener)
    return () => this.listeners.delete(listener)
  }

  // Notify all listeners
  private notifyListeners(notification: Notification): void {
    this.listeners.forEach(listener => {
      try {
        listener(notification)
      } catch (error) {
        console.error('Notification listener error:', error)
      }
    })
  }

  // Flowise-specific notification helpers
  flowiseConnectionSuccess(url: string): string {
    return this.success(
      'Connected to Flowise',
      `Successfully connected to ${url}`,
      {
        actions: [
          {
            label: 'Open Flowise',
            onClick: () => window.open(url, '_blank'),
          }
        ]
      }
    )
  }

  flowiseConnectionError(error: string): string {
    return this.error(
      'Flowise Connection Failed',
      error,
      {
        actions: [
          {
            label: 'Check Settings',
            onClick: () => {
              // This would trigger opening settings
              console.log('Open settings')
            },
          }
        ]
      }
    )
  }

  flowImportSuccess(flowName: string, count?: number): string {
    const message = count 
      ? `Successfully imported ${count} flows`
      : `Successfully imported "${flowName}"`
    
    return this.success('Flow Import Complete', message)
  }

  flowImportError(flowName: string, error: string): string {
    return this.error(
      'Flow Import Failed',
      `Failed to import "${flowName}": ${error}`,
      {
        actions: [
          {
            label: 'Retry',
            onClick: () => {
              // This would trigger retry logic
              console.log('Retry import')
            },
          }
        ]
      }
    )
  }

  flowTestSuccess(flowName: string): string {
    return this.success(
      'Flow Test Passed',
      `"${flowName}" is working correctly`
    )
  }

  flowTestError(flowName: string, error: string): string {
    return this.error(
      'Flow Test Failed',
      `"${flowName}" test failed: ${error}`,
      {
        actions: [
          {
            label: 'View Details',
            onClick: () => {
              console.log('View test details')
            },
          }
        ]
      }
    )
  }

  apiRateLimitWarning(): string {
    return this.warning(
      'Rate Limit Warning',
      'API requests are being rate limited. Some operations may be slower.',
      {
        duration: 10000,
      }
    )
  }

  cacheCleared(): string {
    return this.info(
      'Cache Cleared',
      'Flowise API cache has been cleared'
    )
  }

  configurationSaved(): string {
    return this.success(
      'Settings Saved',
      'Flowise configuration has been saved successfully'
    )
  }
}

// Export singleton instance
export const notifications = new NotificationManager()

// React hook for using notifications
export function useNotifications() {
  return {
    add: notifications.add.bind(notifications),
    info: notifications.info.bind(notifications),
    success: notifications.success.bind(notifications),
    warning: notifications.warning.bind(notifications),
    error: notifications.error.bind(notifications),
    dismiss: notifications.dismiss.bind(notifications),
    markAsRead: notifications.markAsRead.bind(notifications),
    getAll: notifications.getAll.bind(notifications),
    getUnread: notifications.getUnread.bind(notifications),
    clear: notifications.clear.bind(notifications),
    addListener: notifications.addListener.bind(notifications),
    
    // Flowise-specific helpers
    flowiseConnectionSuccess: notifications.flowiseConnectionSuccess.bind(notifications),
    flowiseConnectionError: notifications.flowiseConnectionError.bind(notifications),
    flowImportSuccess: notifications.flowImportSuccess.bind(notifications),
    flowImportError: notifications.flowImportError.bind(notifications),
    flowTestSuccess: notifications.flowTestSuccess.bind(notifications),
    flowTestError: notifications.flowTestError.bind(notifications),
    apiRateLimitWarning: notifications.apiRateLimitWarning.bind(notifications),
    cacheCleared: notifications.cacheCleared.bind(notifications),
    configurationSaved: notifications.configurationSaved.bind(notifications),
  }
}

export default notifications