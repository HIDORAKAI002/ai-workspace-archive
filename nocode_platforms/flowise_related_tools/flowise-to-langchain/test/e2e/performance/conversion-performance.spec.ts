import { test, expect } from '@playwright/test';
import { FlowiseConverterPage } from '../pages/FlowiseConverterPage';
import path from 'path';

test.describe('Conversion Performance Tests', () => {
  let converterPage: FlowiseConverterPage;

  test.beforeEach(async ({ page }) => {
    converterPage = new FlowiseConverterPage(page);
    await converterPage.navigateToConverter();
  });

  test('should convert basic workflow within performance budget', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    
    // Act
    const startTime = performance.now();
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();
    const endTime = performance.now();

    // Assert
    const conversionTime = endTime - startTime;
    expect(conversionTime).toBeLessThan(5000); // 5 seconds for basic workflow

    const metrics = await converterPage.getConversionMetrics();
    expect(metrics.duration).toBeLessThan(5000);
  });

  test('should handle complex workflow within acceptable timeframe', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    
    // Act
    const startTime = performance.now();
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();
    const endTime = performance.now();

    // Assert
    const conversionTime = endTime - startTime;
    expect(conversionTime).toBeLessThan(15000); // 15 seconds for complex workflow

    const metrics = await converterPage.getConversionMetrics();
    expect(metrics.duration).toBeLessThan(15000);
    expect(metrics.nodesProcessed).toBeGreaterThanOrEqual(5);
  });

  test('should maintain responsive UI during conversion', async ({ page }) => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act - Start conversion and test UI responsiveness
    await converterPage.startConversion();

    // Assert - UI should remain responsive
    await expect(converterPage.convertProgress).toBeVisible();
    await expect(converterPage.convertStatus).toBeVisible();
    
    // Test that other UI elements are still interactive
    if (await converterPage.isElementVisible(converterPage.cancelButton)) {
      await expect(converterPage.cancelButton).toBeEnabled();
    }
  });

  test('should show progress updates during long conversions', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Progress should be visible and updating
    await expect(converterPage.convertProgress).toBeVisible();
    
    // Check for progress text updates
    const progressText = converterPage.convertStatus;
    await expect(progressText).toContainText(/Processing|Converting|Generating/);
  });

  test('should generate code of reasonable size', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Generated code should be reasonably sized
    const metrics = await converterPage.getConversionMetrics();
    expect(metrics.codeSize).toBeGreaterThan(100); // At least 100 characters
    expect(metrics.codeSize).toBeLessThan(50000); // Less than 50KB for basic workflow
  });

  test('should handle multiple conversions efficiently', async () => {
    // Test memory usage and performance over multiple conversions
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    
    const conversionTimes: number[] = [];

    // Perform multiple conversions
    for (let i = 0; i < 3; i++) {
      await converterPage.clearWorkflow();
      
      const startTime = performance.now();
      await converterPage.uploadFlowiseFile(testFile);
      await converterPage.startConversion();
      const endTime = performance.now();
      
      conversionTimes.push(endTime - startTime);
    }

    // Assert - Performance should not degrade significantly
    const firstConversion = conversionTimes[0];
    const lastConversion = conversionTimes[conversionTimes.length - 1];
    
    // Last conversion should not be more than 50% slower than first
    expect(lastConversion).toBeLessThan(firstConversion * 1.5);
  });

  test('should optimize memory usage during conversion', async ({ page }) => {
    // Monitor memory usage during conversion
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    
    // Get initial memory usage
    const initialMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });

    // Perform conversion
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.startConversion();

    // Get memory after conversion
    const finalMemory = await page.evaluate(() => {
      return (performance as any).memory?.usedJSHeapSize || 0;
    });

    // Assert - Memory increase should be reasonable
    if (finalMemory > 0 && initialMemory > 0) {
      const memoryIncrease = finalMemory - initialMemory;
      expect(memoryIncrease).toBeLessThan(10 * 1024 * 1024); // Less than 10MB increase
    }
  });

  test('should handle large workflow files efficiently', async () => {
    // This would test with a larger workflow file
    // For now, test with complex workflow and measure performance
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    
    const startTime = performance.now();
    await converterPage.uploadFlowiseFile(testFile);
    const uploadTime = performance.now() - startTime;

    // Upload should be fast
    expect(uploadTime).toBeLessThan(2000); // 2 seconds max for upload

    const conversionStartTime = performance.now();
    await converterPage.startConversion();
    const conversionTime = performance.now() - conversionStartTime;

    // Conversion should complete within time limit
    expect(conversionTime).toBeLessThan(20000); // 20 seconds max
  });

  test('should provide performance metrics to user', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Performance metrics should be available
    const metrics = await converterPage.getConversionMetrics();
    
    expect(metrics.duration).toBeGreaterThan(0);
    expect(metrics.nodesProcessed).toBeGreaterThan(0);
    expect(metrics.codeSize).toBeGreaterThan(0);
  });

  test('should maintain performance with different optimization levels', async () => {
    const testFile = path.join(__dirname, '../fixtures/basic-llm-chain.json');
    
    // Test basic optimization
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.configureConversion({ optimizationLevel: 'basic' });
    
    const basicStart = performance.now();
    await converterPage.startConversion();
    const basicTime = performance.now() - basicStart;

    // Clear and test advanced optimization
    await converterPage.clearWorkflow();
    await converterPage.uploadFlowiseFile(testFile);
    await converterPage.configureConversion({ optimizationLevel: 'advanced' });
    
    const advancedStart = performance.now();
    await converterPage.startConversion();
    const advancedTime = performance.now() - advancedStart;

    // Advanced should not be significantly slower
    expect(advancedTime).toBeLessThan(basicTime * 3);
  });
});