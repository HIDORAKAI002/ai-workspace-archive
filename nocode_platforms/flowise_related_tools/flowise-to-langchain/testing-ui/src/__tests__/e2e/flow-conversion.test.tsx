import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { App } from '@/components/App'
import { mockFlowiseFlow, mockConversionResult, mockTestResult } from '../mocks/data'

// Mock all API calls
jest.mock('@/hooks/useApi', () => ({
  useApiQuery: jest.fn(),
  useApiMutation: jest.fn(),
}))

// Mock file operations
const mockFileReader = {
  readAsText: jest.fn(),
  result: JSON.stringify(mockFlowiseFlow),
  onload: null,
  onerror: null,
}

global.FileReader = jest.fn(() => mockFileReader) as any
global.URL.createObjectURL = jest.fn(() => 'blob:url')
global.URL.revokeObjectURL = jest.fn()

// Mock download functionality
const mockLink = {
  click: jest.fn(),
  download: '',
  href: '',
}

jest.spyOn(document, 'createElement').mockImplementation((tagName) => {
  if (tagName === 'a') {
    return mockLink as any
  }
  return document.createElement(tagName)
})

const { useApiQuery, useApiMutation } = require('@/hooks/useApi')

describe('E2E: Complete Flow Conversion Workflow', () => {
  const mockConvertMutate = jest.fn()
  const mockTestMutate = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Default API query mock (for dashboard, etc.)
    useApiQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: null,
    })

    // Default API mutation mocks
    useApiMutation
      .mockReturnValueOnce({
        mutate: mockConvertMutate,
        isLoading: false,
        error: null,
        data: null,
      })
      .mockReturnValueOnce({
        mutate: mockTestMutate,
        isLoading: false,
        error: null,
        data: null,
      })
  })

  it('completes full flow conversion and testing workflow', async () => {
    const user = userEvent.setup()

    render(<App />)

    // Step 1: Navigate to Flow Converter
    await waitFor(() => {
      expect(screen.getByText('Flowise Converter')).toBeInTheDocument()
    })

    const converterTab = screen.getByText('Converter')
    await user.click(converterTab)

    // Step 2: Upload a Flowise flow file
    const file = new File([JSON.stringify(mockFlowiseFlow)], 'test-flow.json', {
      type: 'application/json',
    })

    const fileInput = screen.getByTestId('file-upload-input')
    await user.upload(fileInput, file)

    // Simulate successful file reading
    mockFileReader.onload({ target: { result: JSON.stringify(mockFlowiseFlow) } } as any)

    await waitFor(() => {
      expect(screen.getByText('Test OpenAI Chat Flow')).toBeInTheDocument()
      expect(screen.getByText('Flow loaded successfully')).toBeInTheDocument()
    })

    // Step 3: Configure conversion settings
    expect(screen.getByText('Conversion Settings')).toBeInTheDocument()

    // Change output format to TypeScript (should be default)
    const formatSelect = screen.getByDisplayValue('typescript')
    expect(formatSelect).toBeInTheDocument()

    // Enable LangFuse integration
    const langfuseCheckbox = screen.getByLabelText('Include LangFuse integration')
    await user.click(langfuseCheckbox)

    // Step 4: Start conversion
    useApiMutation.mockReturnValueOnce({
      mutate: mockConvertMutate,
      isLoading: true,
      error: null,
      data: null,
    })

    const convertButton = screen.getByText('Convert to LangChain')
    await user.click(convertButton)

    // Verify conversion request
    expect(mockConvertMutate).toHaveBeenCalledWith({
      flowData: mockFlowiseFlow,
      settings: expect.objectContaining({
        outputFormat: 'typescript',
        withLangfuse: true,
      }),
    })

    // Step 5: Show conversion in progress
    expect(screen.getByText('Converting...')).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()

    // Step 6: Show conversion results
    useApiMutation.mockReturnValueOnce({
      mutate: mockConvertMutate,
      isLoading: false,
      error: null,
      data: mockConversionResult,
    })

    // Re-render with results
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Conversion Results')).toBeInTheDocument()
      expect(screen.getByText('Generated Code')).toBeInTheDocument()
      expect(screen.getByText('Success')).toBeInTheDocument()
    })

    // Step 7: Download generated code
    const downloadButton = screen.getByText('Download Code')
    await user.click(downloadButton)

    expect(global.URL.createObjectURL).toHaveBeenCalled()
    expect(mockLink.click).toHaveBeenCalled()

    // Step 8: Navigate to test runner
    const testTab = screen.getByText('Test')
    await user.click(testTab)

    expect(screen.getByText('Test Runner')).toBeInTheDocument()

    // Step 9: Configure and run tests
    const testConfigSelect = screen.getByTestId('test-config-select')
    fireEvent.change(testConfigSelect, { target: { value: 'test-config-1' } })

    await waitFor(() => {
      expect(screen.getByText('Standard Test Configuration')).toBeInTheDocument()
    })

    // Step 10: Start test execution
    useApiMutation.mockReturnValueOnce({
      mutate: mockTestMutate,
      isLoading: true,
      error: null,
      data: null,
    })

    const runTestButton = screen.getByText('Run Tests')
    await user.click(runTestButton)

    expect(mockTestMutate).toHaveBeenCalledWith({
      flowData: mockFlowiseFlow,
      testConfig: expect.any(Object),
    })

    // Step 11: Show test execution in progress
    expect(screen.getByText('Running Tests...')).toBeInTheDocument()

    // Step 12: Show test results
    useApiMutation.mockReturnValueOnce({
      mutate: mockTestMutate,
      isLoading: false,
      error: null,
      data: mockTestResult,
    })

    // Re-render with test results
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Test Results')).toBeInTheDocument()
      expect(screen.getByText('Status: passed')).toBeInTheDocument()
      expect(screen.getByText('Passed: 5/5')).toBeInTheDocument()
    })

    // Step 13: View detailed test logs
    const viewLogsButton = screen.getByText('View Logs')
    await user.click(viewLogsButton)

    expect(screen.getByText('Test Logs')).toBeInTheDocument()
    expect(screen.getByText('Starting test execution')).toBeInTheDocument()

    // Step 14: Navigate to results dashboard
    const resultsTab = screen.getByText('Results')
    await user.click(resultsTab)

    expect(screen.getByText('Test Results')).toBeInTheDocument()
    expect(screen.getByText('Conversion History')).toBeInTheDocument()
  })

  it('handles errors gracefully during workflow', async () => {
    const user = userEvent.setup()

    render(<App />)

    // Navigate to converter
    const converterTab = screen.getByText('Converter')
    await user.click(converterTab)

    // Upload invalid file
    const invalidFile = new File(['invalid json'], 'invalid.json', {
      type: 'application/json',
    })

    const fileInput = screen.getByTestId('file-upload-input')
    await user.upload(fileInput, invalidFile)

    // Simulate file reading error
    mockFileReader.onload({ target: { result: 'invalid json' } } as any)

    await waitFor(() => {
      expect(screen.getByText('Invalid JSON file')).toBeInTheDocument()
      expect(screen.getByText('Please upload a valid Flowise JSON export')).toBeInTheDocument()
    })

    // Try again with valid file
    const validFile = new File([JSON.stringify(mockFlowiseFlow)], 'valid-flow.json', {
      type: 'application/json',
    })

    await user.upload(fileInput, validFile)
    mockFileReader.onload({ target: { result: JSON.stringify(mockFlowiseFlow) } } as any)

    await waitFor(() => {
      expect(screen.getByText('Test OpenAI Chat Flow')).toBeInTheDocument()
    })

    // Simulate conversion error
    useApiMutation.mockReturnValueOnce({
      mutate: mockConvertMutate,
      isLoading: false,
      error: new Error('Conversion failed: Invalid node configuration'),
      data: null,
    })

    const convertButton = screen.getByText('Convert to LangChain')
    await user.click(convertButton)

    await waitFor(() => {
      expect(screen.getByText('Conversion Error')).toBeInTheDocument()
      expect(screen.getByText('Conversion failed: Invalid node configuration')).toBeInTheDocument()
    })

    // Show retry option
    expect(screen.getByText('Retry Conversion')).toBeInTheDocument()
  })

  it('supports workflow with different file formats and settings', async () => {
    const user = userEvent.setup()

    render(<App />)

    const converterTab = screen.getByText('Converter')
    await user.click(converterTab)

    // Upload flow file
    const file = new File([JSON.stringify(mockFlowiseFlow)], 'complex-flow.json', {
      type: 'application/json',
    })

    const fileInput = screen.getByTestId('file-upload-input')
    await user.upload(fileInput, file)

    mockFileReader.onload({ target: { result: JSON.stringify(mockFlowiseFlow) } } as any)

    await waitFor(() => {
      expect(screen.getByText('Test OpenAI Chat Flow')).toBeInTheDocument()
    })

    // Configure advanced settings
    const advancedToggle = screen.getByText('Advanced Settings')
    await user.click(advancedToggle)

    // Change module format
    const moduleSelect = screen.getByDisplayValue('esm')
    await user.selectOptions(moduleSelect, 'commonjs')

    // Disable comments
    const commentsCheckbox = screen.getByLabelText('Include explanatory comments')
    await user.click(commentsCheckbox)

    // Set optimization level
    const optimizationSelect = screen.getByLabelText('Optimization Level')
    await user.selectOptions(optimizationSelect, 'aggressive')

    // Start conversion with advanced settings
    useApiMutation.mockReturnValueOnce({
      mutate: mockConvertMutate,
      isLoading: false,
      error: null,
      data: mockConversionResult,
    })

    const convertButton = screen.getByText('Convert to LangChain')
    await user.click(convertButton)

    expect(mockConvertMutate).toHaveBeenCalledWith({
      flowData: mockFlowiseFlow,
      settings: expect.objectContaining({
        format: 'commonjs',
        includeComments: false,
        optimization: 'aggressive',
      }),
    })
  })
})