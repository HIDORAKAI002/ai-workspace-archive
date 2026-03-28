import { test, expect } from '@playwright/test';
import { FlowiseConverterPage } from '../pages/FlowiseConverterPage';
import path from 'path';

test.describe('Visual Regression Tests', () => {
  let converterPage: FlowiseConverterPage;

  test.beforeEach(async ({ page }) => {
    converterPage = new FlowiseConverterPage(page);
    await converterPage.navigateToConverter();
  });

  test('should match homepage layout snapshot', async ({ page }) => {
    // Arrange - Wait for page to fully load
    await converterPage.waitForPageLoad();
    await converterPage.waitForElement(converterPage.uploadSection);

    // Act & Assert - Take full page screenshot
    await expect(page).toHaveScreenshot('homepage-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match upload section appearance', async ({ page }) => {
    // Arrange
    await converterPage.waitForElement(converterPage.uploadSection);

    // Act & Assert - Screenshot upload section
    await expect(converterPage.uploadSection).toHaveScreenshot('upload-section.png');
  });

  test('should match flow preview with loaded workflow', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.verifyFlowPreview();

    // Act & Assert - Screenshot flow preview
    await expect(converterPage.flowPreview).toHaveScreenshot('flow-preview-basic.png');
  });

  test('should match complex workflow visualization', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.verifyFlowPreview();

    // Act & Assert - Screenshot complex flow
    await expect(converterPage.flowPreview).toHaveScreenshot('flow-preview-complex.png');
  });

  test('should match configuration panel appearance', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.waitForElement(converterPage.configPanel);

    // Act & Assert - Screenshot config panel
    await expect(converterPage.configPanel).toHaveScreenshot('config-panel.png');
  });

  test('should match conversion progress indicator', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    
    // Start conversion and capture progress
    await converterPage.startConversion();
    await converterPage.waitForElement(converterPage.convertProgress);

    // Act & Assert - Screenshot progress indicator
    await expect(converterPage.convertProgress).toHaveScreenshot('conversion-progress.png');
  });

  test('should match code preview with generated output', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();
    await converterPage.waitForElement(converterPage.codePreview);

    // Act & Assert - Screenshot code preview
    await expect(converterPage.codePreview).toHaveScreenshot('code-preview.png');
  });

  test('should match validation panel with errors', async ({ page }) => {
    // Arrange
    const invalidFile = path.join(__dirname, '../fixtures/invalid-workflow.json');
    await converterPage.uploadFlowiseFile(invalidFile);
    await converterPage.verifyValidation(true);

    // Act & Assert - Screenshot validation errors
    await expect(converterPage.validationPanel).toHaveScreenshot('validation-errors.png');
  });

  test('should match results section layout', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();
    await converterPage.waitForElement(converterPage.resultsSection);

    // Act & Assert - Screenshot results section
    await expect(converterPage.resultsSection).toHaveScreenshot('results-section.png');
  });

  test('should match mobile layout', async ({ page }) => {
    // Arrange - Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await converterPage.navigateToConverter();
    await converterPage.waitForPageLoad();

    // Act & Assert - Mobile layout screenshot
    await expect(page).toHaveScreenshot('mobile-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match tablet layout', async ({ page }) => {
    // Arrange - Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await converterPage.navigateToConverter();
    await converterPage.waitForPageLoad();

    // Act & Assert - Tablet layout screenshot
    await expect(page).toHaveScreenshot('tablet-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match dark theme appearance', async ({ page }) => {
    // Arrange - Enable dark theme if available
    const darkThemeToggle = page.locator('[data-testid="dark-theme-toggle"]');
    if (await converterPage.isElementVisible(darkThemeToggle)) {
      await darkThemeToggle.click();
      await page.waitForTimeout(500); // Wait for theme transition
    }

    // Act & Assert - Dark theme screenshot
    await expect(page).toHaveScreenshot('dark-theme.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should match node details modal', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    
    // Click on a node to open details (if supported)
    const firstNode = converterPage.nodeElements.first();
    if (await converterPage.isElementVisible(firstNode)) {
      await firstNode.click();
      
      // Check if modal opened
      const modal = page.locator('[data-testid="node-details-modal"]');
      if (await converterPage.isElementVisible(modal)) {
        await expect(modal).toHaveScreenshot('node-details-modal.png');
      }
    }
  });

  test('should match export options dialog', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();
    
    // Open export options if available
    if (await converterPage.isElementVisible(converterPage.exportOptions)) {
      await converterPage.exportOptions.click();
      
      const exportDialog = page.locator('[data-testid="export-dialog"]');
      if (await converterPage.isElementVisible(exportDialog)) {
        await expect(exportDialog).toHaveScreenshot('export-options-dialog.png');
      }
    }
  });

  test('should match hover states and interactions', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act - Hover over convert button
    await converterPage.hoverElement(converterPage.convertButton);
    
    // Assert - Screenshot hover state
    await expect(converterPage.convertButton).toHaveScreenshot('convert-button-hover.png');
  });

  test('should match focus states for accessibility', async ({ page }) => {
    // Arrange
    await converterPage.waitForElement(converterPage.fileInput);

    // Act - Focus on file input
    await converterPage.fileInput.focus();
    
    // Assert - Screenshot focus state
    await expect(converterPage.uploadSection).toHaveScreenshot('file-input-focus.png');
  });

  test('should match loading states', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    
    // Start conversion to capture loading state
    const conversionPromise = converterPage.startConversion();
    
    // Quickly capture loading state
    await page.waitForTimeout(100);
    if (await converterPage.isElementVisible(converterPage.convertProgress)) {
      await expect(converterPage.convertProgress).toHaveScreenshot('loading-state.png');
    }
    
    await conversionPromise;
  });

  test('should match empty state appearance', async ({ page }) => {
    // Assert - Screenshot empty state
    await expect(converterPage.uploadSection).toHaveScreenshot('empty-state.png');
  });

  test('should match success state indicators', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();

    // Assert - Screenshot success indicators
    const successIndicator = page.locator('[data-testid="success-indicator"]');
    if (await converterPage.isElementVisible(successIndicator)) {
      await expect(successIndicator).toHaveScreenshot('success-indicator.png');
    }
  });
});