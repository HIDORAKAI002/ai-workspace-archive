import { Page, expect, Locator } from '@playwright/test';
import { readFile, writeFile } from 'fs/promises';
import path from 'path';

/**
 * Utility functions for E2E tests
 */
export class E2ETestHelpers {
  
  /**
   * Wait for all network requests to complete
   */
  static async waitForNetworkIdle(page: Page, timeout: number = 5000): Promise<void> {
    await page.waitForLoadState('networkidle', { timeout });
  }

  /**
   * Wait for specific API call to complete
   */
  static async waitForAPICall(page: Page, apiEndpoint: string): Promise<void> {
    await page.waitForResponse(response => 
      response.url().includes(apiEndpoint) && response.status() === 200
    );
  }

  /**
   * Mock API responses for testing
   */
  static async mockAPIResponse(
    page: Page, 
    endpoint: string, 
    response: any,
    status: number = 200
  ): Promise<void> {
    await page.route(`**/*${endpoint}*`, route => {
      route.fulfill({
        status,
        contentType: 'application/json',
        body: JSON.stringify(response)
      });
    });
  }

  /**
   * Create temporary test file
   */
  static async createTestFile(filename: string, content: any): Promise<string> {
    const tempDir = path.join(process.cwd(), 'test-data', 'temp');
    const filePath = path.join(tempDir, filename);
    
    await writeFile(filePath, JSON.stringify(content, null, 2));
    return filePath;
  }

  /**
   * Clean up test files
   */
  static async cleanupTestFile(filePath: string): Promise<void> {
    try {
      const fs = await import('fs/promises');
      await fs.unlink(filePath);
    } catch (error) {
      // Ignore if file doesn't exist
    }
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeTimestampedScreenshot(
    page: Page, 
    name: string, 
    fullPage: boolean = true
  ): Promise<void> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const screenshotPath = `test-results/screenshots/${name}-${timestamp}.png`;
    
    await page.screenshot({ 
      path: screenshotPath, 
      fullPage 
    });
  }

  /**
   * Get element text content safely
   */
  static async getElementText(locator: Locator): Promise<string> {
    try {
      const text = await locator.textContent();
      return text || '';
    } catch (error) {
      return '';
    }
  }

  /**
   * Wait for element to contain specific text
   */
  static async waitForElementText(
    locator: Locator, 
    expectedText: string, 
    timeout: number = 10000
  ): Promise<void> {
    await expect(locator).toContainText(expectedText, { timeout });
  }

  /**
   * Check if element exists without throwing
   */
  static async elementExists(page: Page, selector: string): Promise<boolean> {
    try {
      await page.locator(selector).waitFor({ state: 'attached', timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get download content for verification
   */
  static async getDownloadContent(page: Page, downloadTrigger: () => Promise<void>): Promise<Buffer> {
    const downloadPromise = page.waitForEvent('download');
    await downloadTrigger();
    const download = await downloadPromise;
    
    return await download.createReadStream().then(stream => {
      const chunks: Buffer[] = [];
      return new Promise((resolve, reject) => {
        stream.on('data', chunk => chunks.push(chunk));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
        stream.on('error', reject);
      });
    });
  }

  /**
   * Verify file download
   */
  static async verifyDownload(
    page: Page, 
    downloadTrigger: () => Promise<void>,
    expectedFilename?: string
  ): Promise<void> {
    const downloadPromise = page.waitForEvent('download');
    await downloadTrigger();
    const download = await downloadPromise;
    
    if (expectedFilename) {
      expect(download.suggestedFilename()).toBe(expectedFilename);
    }
    
    // Verify download completed
    expect(download.suggestedFilename()).toBeTruthy();
  }

  /**
   * Measure page performance
   */
  static async measurePerformance(page: Page): Promise<{
    loadTime: number;
    domContentLoaded: number;
    firstContentfulPaint: number;
  }> {
    const metrics = await page.evaluate(() => {
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      const paint = performance.getEntriesByType('paint');
      
      return {
        loadTime: navigation.loadEventEnd - navigation.loadEventStart,
        domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
        firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0
      };
    });
    
    return metrics;
  }

  /**
   * Check for console errors
   */
  static async checkConsoleErrors(page: Page): Promise<string[]> {
    const errors: string[] = [];
    
    page.on('console', msg => {
      if (msg.type() === 'error') {
        errors.push(msg.text());
      }
    });
    
    return errors;
  }

  /**
   * Wait for animations to complete
   */
  static async waitForAnimations(page: Page): Promise<void> {
    await page.waitForFunction(() => {
      return document.getAnimations().every(animation => 
        animation.playState === 'finished'
      );
    });
  }

  /**
   * Simulate file upload with validation
   */
  static async uploadFileWithValidation(
    fileInput: Locator,
    filePath: string,
    expectedValidation?: string
  ): Promise<void> {
    await fileInput.setInputFiles(filePath);
    
    if (expectedValidation) {
      const page = fileInput.page();
      await page.waitForSelector(`text=${expectedValidation}`, { timeout: 5000 });
    }
  }

  /**
   * Get clipboard content (requires permissions)
   */
  static async getClipboardContent(page: Page): Promise<string> {
    try {
      return await page.evaluate(() => navigator.clipboard.readText());
    } catch (error) {
      console.warn('Clipboard access not available in test environment');
      return '';
    }
  }

  /**
   * Simulate network conditions
   */
  static async simulateNetworkConditions(
    page: Page,
    conditions: 'slow3G' | 'fast3G' | 'offline'
  ): Promise<void> {
    const client = await page.context().newCDPSession(page);
    
    const networkConditions = {
      slow3G: { offline: false, downloadThroughput: 500 * 1024, uploadThroughput: 500 * 1024, latency: 400 },
      fast3G: { offline: false, downloadThroughput: 1.6 * 1024 * 1024, uploadThroughput: 750 * 1024, latency: 150 },
      offline: { offline: true, downloadThroughput: 0, uploadThroughput: 0, latency: 0 }
    };
    
    await client.send('Network.emulateNetworkConditions', networkConditions[conditions]);
  }

  /**
   * Run accessibility checks
   */
  static async checkAccessibility(page: Page): Promise<{
    violations: Array<{ id: string; description: string; nodes: number }>;
    passes: number;
  }> {
    // This would integrate with axe-core for accessibility testing
    // For now, return a mock structure
    try {
      const result = await page.evaluate(() => {
        // Mock accessibility check results
        return {
          violations: [],
          passes: 10
        };
      });
      
      return result;
    } catch (error) {
      return { violations: [], passes: 0 };
    }
  }

  /**
   * Generate test report data
   */
  static async generateTestMetrics(
    page: Page,
    testName: string,
    startTime: number,
    endTime: number
  ): Promise<void> {
    const metrics = {
      testName,
      duration: endTime - startTime,
      timestamp: new Date().toISOString(),
      performance: await this.measurePerformance(page),
      url: page.url(),
      viewport: page.viewportSize()
    };
    
    const reportPath = path.join('test-results', 'metrics', `${testName}-metrics.json`);
    await writeFile(reportPath, JSON.stringify(metrics, null, 2));
  }

  /**
   * Retry operation with exponential backoff
   */
  static async retryWithBackoff<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;
    
    for (let attempt = 0; attempt < maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        
        if (attempt < maxRetries - 1) {
          const delay = baseDelay * Math.pow(2, attempt);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }
    
    throw lastError!;
  }

  /**
   * Wait for all images to load
   */
  static async waitForImages(page: Page): Promise<void> {
    await page.waitForFunction(() => {
      const images = Array.from(document.images);
      return images.every(img => img.complete && img.naturalHeight !== 0);
    });
  }

  /**
   * Validate form data
   */
  static async validateFormData(
    page: Page,
    formSelector: string,
    expectedData: Record<string, string>
  ): Promise<void> {
    const formData = await page.evaluate((selector) => {
      const form = document.querySelector(selector) as HTMLFormElement;
      if (!form) return {};
      
      const data: Record<string, string> = {};
      const formDataObj = new FormData(form);
      
      for (const [key, value] of formDataObj.entries()) {
        data[key] = value.toString();
      }
      
      return data;
    }, formSelector);
    
    for (const [key, expectedValue] of Object.entries(expectedData)) {
      expect(formData[key]).toBe(expectedValue);
    }
  }
}