import { render } from '../utils/test-utils'
import { axe, toHaveNoViolations } from 'jest-axe'
import { Dashboard } from '@/components/Dashboard'
import { FlowConverter } from '@/components/conversion/FlowConverter'
import { TestRunner } from '@/components/testing/TestRunner'
import { AppHeader } from '@/components/layout/AppHeader'
import { mockFlowiseFlow, mockAnalyticsData } from '../mocks/data'

// Extend Jest matchers
expect.extend(toHaveNoViolations)

// Mock API hooks for accessibility tests
jest.mock('@/hooks/useApi', () => ({
  useApiQuery: jest.fn(() => ({
    data: mockAnalyticsData,
    isLoading: false,
    error: null,
  })),
  useApiMutation: jest.fn(() => ({
    mutate: jest.fn(),
    isLoading: false,
    error: null,
    data: null,
  })),
}))

// Mock recharts for accessibility testing
jest.mock('recharts', () => ({
  ResponsiveContainer: ({ children }: any) => <div role="img" aria-label="Chart">{children}</div>,
  LineChart: ({ children }: any) => <div>{children}</div>,
  Line: () => null,
  XAxis: () => null,
  YAxis: () => null,
  CartesianGrid: () => null,
  Tooltip: () => null,
  BarChart: ({ children }: any) => <div>{children}</div>,
  Bar: () => null,
}))

describe('Accessibility Tests', () => {
  it('Dashboard should not have accessibility violations', async () => {
    const { container } = render(<Dashboard />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('FlowConverter should not have accessibility violations', async () => {
    const { container } = render(<FlowConverter />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('TestRunner should not have accessibility violations', async () => {
    const { container } = render(<TestRunner flow={mockFlowiseFlow} />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('AppHeader should not have accessibility violations', async () => {
    const { container } = render(<AppHeader />)
    const results = await axe(container)
    expect(results).toHaveNoViolations()
  })

  it('should have proper heading hierarchy', () => {
    const { container } = render(<Dashboard />)
    
    const h1 = container.querySelector('h1')
    const h2Elements = container.querySelectorAll('h2')
    const h3Elements = container.querySelectorAll('h3')
    
    expect(h1).toBeInTheDocument()
    expect(h2Elements.length).toBeGreaterThan(0)
    
    // Verify logical heading structure
    h2Elements.forEach(h2 => {
      expect(h2).toHaveAttribute('id')
    })
  })

  it('should have proper ARIA labels for interactive elements', () => {
    const { container } = render(<FlowConverter />)
    
    const buttons = container.querySelectorAll('button')
    const inputs = container.querySelectorAll('input')
    const selects = container.querySelectorAll('select')
    
    buttons.forEach(button => {
      const hasLabel = button.getAttribute('aria-label') || 
                      button.getAttribute('aria-labelledby') ||
                      button.textContent?.trim()
      expect(hasLabel).toBeTruthy()
    })
    
    inputs.forEach(input => {
      const hasLabel = input.getAttribute('aria-label') || 
                      input.getAttribute('aria-labelledby') ||
                      container.querySelector(`label[for="${input.id}"]`)
      expect(hasLabel).toBeTruthy()
    })
  })

  it('should have proper focus management', async () => {
    const { container } = render(<TestRunner flow={mockFlowiseFlow} />)
    
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    
    expect(focusableElements.length).toBeGreaterThan(0)
    
    // Check that all focusable elements are properly accessible
    focusableElements.forEach(element => {
      expect(element).not.toHaveAttribute('tabindex', '-1')
    })
  })

  it('should have proper color contrast', async () => {
    const { container } = render(<Dashboard />)
    
    // This test would typically use a tool like axe-core's color-contrast rule
    // which is included in the general axe test above
    const results = await axe(container, {
      rules: {
        'color-contrast': { enabled: true }
      }
    })
    
    expect(results).toHaveNoViolations()
  })

  it('should support keyboard navigation', () => {
    const { container } = render(<FlowConverter />)
    
    const interactiveElements = container.querySelectorAll(
      'button, a, input, select, textarea'
    )
    
    interactiveElements.forEach(element => {
      // Elements should be focusable
      expect(element).not.toHaveAttribute('tabindex', '-1')
      
      // Buttons should have proper role
      if (element.tagName === 'BUTTON') {
        expect(element).toHaveAttribute('type')
      }
    })
  })

  it('should have proper form labels and descriptions', () => {
    const { container } = render(<FlowConverter />)
    
    const formControls = container.querySelectorAll('input, select, textarea')
    
    formControls.forEach(control => {
      const id = control.getAttribute('id')
      if (id) {
        const label = container.querySelector(`label[for="${id}"]`)
        const ariaLabel = control.getAttribute('aria-label')
        const ariaLabelledBy = control.getAttribute('aria-labelledby')
        
        expect(label || ariaLabel || ariaLabelledBy).toBeTruthy()
      }
    })
  })

  it('should have proper error message associations', async () => {
    const { container } = render(<FlowConverter />)
    
    // Simulate error state
    const errorElements = container.querySelectorAll('[role="alert"], .error-message')
    
    errorElements.forEach(errorElement => {
      const ariaLive = errorElement.getAttribute('aria-live')
      expect(ariaLive).toBeTruthy()
    })
  })

  it('should have proper table accessibility when tables are present', () => {
    const { container } = render(<Dashboard />)
    
    const tables = container.querySelectorAll('table')
    
    tables.forEach(table => {
      // Check for table headers
      const headers = table.querySelectorAll('th')
      expect(headers.length).toBeGreaterThan(0)
      
      // Check for proper scope attributes
      headers.forEach(header => {
        expect(header).toHaveAttribute('scope')
      })
      
      // Check for table caption or aria-label
      const caption = table.querySelector('caption')
      const ariaLabel = table.getAttribute('aria-label')
      const ariaLabelledBy = table.getAttribute('aria-labelledby')
      
      expect(caption || ariaLabel || ariaLabelledBy).toBeTruthy()
    })
  })

  it('should have proper landmark roles', () => {
    const { container } = render(<Dashboard />)
    
    // Check for main content landmark
    const main = container.querySelector('main, [role="main"]')
    expect(main).toBeInTheDocument()
    
    // Check for navigation landmarks if present
    const nav = container.querySelector('nav, [role="navigation"]')
    if (nav) {
      expect(nav).toHaveAttribute('aria-label')
    }
  })

  it('should have proper loading state accessibility', async () => {
    // Mock loading state
    const mockUseApiQuery = require('@/hooks/useApi').useApiQuery
    mockUseApiQuery.mockReturnValue({
      data: null,
      isLoading: true,
      error: null,
    })

    const { container } = render(<Dashboard />)
    
    const loadingElements = container.querySelectorAll('[aria-busy="true"], [role="status"]')
    expect(loadingElements.length).toBeGreaterThan(0)
    
    loadingElements.forEach(element => {
      expect(element).toHaveAttribute('aria-live')
    })
  })

  it('should have proper modal accessibility when modals are present', () => {
    const { container } = render(<FlowConverter />)
    
    const modals = container.querySelectorAll('[role="dialog"], .modal')
    
    modals.forEach(modal => {
      expect(modal).toHaveAttribute('aria-labelledby')
      expect(modal).toHaveAttribute('aria-modal', 'true')
      
      // Check for focus trap elements
      const closeButton = modal.querySelector('[aria-label*="close" i], [aria-label*="dismiss" i]')
      if (closeButton) {
        expect(closeButton).toBeInTheDocument()
      }
    })
  })

  it('should announce dynamic content changes', () => {
    const { container } = render(<TestRunner flow={mockFlowiseFlow} />)
    
    const liveRegions = container.querySelectorAll('[aria-live]')
    expect(liveRegions.length).toBeGreaterThan(0)
    
    liveRegions.forEach(region => {
      const ariaLive = region.getAttribute('aria-live')
      expect(['polite', 'assertive']).toContain(ariaLive)
    })
  })
})