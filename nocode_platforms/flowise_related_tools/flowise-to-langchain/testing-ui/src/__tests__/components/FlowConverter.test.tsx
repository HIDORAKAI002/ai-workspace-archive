import { render, screen, fireEvent, waitFor } from '../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { FlowConverter } from '@/components/conversion/FlowConverter'
import { mockFlowiseFlow, mockConversionResult } from '../mocks/data'

// Mock the API hooks
jest.mock('@/hooks/useApi', () => ({
  useApiMutation: jest.fn(),
}))

// Mock file reader
const mockFileReader = {
  readAsText: jest.fn(),
  result: JSON.stringify(mockFlowiseFlow),
  onload: null,
  onerror: null,
}

global.FileReader = jest.fn(() => mockFileReader) as any

const { useApiMutation } = require('@/hooks/useApi')

describe('FlowConverter', () => {
  const mockMutate = jest.fn()
  
  beforeEach(() => {
    jest.clearAllMocks()
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
      data: null,
    })
  })

  it('renders flow converter interface', () => {
    render(<FlowConverter />)

    expect(screen.getByText('Flow Converter')).toBeInTheDocument()
    expect(screen.getByText('Upload Flowise Flow')).toBeInTheDocument()
    expect(screen.getByText('Drop your Flowise JSON file here or click to browse')).toBeInTheDocument()
  })

  it('handles file upload', async () => {
    const user = userEvent.setup()
    render(<FlowConverter />)

    const file = new File([JSON.stringify(mockFlowiseFlow)], 'test-flow.json', {
      type: 'application/json',
    })

    const fileInput = screen.getByTestId('file-upload-input')
    await user.upload(fileInput, file)

    // Simulate FileReader onload
    mockFileReader.onload({ target: { result: JSON.stringify(mockFlowiseFlow) } } as any)

    await waitFor(() => {
      expect(screen.getByText('Test OpenAI Chat Flow')).toBeInTheDocument()
      expect(screen.getByText('Convert to LangChain')).toBeInTheDocument()
    })
  })

  it('validates uploaded JSON file', async () => {
    const user = userEvent.setup()
    render(<FlowConverter />)

    const invalidFile = new File(['invalid json'], 'invalid.json', {
      type: 'application/json',
    })

    const fileInput = screen.getByTestId('file-upload-input')
    await user.upload(fileInput, invalidFile)

    // Simulate FileReader onload with invalid JSON
    mockFileReader.onload({ target: { result: 'invalid json' } } as any)

    await waitFor(() => {
      expect(screen.getByText('Invalid JSON file')).toBeInTheDocument()
    })
  })

  it('shows conversion settings', async () => {
    const user = userEvent.setup()
    render(<FlowConverter />)

    const file = new File([JSON.stringify(mockFlowiseFlow)], 'test-flow.json', {
      type: 'application/json',
    })

    const fileInput = screen.getByTestId('file-upload-input')
    await user.upload(fileInput, file)

    mockFileReader.onload({ target: { result: JSON.stringify(mockFlowiseFlow) } } as any)

    await waitFor(() => {
      expect(screen.getByText('Conversion Settings')).toBeInTheDocument()
      expect(screen.getByText('Output Format')).toBeInTheDocument()
      expect(screen.getByText('Include LangFuse')).toBeInTheDocument()
    })
  })

  it('handles conversion submission', async () => {
    const user = userEvent.setup()
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
      data: mockConversionResult,
    })

    render(<FlowConverter />)

    const file = new File([JSON.stringify(mockFlowiseFlow)], 'test-flow.json', {
      type: 'application/json',
    })

    const fileInput = screen.getByTestId('file-upload-input')
    await user.upload(fileInput, file)

    mockFileReader.onload({ target: { result: JSON.stringify(mockFlowiseFlow) } } as any)

    await waitFor(() => {
      const convertButton = screen.getByText('Convert to LangChain')
      fireEvent.click(convertButton)
    })

    expect(mockMutate).toHaveBeenCalledWith({
      flowData: mockFlowiseFlow,
      settings: expect.any(Object),
    })
  })

  it('shows loading state during conversion', () => {
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: true,
      error: null,
      data: null,
    })

    render(<FlowConverter />)

    expect(screen.getByText('Converting...')).toBeInTheDocument()
  })

  it('displays conversion results', () => {
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
      data: mockConversionResult,
    })

    render(<FlowConverter />)

    expect(screen.getByText('Conversion Results')).toBeInTheDocument()
    expect(screen.getByText('Generated Code')).toBeInTheDocument()
    expect(screen.getByText('Download Code')).toBeInTheDocument()
  })

  it('handles conversion errors', () => {
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: new Error('Conversion failed'),
      data: null,
    })

    render(<FlowConverter />)

    expect(screen.getByText('Conversion Error')).toBeInTheDocument()
    expect(screen.getByText('Conversion failed')).toBeInTheDocument()
  })

  it('allows downloading generated code', async () => {
    const user = userEvent.setup()
    useApiMutation.mockReturnValue({
      mutate: mockMutate,
      isLoading: false,
      error: null,
      data: mockConversionResult,
    })

    // Mock URL.createObjectURL
    global.URL.createObjectURL = jest.fn(() => 'blob:url')
    global.URL.revokeObjectURL = jest.fn()

    render(<FlowConverter />)

    const downloadButton = screen.getByText('Download Code')
    await user.click(downloadButton)

    expect(global.URL.createObjectURL).toHaveBeenCalled()
  })
})