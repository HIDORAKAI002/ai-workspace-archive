import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * Page Object Model for Flowise Converter main interface
 */
export class FlowiseConverterPage extends BasePage {
  // Main navigation and layout
  readonly header: Locator;
  readonly sidebar: Locator;
  readonly mainContent: Locator;
  readonly footer: Locator;

  // File upload section
  readonly uploadSection: Locator;
  readonly fileInput: Locator;
  readonly uploadButton: Locator;
  readonly dragDropZone: Locator;
  readonly uploadStatus: Locator;

  // Flow preview section
  readonly flowPreview: Locator;
  readonly flowViewer: Locator;
  readonly flowCanvas: Locator;
  readonly nodeElements: Locator;
  readonly edgeElements: Locator;
  readonly miniMap: Locator;

  // Configuration panel
  readonly configPanel: Locator;
  readonly outputFormatSelect: Locator;
  readonly languageSelect: Locator;
  readonly includeTestsCheckbox: Locator;
  readonly includeDocsCheckbox: Locator;
  readonly optimizationLevelSelect: Locator;

  // Conversion controls
  readonly convertButton: Locator;
  readonly convertProgress: Locator;
  readonly convertStatus: Locator;
  readonly cancelButton: Locator;

  // Results section
  readonly resultsSection: Locator;
  readonly codePreview: Locator;
  readonly downloadButton: Locator;
  readonly copyCodeButton: Locator;
  readonly exportOptions: Locator;

  // Validation panel
  readonly validationPanel: Locator;
  readonly errorList: Locator;
  readonly warningList: Locator;
  readonly validationStatus: Locator;

  // Testing interface
  readonly testingPanel: Locator;
  readonly testConfigSection: Locator;
  readonly runTestsButton: Locator;
  readonly testResults: Locator;

  constructor(page: Page) {
    super(page);

    // Main layout elements
    this.header = page.locator('[data-testid="app-header"]');
    this.sidebar = page.locator('[data-testid="app-sidebar"]');
    this.mainContent = page.locator('[data-testid="main-content"]');
    this.footer = page.locator('[data-testid="app-footer"]');

    // File upload elements
    this.uploadSection = page.locator('[data-testid="upload-section"]');
    this.fileInput = page.locator('[data-testid="file-input"]');
    this.uploadButton = page.locator('[data-testid="upload-button"]');
    this.dragDropZone = page.locator('[data-testid="drag-drop-zone"]');
    this.uploadStatus = page.locator('[data-testid="upload-status"]');

    // Flow preview elements
    this.flowPreview = page.locator('[data-testid="flow-preview"]');
    this.flowViewer = page.locator('[data-testid="flow-viewer"]');
    this.flowCanvas = page.locator('[data-testid="flow-canvas"]');
    this.nodeElements = page.locator('[data-testid^="node-"]');
    this.edgeElements = page.locator('[data-testid^="edge-"]');
    this.miniMap = page.locator('[data-testid="mini-map"]');

    // Configuration elements
    this.configPanel = page.locator('[data-testid="config-panel"]');
    this.outputFormatSelect = page.locator('[data-testid="output-format-select"]');
    this.languageSelect = page.locator('[data-testid="language-select"]');
    this.includeTestsCheckbox = page.locator('[data-testid="include-tests"]');
    this.includeDocsCheckbox = page.locator('[data-testid="include-docs"]');
    this.optimizationLevelSelect = page.locator('[data-testid="optimization-level"]');

    // Conversion elements
    this.convertButton = page.locator('[data-testid="convert-button"]');
    this.convertProgress = page.locator('[data-testid="convert-progress"]');
    this.convertStatus = page.locator('[data-testid="convert-status"]');
    this.cancelButton = page.locator('[data-testid="cancel-button"]');

    // Results elements
    this.resultsSection = page.locator('[data-testid="results-section"]');
    this.codePreview = page.locator('[data-testid="code-preview"]');
    this.downloadButton = page.locator('[data-testid="download-button"]');
    this.copyCodeButton = page.locator('[data-testid="copy-code-button"]');
    this.exportOptions = page.locator('[data-testid="export-options"]');

    // Validation elements
    this.validationPanel = page.locator('[data-testid="validation-panel"]');
    this.errorList = page.locator('[data-testid="error-list"]');
    this.warningList = page.locator('[data-testid="warning-list"]');
    this.validationStatus = page.locator('[data-testid="validation-status"]');

    // Testing elements
    this.testingPanel = page.locator('[data-testid="testing-panel"]');
    this.testConfigSection = page.locator('[data-testid="test-config"]');
    this.runTestsButton = page.locator('[data-testid="run-tests-button"]');
    this.testResults = page.locator('[data-testid="test-results"]');
  }

  /**
   * Navigate to the Flowise converter page
   */
  async navigateToConverter(): Promise<void> {
    await this.goto('/');
    await this.assertTitle(/Flowise.*Converter/);
    await this.waitForElement(this.uploadSection);
  }

  /**
   * Upload a Flowise JSON file
   */
  async uploadFlowiseFile(filePath: string): Promise<void> {
    await this.uploadFile(this.fileInput, filePath);
    await this.waitForText('File uploaded successfully');
    await this.waitForElement(this.flowPreview);
  }

  /**
   * Upload file via drag and drop
   */
  async dragAndDropFile(filePath: string): Promise<void> {
    // Read file content (this would need to be implemented based on the UI framework)
    await this.dragDropZone.hover();
    await this.uploadFile(this.fileInput, filePath);
    await this.waitForLoadingComplete();
  }

  /**
   * Configure conversion settings
   */
  async configureConversion(options: {
    outputFormat?: 'typescript' | 'javascript' | 'python';
    includeTests?: boolean;
    includeDocs?: boolean;
    optimizationLevel?: 'basic' | 'standard' | 'advanced';
  }): Promise<void> {
    if (options.outputFormat) {
      await this.selectOption(this.outputFormatSelect, options.outputFormat);
    }

    if (options.includeTests !== undefined) {
      if (options.includeTests) {
        await this.includeTestsCheckbox.check();
      } else {
        await this.includeTestsCheckbox.uncheck();
      }
    }

    if (options.includeDocs !== undefined) {
      if (options.includeDocs) {
        await this.includeDocsCheckbox.check();
      } else {
        await this.includeDocsCheckbox.uncheck();
      }
    }

    if (options.optimizationLevel) {
      await this.selectOption(this.optimizationLevelSelect, options.optimizationLevel);
    }
  }

  /**
   * Start the conversion process
   */
  async startConversion(): Promise<void> {
    await this.clickWithRetry(this.convertButton);
    await this.waitForElement(this.convertProgress);
    await this.waitForConversionComplete();
  }

  /**
   * Wait for conversion to complete
   */
  async waitForConversionComplete(): Promise<void> {
    await this.waitForText('Conversion completed successfully', 60000);
    await this.waitForElement(this.resultsSection);
  }

  /**
   * Verify flow preview shows correctly
   */
  async verifyFlowPreview(): Promise<void> {
    await expect(this.flowViewer).toBeVisible();
    await expect(this.nodeElements.first()).toBeVisible();
    
    // Check if nodes are rendered
    const nodeCount = await this.nodeElements.count();
    expect(nodeCount).toBeGreaterThan(0);
  }

  /**
   * Verify conversion results
   */
  async verifyConversionResults(): Promise<void> {
    await expect(this.codePreview).toBeVisible();
    await expect(this.downloadButton).toBeVisible();
    await expect(this.copyCodeButton).toBeVisible();

    // Check if code preview contains expected content
    const codeContent = await this.codePreview.textContent();
    expect(codeContent).toBeTruthy();
    expect(codeContent).toContain('import');
  }

  /**
   * Download converted code
   */
  async downloadCode(): Promise<void> {
    const downloadPromise = this.page.waitForEvent('download');
    await this.clickWithRetry(this.downloadButton);
    const download = await downloadPromise;
    
    // Verify download
    expect(download.suggestedFilename()).toMatch(/\.(ts|js|py|zip)$/);
  }

  /**
   * Copy code to clipboard
   */
  async copyCodeToClipboard(): Promise<void> {
    await this.clickWithRetry(this.copyCodeButton);
    await this.waitForText('Code copied to clipboard');
  }

  /**
   * Verify validation results
   */
  async verifyValidation(expectErrors: boolean = false): Promise<void> {
    await this.waitForElement(this.validationPanel);
    
    if (expectErrors) {
      await expect(this.errorList).toBeVisible();
      const errorCount = await this.errorList.locator('li').count();
      expect(errorCount).toBeGreaterThan(0);
    } else {
      await expect(this.validationStatus).toContainText('Valid');
    }
  }

  /**
   * Run generated code tests
   */
  async runTests(): Promise<void> {
    await this.scrollToElement(this.testingPanel);
    await this.clickWithRetry(this.runTestsButton);
    await this.waitForElement(this.testResults);
    await this.waitForText('Tests completed', 30000);
  }

  /**
   * Verify test results
   */
  async verifyTestResults(expectPassing: boolean = true): Promise<void> {
    await this.waitForElement(this.testResults);
    
    if (expectPassing) {
      await expect(this.testResults).toContainText('All tests passed');
    } else {
      await expect(this.testResults).toContainText('Some tests failed');
    }
  }

  /**
   * Clear current workflow
   */
  async clearWorkflow(): Promise<void> {
    const clearButton = this.page.locator('[data-testid="clear-button"]');
    if (await this.isElementVisible(clearButton)) {
      await this.clickWithRetry(clearButton);
      await this.waitForText('Workflow cleared');
    }
  }

  /**
   * Get error messages from validation
   */
  async getValidationErrors(): Promise<string[]> {
    const errorElements = this.errorList.locator('li');
    const errorCount = await errorElements.count();
    const errors: string[] = [];
    
    for (let i = 0; i < errorCount; i++) {
      const errorText = await errorElements.nth(i).textContent();
      if (errorText) {
        errors.push(errorText);
      }
    }
    
    return errors;
  }

  /**
   * Verify specific node is present in flow
   */
  async verifyNodePresent(nodeId: string): Promise<void> {
    const nodeElement = this.page.locator(`[data-testid="node-${nodeId}"]`);
    await expect(nodeElement).toBeVisible();
  }

  /**
   * Check conversion performance metrics
   */
  async getConversionMetrics(): Promise<{
    duration: number;
    nodesProcessed: number;
    codeSize: number;
  }> {
    const metricsPanel = this.page.locator('[data-testid="metrics-panel"]');
    
    if (await this.isElementVisible(metricsPanel)) {
      const durationText = await metricsPanel.locator('[data-testid="duration"]').textContent();
      const nodesText = await metricsPanel.locator('[data-testid="nodes-count"]').textContent();
      const sizeText = await metricsPanel.locator('[data-testid="code-size"]').textContent();
      
      return {
        duration: parseInt(durationText?.replace(/\D/g, '') || '0'),
        nodesProcessed: parseInt(nodesText?.replace(/\D/g, '') || '0'),
        codeSize: parseInt(sizeText?.replace(/\D/g, '') || '0')
      };
    }
    
    return { duration: 0, nodesProcessed: 0, codeSize: 0 };
  }
}