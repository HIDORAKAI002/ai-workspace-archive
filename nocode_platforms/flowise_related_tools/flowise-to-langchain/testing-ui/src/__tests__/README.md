# Test Suite Documentation

This directory contains a comprehensive test suite for the Flowise Converter frontend application.

## 📁 Test Structure

```
src/__tests__/
├── utils/
│   └── test-utils.tsx          # Custom render function with providers
├── mocks/
│   └── data.ts                 # Mock data and API responses
├── components/
│   ├── Dashboard.test.tsx      # Dashboard component tests
│   ├── FlowConverter.test.tsx  # Flow converter tests
│   ├── TestRunner.test.tsx     # Test runner tests
│   └── forms/
│       └── ConversionSettings.test.tsx  # Form component tests
├── api/
│   └── api-integration.test.tsx # API integration tests
├── e2e/
│   └── flow-conversion.test.tsx # End-to-end workflow tests
├── accessibility/
│   └── a11y.test.tsx           # Accessibility compliance tests
└── README.md                   # This file
```

## 🧪 Test Categories

### 1. Unit Tests (`/components/`)

Tests individual React components in isolation.

**Coverage:**
- ✅ Dashboard component with analytics data
- ✅ FlowConverter with file upload and conversion
- ✅ TestRunner with test execution workflows
- ✅ Form components with validation

**Run with:**
```bash
npm run test:unit
```

**Key Features:**
- Mock API responses and hooks
- Test user interactions
- Validate component state changes
- Error handling scenarios

### 2. Integration Tests (`/api/`)

Tests API integration and data flow between frontend and backend.

**Coverage:**
- ✅ API query hooks (useApiQuery)
- ✅ API mutation hooks (useApiMutation)
- ✅ Error handling and retry logic
- ✅ Request/response interceptors
- ✅ Authentication and authorization

**Run with:**
```bash
npm run test:integration
```

**Key Features:**
- Mock axios HTTP client
- Test API endpoint interactions
- Validate request/response handling
- Network error scenarios

### 3. End-to-End Tests (`/e2e/`)

Tests complete user workflows from start to finish.

**Coverage:**
- ✅ Full flow conversion workflow
- ✅ File upload → settings → conversion → download
- ✅ Test execution workflow
- ✅ Error recovery scenarios
- ✅ Multi-step form interactions

**Run with:**
```bash
npm run test:e2e
```

**Key Features:**
- Simulate real user interactions
- Test complete application flows
- Validate cross-component communication
- Error handling and recovery

### 4. Accessibility Tests (`/accessibility/`)

Tests compliance with web accessibility standards (WCAG).

**Coverage:**
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Color contrast
- ✅ Screen reader compatibility
- ✅ Focus management

**Run with:**
```bash
npm run test:a11y
```

**Key Features:**
- Uses jest-axe for automated a11y testing
- Validates WCAG 2.1 AA compliance
- Tests keyboard navigation
- Checks semantic HTML structure

## 🔧 Test Utilities

### Custom Render Function

```typescript
// src/__tests__/utils/test-utils.tsx
import { render } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'

const AllTheProviders = ({ children }) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
    </ThemeProvider>
  </QueryClientProvider>
)

const customRender = (ui, options) => 
  render(ui, { wrapper: AllTheProviders, ...options })

export { customRender as render }
```

### Mock Data

```typescript
// src/__tests__/mocks/data.ts
export const mockFlowiseFlow = {
  id: 'test-flow-1',
  name: 'Test OpenAI Chat Flow',
  nodes: [...],
  edges: [...]
}

export const mockConversionResult = {
  id: 'conversion-1',
  status: 'success',
  generatedCode: '...',
  dependencies: [...]
}
```

## 📊 Coverage Requirements

The test suite maintains high coverage standards:

```javascript
// jest.config.js
coverageThreshold: {
  global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80,
  },
}
```

### Current Coverage Targets

- **Branches**: 80%+ conditional logic coverage
- **Functions**: 80%+ function call coverage  
- **Lines**: 80%+ code line coverage
- **Statements**: 80%+ statement execution coverage

## 🚀 Running Tests

### All Tests
```bash
npm test                    # Run all tests
npm run test:watch          # Run tests in watch mode
npm run test:coverage       # Run with coverage report
npm run test:ci             # Run in CI mode (no watch)
```

### Specific Test Types
```bash
npm run test:unit           # Unit tests only
npm run test:integration    # Integration tests only
npm run test:e2e           # End-to-end tests only
npm run test:a11y          # Accessibility tests only
```

### Debugging Tests
```bash
npm run test:watch          # Watch mode for development
npm test -- --verbose       # Detailed test output
npm test -- --debug         # Debug mode
npm test -- Dashboard       # Run specific test file
```

## 🔍 Test Patterns

### 1. Component Testing Pattern

```typescript
import { render, screen, fireEvent } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { MyComponent } from '@/components/MyComponent'

describe('MyComponent', () => {
  it('renders with default props', () => {
    render(<MyComponent />)
    expect(screen.getByText('Expected Text')).toBeInTheDocument()
  })

  it('handles user interactions', async () => {
    const user = userEvent.setup()
    const mockCallback = jest.fn()
    
    render(<MyComponent onAction={mockCallback} />)
    
    const button = screen.getByRole('button')
    await user.click(button)
    
    expect(mockCallback).toHaveBeenCalledWith(expectedArgs)
  })
})
```

### 2. API Testing Pattern

```typescript
import { renderHook, waitFor } from '../utils/test-utils'
import { useApiQuery } from '@/hooks/useApi'

describe('useApiQuery', () => {
  it('fetches data successfully', async () => {
    mockAxios.get.mockResolvedValueOnce({ data: mockData })
    
    const { result } = renderHook(() => useApiQuery(['key'], '/endpoint'))
    
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false)
    })
    
    expect(result.current.data).toEqual(mockData)
  })
})
```

### 3. E2E Testing Pattern

```typescript
import { render, screen } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { App } from '@/components/App'

describe('E2E: Flow Conversion', () => {
  it('completes full conversion workflow', async () => {
    const user = userEvent.setup()
    render(<App />)
    
    // Step 1: Upload file
    const fileInput = screen.getByTestId('file-upload')
    await user.upload(fileInput, mockFile)
    
    // Step 2: Configure settings
    const settingsForm = screen.getByTestId('conversion-settings')
    // ... configure settings
    
    // Step 3: Convert
    const convertButton = screen.getByText('Convert')
    await user.click(convertButton)
    
    // Step 4: Verify results
    await waitFor(() => {
      expect(screen.getByText('Conversion Success')).toBeInTheDocument()
    })
  })
})
```

## 🐛 Debugging Failed Tests

### Common Issues and Solutions

1. **Async Test Failures**
   ```typescript
   // ❌ Wrong - not waiting for async operation
   it('loads data', () => {
     render(<Component />)
     expect(screen.getByText('Data')).toBeInTheDocument()
   })
   
   // ✅ Correct - using waitFor
   it('loads data', async () => {
     render(<Component />)
     await waitFor(() => {
       expect(screen.getByText('Data')).toBeInTheDocument()
     })
   })
   ```

2. **Mock Issues**
   ```typescript
   // Clear mocks between tests
   beforeEach(() => {
     jest.clearAllMocks()
   })
   ```

3. **Provider Issues**
   ```typescript
   // Always use custom render with providers
   import { render } from '../utils/test-utils'  // ✅ Custom render
   // import { render } from '@testing-library/react'  // ❌ Missing providers
   ```

## 📈 Continuous Integration

Tests run automatically on:
- Pull requests to main/develop branches
- Pushes to main/develop branches
- Manual workflow dispatch

### CI Pipeline

1. **Install Dependencies** → Install npm packages
2. **Lint Code** → ESLint + TypeScript checks  
3. **Unit Tests** → Component tests
4. **Integration Tests** → API tests
5. **E2E Tests** → Workflow tests
6. **Accessibility Tests** → a11y compliance
7. **Coverage Report** → Upload to Codecov
8. **Build** → Create production build
9. **Docker** → Build and test container

## 🎯 Best Practices

### Writing Tests

1. **Test Behavior, Not Implementation**
   ```typescript
   // ❌ Testing implementation details
   expect(component.state.count).toBe(1)
   
   // ✅ Testing user-visible behavior
   expect(screen.getByText('Count: 1')).toBeInTheDocument()
   ```

2. **Use Descriptive Test Names**
   ```typescript
   // ❌ Vague test name
   it('works correctly', () => { ... })
   
   // ✅ Descriptive test name
   it('displays error message when file upload fails', () => { ... })
   ```

3. **Follow AAA Pattern**
   ```typescript
   it('should do something', () => {
     // Arrange
     const props = { ... }
     
     // Act
     render(<Component {...props} />)
     fireEvent.click(screen.getByRole('button'))
     
     // Assert
     expect(screen.getByText('Result')).toBeInTheDocument()
   })
   ```

### Maintaining Tests

1. **Keep Tests Independent**
2. **Mock External Dependencies**
3. **Test Edge Cases and Error Scenarios**
4. **Update Tests When Features Change**
5. **Review Test Coverage Regularly**

## 📚 Resources

- [Testing Library Documentation](https://testing-library.com/)
- [Jest Documentation](https://jestjs.io/)
- [Jest Axe Documentation](https://github.com/nickcolley/jest-axe)
- [React Testing Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)