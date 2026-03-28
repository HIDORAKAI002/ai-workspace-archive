# Chat Testing Components

This directory contains interactive chat components for testing Flowise flows, inspired by Vercel AI SDK patterns.

## Components

### ChatInterface.tsx

Main chat interface component that provides a full-featured chat experience for testing flows.

**Features:**

- Real-time chat interface with message history
- Flow information display
- Test execution controls (start/stop/clear)
- Export and copy chat functionality
- Settings panel integration
- TypeScript support with proper typing

**Props:**

- `flow`: FlowiseFlow - The flow to test
- `onTestResult`: (result: TestResult) => void - Callback for test results
- `onFlowUpdate`: (flow: FlowiseFlow) => void - Callback for flow updates
- `className`: string - Additional CSS classes

### MessageBubble.tsx

Individual message display component with support for different message types.

**Features:**

- User, assistant, and system message types
- Typing indicators with animated dots
- Test result badges with status colors
- Error display
- Timestamp formatting
- Responsive design

**Props:**

- `message`: Message object with role, content, timestamp, and metadata
- `isTyping`: boolean - Shows typing animation
- `className`: string - Additional CSS classes

### ChatInput.tsx

Advanced input component with multi-modal support.

**Features:**

- Text input with auto-resize (multiline mode)
- File attachment support
- Voice recording capability
- Send button with keyboard shortcuts
- Disabled state handling
- Usage hints

**Props:**

- `onSendMessage`: (message: string) => void - Callback for sending messages
- `disabled`: boolean - Disable input
- `placeholder`: string - Input placeholder
- `multiline`: boolean - Enable multiline textarea
- `supportFiles`: boolean - Enable file attachments
- `supportVoice`: boolean - Enable voice recording

### FlowTester.tsx

Comprehensive testing component with configuration options.

**Features:**

- Test input and execution
- Real-time test monitoring
- Configuration panel (timeout, retries, etc.)
- Test logs with filtering
- Test history tracking
- Performance metrics
- Compact mode for embedded usage

**Props:**

- `flow`: FlowiseFlow - The flow to test
- `onTestResult`: (result: TestResult) => void - Callback for test results
- `onFlowUpdate`: (flow: FlowiseFlow) => void - Callback for flow updates
- `compact`: boolean - Enable compact mode
- `className`: string - Additional CSS classes

### ChatTestingExample.tsx

Complete example showing how to use all components together.

**Features:**

- Tabbed interface (Chat, Tester, Results)
- Test results aggregation
- Performance statistics
- Results history
- Integration example

## Usage

```tsx
import { ChatInterface, FlowTester, ChatTestingExample } from '@/components/testing'

// Basic chat interface
<ChatInterface
  flow={flowData}
  onTestResult={handleTestResult}
  onFlowUpdate={handleFlowUpdate}
/>

// Standalone tester
<FlowTester
  flow={flowData}
  onTestResult={handleTestResult}
  compact={true}
/>

// Complete testing environment
<ChatTestingExample flow={flowData} />
```

## Key Features

### Vercel AI SDK Patterns

- Streaming responses simulation
- Real-time updates
- Proper error handling
- TypeScript integration
- React hooks patterns

### Interactive Testing

- Live chat interface
- Real-time test execution
- Visual feedback
- Test result tracking
- Performance monitoring

### Accessibility

- Keyboard navigation
- Screen reader support
- High contrast mode
- Focus management
- ARIA labels

### Performance

- Optimized re-renders
- Lazy loading
- Memory management
- Efficient state updates
- Debounced inputs

## Dependencies

- React 18+
- TypeScript
- Tailwind CSS
- Radix UI components
- Lucide React icons
- Date-fns for formatting

## Testing

Components include comprehensive test coverage:

- Unit tests for individual components
- Integration tests for component interaction
- E2E tests for full workflows
- Performance tests for optimization

## Contributing

When adding new features:

1. Follow existing TypeScript patterns
2. Include proper prop types
3. Add accessibility features
4. Include loading states
5. Handle error cases
6. Add tests for new functionality

## Architecture

```
testing/
├── ChatInterface.tsx      # Main chat component
├── MessageBubble.tsx      # Message display
├── ChatInput.tsx          # Input component
├── FlowTester.tsx         # Test execution
├── ChatTestingExample.tsx # Usage example
├── index.ts               # Exports
└── README.md             # Documentation
```

The components follow a modular architecture where each component has a single responsibility and can be composed together for complex testing scenarios.
