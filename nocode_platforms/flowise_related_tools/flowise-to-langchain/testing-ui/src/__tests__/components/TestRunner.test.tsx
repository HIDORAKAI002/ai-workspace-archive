import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { TestRunner } from '@/components/testing/TestRunner'
import { mockFlowiseFlow, mockTestResult, mockTestConfiguration } from '../mocks/data'

// Mock the API hooks
jest.mock('@/hooks/useApi', () => ({
  useApiMutation: jest.fn(),
  useApiQuery: jest.fn(),
}))

// Mock WebSocket
const mockWebSocket = {
  send: jest.fn(),
  close: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  readyState: WebSocket.OPEN,
}

global.WebSocket = jest.fn(() => mockWebSocket) as any

const { useApiMutation, useApiQuery } = require('@/hooks/useApi')

describe('TestRunner', () => {
  const mockMutate = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
      data: null,
    })
    useApiQuery.mockReturnValue({
      data: [mockTestConfiguration],
      isLoading: false,
      error: null,
    })
  })

  it('renders test runner interface', () => {
    render(<TestRunner flow={mockFlowiseFlow} />)

    expect(screen.getByText('Test Runner')).toBeInTheDocument()
    expect(screen.getByText('Test Configuration')).toBeInTheDocument()
    expect(screen.getByText('Run Tests')).toBeInTheDocument()
  })

  it('loads available test configurations', async () => {
    render(<TestRunner flow={mockFlowiseFlow} />)

    await waitFor(() => {
      expect(screen.getByText('Standard Test Configuration')).toBeInTheDocument()
    })
  })

  it('handles test configuration selection', async () => {
    const user = userEvent.setup()
    render(<TestRunner flow={mockFlowiseFlow} />)

    await waitFor(() => {
      const configSelect = screen.getByTestId('test-config-select')
      fireEvent.change(configSelect, { target: { value: 'test-config-1' } })
    })

    expect(screen.getByText('Timeout: 30000ms')).toBeInTheDocument()
    expect(screen.getByText('Retries: 3')).toBeInTheDocument()
  })

  it('validates test configuration before running', async () => {
    const user = userEvent.setup()
    render(<TestRunner flow={mockFlowiseFlow} />)

    const runButton = screen.getByText('Run Tests')
    await user.click(runButton)

    expect(screen.getByText('Please select a test configuration')).toBeInTheDocument()
  })

  it('starts test execution with valid configuration', async () => {
    const user = userEvent.setup()
    render(<TestRunner flow={mockFlowiseFlow} />)

    // Select configuration
    await waitFor(() => {
      const configSelect = screen.getByTestId('test-config-select')
      fireEvent.change(configSelect, { target: { value: 'test-config-1' } })
    })

    const runButton = screen.getByText('Run Tests')
    await user.click(runButton)

    expect(mockMutate).toHaveBeenCalledWith({
      flowData: mockFlowiseFlow,
      testConfig: expect.any(Object),
    })
  })

  it('shows loading state during test execution', () => {
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: true,
      error: null,
      data: null,
    })

    render(<TestRunner flow={mockFlowiseFlow} />)

    expect(screen.getByText('Running Tests...')).toBeInTheDocument()
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument()
  })

  it('displays test results when completed', () => {
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
      data: mockTestResult,
    })

    render(<TestRunner flow={mockFlowiseFlow} />)

    expect(screen.getByText('Test Results')).toBeInTheDocument()
    expect(screen.getByText('Status: passed')).toBeInTheDocument()
    expect(screen.getByText('Duration: 2.5s')).toBeInTheDocument()
    expect(screen.getByText('Passed: 5/5')).toBeInTheDocument()
  })

  it('handles test execution errors', () => {
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: new Error('Test execution failed'),
      data: null,
    })

    render(<TestRunner flow={mockFlowiseFlow} />)

    expect(screen.getByText('Test Error')).toBeInTheDocument()
    expect(screen.getByText('Test execution failed')).toBeInTheDocument()
  })

  it('shows real-time test progress via WebSocket', async () => {
    render(<TestRunner flow={mockFlowiseFlow} />)

    // Simulate WebSocket connection
    expect(global.WebSocket).toHaveBeenCalled()

    // Simulate receiving progress update
    const messageHandler = mockWebSocket.addEventListener.mock.calls.find(
      call => call[0] === 'message'
    )?.[1]

    if (messageHandler) {
      messageHandler({
        data: JSON.stringify({
          type: 'progress',
          data: {
            currentTest: 'Basic Query Test',
            progress: 50,
            status: 'running'
          }
        })
      })
    }

    await waitFor(() => {
      expect(screen.getByText('Running: Basic Query Test')).toBeInTheDocument()
      expect(screen.getByText('50%')).toBeInTheDocument()
    })
  })

  it('allows viewing detailed test logs', async () => {
    const user = userEvent.setup()
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
      data: mockTestResult,
    })

    render(<TestRunner flow={mockFlowiseFlow} />)

    const viewLogsButton = screen.getByText('View Logs')
    await user.click(viewLogsButton)

    expect(screen.getByText('Test Logs')).toBeInTheDocument()
    expect(screen.getByText('Starting test execution')).toBeInTheDocument()
    expect(screen.getByText('Flow validation passed')).toBeInTheDocument()
  })

  it('supports test retry functionality', async () => {
    const user = userEvent.setup()
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: new Error('Test failed'),
      data: null,
    })

    render(<TestRunner flow={mockFlowiseFlow} />)

    const retryButton = screen.getByText('Retry Tests')
    await user.click(retryButton)

    expect(mockMutate).toHaveBeenCalledTimes(2)
  })

  it('handles test cancellation', async () => {
    const user = userEvent.setup()
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: true,
      error: null,
      data: null,
    })

    render(<TestRunner flow={mockFlowiseFlow} />)

    const cancelButton = screen.getByText('Cancel Tests')
    await user.click(cancelButton)

    expect(mockWebSocket.send).toHaveBeenCalledWith(
      JSON.stringify({ type: 'cancel' })
    )
  })
})