import { test, expect } from '@playwright/test';
import { FlowiseConverterPage } from '../pages/FlowiseConverterPage';
import path from 'path';

test.describe('Basic Workflow Conversion', () => {
  let converterPage: FlowiseConverterPage;

  test.beforeEach(async ({ page }) => {
    converterPage = new FlowiseConverterPage(page);
    await converterPage.navigateToConverter();
  });

  test('should successfully upload and convert a basic LLM chain', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');

    // Act - Upload file
    await converterPage.uploadFlowiseFile(testFile);
    
    // Assert - Verify upload success
    await converterPage.verifyFlowPreview();
    await converterPage.verifyNodePresent('promptTemplate_0');
    await converterPage.verifyNodePresent('chatOpenAI_0');
    await converterPage.verifyNodePresent('llmChain_0');

    // Act - Configure conversion
    await converterPage.configureConversion({
      outputFormat: 'typescript',
      includeTests: true,
      includeDocs: true,
      optimizationLevel: 'standard'
    });

    // Act - Start conversion
    await converterPage.startConversion();

    // Assert - Verify conversion results
    await converterPage.verifyConversionResults();
    await converterPage.verifyValidation();

    // Verify generated code contains expected imports
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('import { ChatOpenAI }');
    expect(codeContent).toContain('import { PromptTemplate }');
    expect(codeContent).toContain('import { LLMChain }');
    expect(codeContent).toContain('export class');
  });

  test('should handle file upload via drag and drop', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');

    // Act
    await converterPage.dragAndDropFile(testFile);

    // Assert
    await converterPage.verifyFlowPreview();
    await converterPage.waitForText('File uploaded successfully');
  });

  test('should allow editing flow configuration before conversion', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act - Modify configuration
    await converterPage.configureConversion({
      outputFormat: 'javascript',
      includeTests: false,
      includeDocs: false,
      optimizationLevel: 'basic'
    });

    // Act - Convert
    await converterPage.startConversion();

    // Assert - Verify JavaScript output
    await converterPage.verifyConversionResults();
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('require('); // JavaScript syntax
    expect(codeContent).toContain('module.exports');
  });

  test('should generate and run tests for converted code', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act - Convert with tests enabled
    await converterPage.configureConversion({
      outputFormat: 'typescript',
      includeTests: true
    });
    await converterPage.startConversion();

    // Act - Run tests
    await converterPage.runTests();

    // Assert
    await converterPage.verifyTestResults(true);
  });

  test('should allow downloading converted code', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();

    // Act
    await converterPage.downloadCode();

    // Assert - Download should complete without errors
    // File validation would happen in the download event handler
  });

  test('should copy code to clipboard', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();

    // Act
    await converterPage.copyCodeToClipboard();

    // Assert - Should show confirmation message
    await converterPage.waitForText('Code copied to clipboard');
  });

  test('should display conversion metrics', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert
    const metrics = await converterPage.getConversionMetrics();
    expect(metrics.nodesProcessed).toBeGreaterThan(0);
    expect(metrics.codeSize).toBeGreaterThan(0);
    expect(metrics.duration).toBeGreaterThan(0);
  });

  test('should support clearing workflow and starting over', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.clearWorkflow();

    // Assert
    await expect(converterPage.flowPreview).not.toBeVisible();
    await expect(converterPage.uploadSection).toBeVisible();
  });

  test('should maintain responsive design on different viewport sizes', async ({ page }) => {
    // Test mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await converterPage.navigateToConverter();
    
    await expect(converterPage.uploadSection).toBeVisible();
    await expect(converterPage.header).toBeVisible();

    // Test tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(converterPage.uploadSection).toBeVisible();
    await expect(converterPage.sidebar).toBeVisible();

    // Test desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(converterPage.uploadSection).toBeVisible();
    await expect(converterPage.configPanel).toBeVisible();
  });
});