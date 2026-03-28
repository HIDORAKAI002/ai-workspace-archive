import { Page, Locator, expect } from '@playwright/test';

/**
 * Base page class with common functionality
 */
export class BasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to the application
   */
  async goto(path: string = '/'): Promise<void> {
    await this.page.goto(path);
    await this.waitForPageLoad();
  }

  /**
   * Wait for page to fully load
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForFunction(() => document.readyState === 'complete');
  }

  /**
   * Take a screenshot for debugging
   */
  async takeScreenshot(name: string): Promise<void> {
    await this.page.screenshot({ 
      path: `test-results/screenshots/${name}-${Date.now()}.png`,
      fullPage: true 
    });
  }

  /**
   * Wait for element to be visible and enabled
   */
  async waitForElement(locator: Locator, timeout: number = 10000): Promise<void> {
    await locator.waitFor({ state: 'visible', timeout });
    await expect(locator).toBeEnabled();
  }

  /**
   * Click element with retry logic
   */
  async clickWithRetry(locator: Locator, maxRetries: number = 3): Promise<void> {
    let lastError: Error | undefined;
    
    for (let i = 0; i < maxRetries; i++) {
      try {
        await this.waitForElement(locator);
        await locator.click();
        return;
      } catch (error) {
        lastError = error as Error;
        await this.page.waitForTimeout(1000);
      }
    }
    
    throw lastError || new Error(`Failed to click element after ${maxRetries} attempts`);
  }

  /**
   * Upload file with validation
   */
  async uploadFile(fileInputLocator: Locator, filePath: string): Promise<void> {
    await this.waitForElement(fileInputLocator);
    await fileInputLocator.setInputFiles(filePath);
    
    // Wait for file to be processed
    await this.page.waitForTimeout(1000);
  }

  /**
   * Wait for loading to complete
   */
  async waitForLoadingComplete(): Promise<void> {
    // Wait for common loading indicators
    const loadingSelectors = [
      '[data-testid="loading"]',
      '.loading',
      '.spinner',
      '[aria-label*="loading" i]'
    ];

    for (const selector of loadingSelectors) {
      try {
        await this.page.locator(selector).waitFor({ state: 'hidden', timeout: 2000 });
      } catch {
        // Ignore if loading indicator doesn't exist
      }
    }
  }

  /**
   * Assert page title
   */
  async assertTitle(expectedTitle: string): Promise<void> {
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  /**
   * Assert URL contains path
   */
  async assertURL(expectedPath: string): Promise<void> {
    await expect(this.page).toHaveURL(new RegExp(expectedPath));
  }

  /**
   * Get current URL
   */
  getCurrentURL(): string {
    return this.page.url();
  }

  /**
   * Scroll element into view
   */
  async scrollToElement(locator: Locator): Promise<void> {
    await locator.scrollIntoViewIfNeeded();
  }

  /**
   * Hover over element
   */
  async hoverElement(locator: Locator): Promise<void> {
    await this.waitForElement(locator);
    await locator.hover();
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator): Promise<boolean> {
    try {
      await locator.waitFor({ state: 'visible', timeout: 2000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Wait for text to appear
   */
  async waitForText(text: string, timeout: number = 10000): Promise<void> {
    await this.page.locator(`text=${text}`).first().waitFor({ 
      state: 'visible', 
      timeout 
    });
  }

  /**
   * Assert element contains text
   */
  async assertElementText(locator: Locator, expectedText: string): Promise<void> {
    await expect(locator).toContainText(expectedText);
  }

  /**
   * Clear and type in input field
   */
  async clearAndType(locator: Locator, text: string): Promise<void> {
    await this.waitForElement(locator);
    await locator.clear();
    await locator.type(text);
  }

  /**
   * Select option from dropdown
   */
  async selectOption(selectLocator: Locator, value: string): Promise<void> {
    await this.waitForElement(selectLocator);
    await selectLocator.selectOption(value);
  }
}