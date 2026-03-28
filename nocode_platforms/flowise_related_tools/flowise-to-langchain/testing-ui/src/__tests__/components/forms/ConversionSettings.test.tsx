import { render, screen, fireEvent, waitFor } from '../../utils/test-utils'
import userEvent from '@testing-library/user-event'
import { ConversionSettings } from '@/components/forms/ConversionSettings'

describe('ConversionSettings', () => {
  const mockOnChange = jest.fn()
  const defaultSettings = {
    outputFormat: 'typescript' as const,
    withLangfuse: false,
    includeComments: true,
    format: 'esm' as const,
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders conversion settings form', () => {
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    expect(screen.getByText('Conversion Settings')).toBeInTheDocument()
    expect(screen.getByText('Output Format')).toBeInTheDocument()
    expect(screen.getByText('Include LangFuse')).toBeInTheDocument()
    expect(screen.getByText('Include Comments')).toBeInTheDocument()
    expect(screen.getByText('Module Format')).toBeInTheDocument()
  })

  it('displays current settings values', () => {
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    expect(screen.getByDisplayValue('typescript')).toBeInTheDocument()
    expect(screen.getByDisplayValue('esm')).toBeInTheDocument()
    
    const langfuseCheckbox = screen.getByLabelText('Include LangFuse integration')
    const commentsCheckbox = screen.getByLabelText('Include explanatory comments')
    
    expect(langfuseCheckbox).not.toBeChecked()
    expect(commentsCheckbox).toBeChecked()
  })

  it('handles output format change', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    const formatSelect = screen.getByDisplayValue('typescript')
    await user.selectOptions(formatSelect, 'python')

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultSettings,
      outputFormat: 'python',
    })
  })

  it('handles module format change', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    const moduleSelect = screen.getByDisplayValue('esm')
    await user.selectOptions(moduleSelect, 'commonjs')

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultSettings,
      format: 'commonjs',
    })
  })

  it('handles LangFuse checkbox toggle', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    const langfuseCheckbox = screen.getByLabelText('Include LangFuse integration')
    await user.click(langfuseCheckbox)

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultSettings,
      withLangfuse: true,
    })
  })

  it('handles comments checkbox toggle', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    const commentsCheckbox = screen.getByLabelText('Include explanatory comments')
    await user.click(commentsCheckbox)

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultSettings,
      includeComments: false,
    })
  })

  it('validates required fields', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={{ ...defaultSettings, outputFormat: '' as any }} 
        onChange={mockOnChange} 
      />
    )

    // Try to submit form
    const form = screen.getByTestId('conversion-settings-form')
    fireEvent.submit(form)

    await waitFor(() => {
      expect(screen.getByText('Output format is required')).toBeInTheDocument()
    })
  })

  it('shows Python-specific options when Python is selected', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={{ ...defaultSettings, outputFormat: 'python' }} 
        onChange={mockOnChange} 
      />
    )

    expect(screen.getByText('Python Version')).toBeInTheDocument()
    expect(screen.getByText('Use Type Hints')).toBeInTheDocument()
  })

  it('hides TypeScript-specific options when Python is selected', async () => {
    render(
      <ConversionSettings 
        settings={{ ...defaultSettings, outputFormat: 'python' }} 
        onChange={mockOnChange} 
      />
    )

    expect(screen.queryByText('Module Format')).not.toBeInTheDocument()
  })

  it('shows advanced settings when toggled', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    const advancedToggle = screen.getByText('Advanced Settings')
    await user.click(advancedToggle)

    expect(screen.getByText('Custom Template')).toBeInTheDocument()
    expect(screen.getByText('Optimization Level')).toBeInTheDocument()
  })

  it('handles custom template input', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnChange} 
      />
    )

    // Open advanced settings
    const advancedToggle = screen.getByText('Advanced Settings')
    await user.click(advancedToggle)

    const templateInput = screen.getByLabelText('Custom template path')
    await user.type(templateInput, './custom-template.ts')

    expect(mockOnChange).toHaveBeenCalledWith({
      ...defaultSettings,
      customTemplate: './custom-template.ts',
    })
  })

  it('displays help tooltips for complex options', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={defaultSettings} 
        onChange={mockOnchange} 
      />
    )

    const helpIcon = screen.getByTestId('langfuse-help-icon')
    await user.hover(helpIcon)

    await waitFor(() => {
      expect(screen.getByText('LangFuse provides observability for LangChain applications')).toBeInTheDocument()
    })
  })

  it('resets form to defaults when reset button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <ConversionSettings 
        settings={{ 
          outputFormat: 'python', 
          withLangfuse: true, 
          includeComments: false,
          format: 'commonjs' 
        }} 
        onChange={mockOnChange} 
      />
    )

    const resetButton = screen.getByText('Reset to Defaults')
    await user.click(resetButton)

    expect(mockOnChange).toHaveBeenCalledWith({
      outputFormat: 'typescript',
      withLangfuse: false,
      includeComments: true,
      format: 'esm',
    })
  })
})