import { render, screen, waitFor } from '../utils/test-utils'
import { Dashboard } from '@/components/Dashboard'
import { mockAnalyticsData, mockTestResult, mockConversionResult } from '../mocks/data'

// Mock the API hooks
jest.mock('@/hooks/useApi', () => ({
  useApiQuery: jest.fn(),
}))

// Mock the recharts library
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div data-testid="responsive-container">{children}</div>,
  LineChart: ({ children }: any) => <div data-testid="line-chart">{children}</div>,
  Line: () => <div data-testid="line" />,
  XAxis: () => <div data-testid="x-axis" />,
  YAxis: () => <div data-testid="y-axis" />,
  CartesianGrid: () => <div data-testid="cartesian-grid" />,
  Tooltip: () => <div data-testid="tooltip" />,
  BarChart: ({ children }: any) => <div data-testid="bar-chart">{children}</div>,
  Bar: () => <div data-testid="bar" />,
}))

const { useApiQuery } = require('@/hooks/useApi')

describe('Dashboard', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders dashboard with loading state', () => {
    useApiQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    render(<Dashboard />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Loading dashboard data...')).toBeInTheDocument()
  })

  it('renders dashboard with analytics data', async () => {
    useApiQuery.mockReturnValue({
      data: mockAnalyticsData,
      isLoading: false,
      error: null,
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Dashboard')).toBeInTheDocument()
      expect(screen.getByText('156')).toBeInTheDocument() // Total conversions
      expect(screen.getByText('91.0%')).toBeInTheDocument() // Success rate
      expect(screen.getByText('89')).toBeInTheDocument() // Total tests
    })
  })

  it('renders error state when API fails', async () => {
    useApiQuery.mockReturnValue({
      data: null,
      isLoading: false,
      error: new Error('Failed to fetch analytics'),
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Error loading dashboard data')).toBeInTheDocument()
      expect(screen.getByText('Failed to fetch analytics')).toBeInTheDocument()
    })
  })

  it('displays quick action buttons', async () => {
    useApiQuery.mockReturnValue({
      data: mockAnalyticsData,
      isLoading: false,
      error: null,
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('New Conversion')).toBeInTheDocument()
      expect(screen.getByText('Run Test')).toBeInTheDocument()
      expect(screen.getByText('View Results')).toBeInTheDocument()
    })
  })

  it('shows performance metrics cards', async () => {
    useApiQuery.mockReturnValue({
      data: mockAnalyticsData,
      isLoading: false,
      error: null,
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Avg Conversion Time')).toBeInTheDocument()
      expect(screen.getByText('2.3s')).toBeInTheDocument()
      expect(screen.getByText('System Uptime')).toBeInTheDocument()
      expect(screen.getByText('99.2%')).toBeInTheDocument()
    })
  })

  it('displays recent activity section', async () => {
    useApiQuery.mockReturnValue({
      data: mockAnalyticsData,
      isLoading: false,
      error: null,
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByText('Recent Activity')).toBeInTheDocument()
    })
  })

  it('renders charts when data is available', async () => {
    useApiQuery.mockReturnValue({
      data: mockAnalyticsData,
      isLoading: false,
      error: null,
    })

    render(<Dashboard />)

    await waitFor(() => {
      expect(screen.getByTestId('responsive-container')).toBeInTheDocument()
      expect(screen.getByTestId('line-chart')).toBeInTheDocument()
    })
  })
})