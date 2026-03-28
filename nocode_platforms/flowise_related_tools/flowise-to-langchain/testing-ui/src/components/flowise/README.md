# Flowise Integration Components

A comprehensive suite of React components for integrating with Flowise instances, providing advanced flow management, import/export capabilities, and real-time synchronization.

## 🚀 Features

### Core Integration
- **Secure API Communication**: Encrypted API key storage and secure HTTP(S) connections
- **Connection Management**: Automatic reconnection, health monitoring, and connection validation
- **Real-time Sync**: Live updates from Flowise instance with efficient caching
- **Error Handling**: Comprehensive error reporting with user-friendly messages

### Flow Management
- **Flow Browser**: Advanced grid/list view with search, filtering, and sorting
- **Bulk Operations**: Select and import multiple flows simultaneously
- **Flow Preview**: Detailed metadata view with flow structure analysis
- **Smart Categorization**: Automatic flow categorization and complexity analysis

### Advanced Features
- **Caching System**: Intelligent response caching with configurable TTL
- **Retry Logic**: Exponential backoff retry mechanism for failed requests
- **Rate Limiting**: Built-in request queue to prevent API overload
- **Performance Monitoring**: Real-time metrics tracking and bottleneck detection

## 📦 Components

### Main Components

#### `FloWiseIntegration`
The main integration hub component providing a complete dashboard interface.

**Features:**
- Multi-tab interface (Dashboard, Browser, Import, Upload)
- Real-time status indicators and performance metrics
- Quick stats display (total, deployed, public, starred flows)
- Recent activity tracking
- Bulk import operations

**Props:**
```typescript
interface FloWiseIntegrationProps {
  onFlowImport?: (flow: FlowiseFlow) => void
  onFlowUpload?: (flow: FlowiseFlow) => void
  onError?: (error: string) => void
  className?: string
}
```

#### `FlowiseSettings`
Advanced configuration component with comprehensive validation.

**Features:**
- Connection configuration with URL and API key
- Advanced settings (retry attempts, delays, caching)
- Real-time connection testing
- Environment variable loading
- Security features with encrypted storage

#### `FlowBrowser`
Comprehensive flow browsing component with advanced filtering.

**Features:**
- Grid and list view modes
- Advanced search and filtering
- Flow starring and selection
- Metadata display with complexity indicators
- Pagination support
- Sort by multiple criteria

#### `FlowImporter`
Specialized import component with progress tracking.

**Features:**
- Multi-flow selection
- Import progress tracking
- Error handling with detailed reporting
- Flow validation before import
- Metadata preservation

### Utility Components

#### `FlowiseStatusIndicator`
Smart status indicator with detailed connection information.

**Features:**
- Visual status representation
- Latency monitoring
- Capability detection
- Tooltip details
- Performance metrics

### Hooks and Utilities

#### `useFlowiseState`
Comprehensive state management hook for Flowise integration.

**Features:**
- Configuration management
- Connection state tracking
- Flow data management
- Import/export functionality
- Performance metrics

#### `FlowiseApiClient`
Enhanced API client with advanced features.

**Features:**
- Automatic retry with exponential backoff
- Response caching with TTL
- Rate limiting queue
- Streaming support for chat operations
- Comprehensive error handling
- Performance monitoring

## 🔧 Configuration

### Basic Setup

```typescript
import { FloWiseIntegration } from '@/components/flowise/FloWiseIntegration'

function App() {
  const handleFlowImport = (flow) => {
    console.log('Flow imported:', flow)
  }

  return (
    <FloWiseIntegration
      onFlowImport={handleFlowImport}
      onError={(error) => console.error('Flowise error:', error)}
    />
  )
}
```

### Advanced Configuration

```typescript
import { useFlowiseState } from '@/hooks/useFlowiseState'

function AdvancedIntegration() {
  const flowiseState = useFlowiseState()

  // Configure connection
  await flowiseState.updateConfig({
    url: 'https://your-flowise-instance.com',
    apiKey: 'your-api-key',
    retryAttempts: 5,
    retryDelay: 2000,
    cacheEnabled: true,
    cacheTtl: 600000, // 10 minutes
  })

  // Test connection
  const isConnected = await flowiseState.testConnection()
  
  // Load flows
  await flowiseState.loadFlows()
  
  // Import specific flow
  const flow = flowiseState.flows[0]
  const localFlow = await flowiseState.importFlow(flow)
  
  return <YourComponent />
}
```

### Environment Variables

Set these environment variables for default configuration:

```bash
NEXT_PUBLIC_FLOWISE_URL=http://localhost:3000
NEXT_PUBLIC_FLOWISE_API_KEY=your-api-key
NEXT_PUBLIC_RETRY_ATTEMPTS=3
NEXT_PUBLIC_RETRY_DELAY=1000
NEXT_PUBLIC_CACHE_ENABLED=true
NEXT_PUBLIC_CACHE_TTL=300000
NEXT_PUBLIC_REQUEST_TIMEOUT=30000
```

## 🔐 Security Features

### API Key Encryption
API keys are automatically encrypted before storage using browser fingerprinting:

```typescript
import { crypto } from '@/lib/crypto'

// Encrypt sensitive data
const encrypted = crypto.encrypt('sensitive-data')

// Decrypt when needed
const decrypted = crypto.decrypt(encrypted)
```

### Secure Storage
All configuration is stored securely with encryption for sensitive fields:

```typescript
const [config, setConfig] = useLocalStorage('flowise-config', defaultConfig, {
  serialize: (value) => {
    // Encrypt API key before storage
    if (value.apiKey) {
      value.apiKey = crypto.encrypt(value.apiKey)
    }
    return JSON.stringify(value)
  },
  deserialize: (value) => {
    // Decrypt API key after retrieval
    const config = JSON.parse(value)
    if (config.apiKey && crypto.isEncrypted(config.apiKey)) {
      config.apiKey = crypto.decrypt(config.apiKey)
    }
    return config
  }
})
```

## 📊 Performance Features

### Caching System
Intelligent response caching reduces API calls and improves performance:

```typescript
// Cache configuration
const client = new FlowiseApiClient({
  cacheEnabled: true,
  cacheTtl: 300000, // 5 minutes
})

// Automatic cache invalidation
client.clearCache() // Manual cache clearing
```

### Retry Logic
Exponential backoff retry mechanism handles transient failures:

```typescript
// Retry configuration
{
  retryAttempts: 3,
  retryDelay: 1000, // Base delay in ms
  // Actual delays: 1000ms, 2000ms, 4000ms
}
```

### Rate Limiting
Built-in request queue prevents API overload:

```typescript
// Requests are automatically queued and processed with delays
const results = await Promise.all([
  client.getFlows(),
  client.getFlow('id1'),
  client.getFlow('id2'),
])
// Requests are processed with appropriate delays
```

## 🎨 UI/UX Features

### Responsive Design
All components are fully responsive and mobile-friendly:

- Grid/list view modes
- Collapsible sidebars
- Touch-friendly interactions
- Optimized for different screen sizes

### Accessibility
Components follow WCAG 2.1 guidelines:

- Proper ARIA labels
- Keyboard navigation support
- High contrast mode support
- Screen reader compatibility

### Dark Mode
Full dark mode support with automatic theme detection:

```typescript
import { ThemeProvider } from '@/components/theme-provider'

<ThemeProvider defaultTheme="system">
  <FloWiseIntegration />
</ThemeProvider>
```

## 🧪 Testing

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## 📈 Monitoring

### Performance Metrics
Monitor integration performance with built-in metrics:

```typescript
const metrics = client.getPerformanceMetrics()
console.log({
  cacheHitRate: metrics.cacheHitRate,
  averageResponseTime: metrics.averageResponseTime,
  errorRate: metrics.errorRate,
  queueSize: metrics.queueSize,
})
```

### Error Tracking
Comprehensive error tracking and reporting:

```typescript
import { useNotifications } from '@/lib/notifications'

const notifications = useNotifications()

// Automatic error notifications
notifications.flowiseConnectionError('Connection failed')
notifications.flowImportError('My Flow', 'Invalid format')
```

## 🔄 Migration Guide

### From v1.x to v2.x

1. **Update imports:**
```typescript
// Old
import { FlowiseIntegration } from '@/components/flowise'

// New
import { FloWiseIntegration } from '@/components/flowise/FloWiseIntegration'
```

2. **Use new state management:**
```typescript
// Old
const [client, setClient] = useState(new FlowiseApiClient(config))

// New
const flowiseState = useFlowiseState()
```

3. **Update configuration:**
```typescript
// Old
const config = { url, apiKey, timeout }

// New
const config = {
  url,
  apiKey,
  timeout,
  retryAttempts: 3,
  retryDelay: 1000,
  cacheEnabled: true,
  cacheTtl: 300000,
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm run test

# Build for production
npm run build
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Flowise](https://github.com/FlowiseAI/Flowise) - The low-code AI platform
- [React](https://reactjs.org/) - The web framework
- [Next.js](https://nextjs.org/) - The full-stack framework
- [Tailwind CSS](https://tailwindcss.com/) - The utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - The primitive components