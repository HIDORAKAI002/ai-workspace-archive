import { FullConfig } from '@playwright/test';
import { rm } from 'fs/promises';

/**
 * Global teardown for E2E tests
 * Cleans up test environment and data
 */
async function globalTeardown(config: FullConfig): Promise<void> {
  console.log('🧹 Starting E2E test environment cleanup...');

  try {
    // Clean up temporary test data
    await rm('test-data/temp', { recursive: true, force: true });
    console.log('✅ Temporary test data cleaned up');

    // Archive test results if on CI
    if (process.env.CI) {
      console.log('📦 Archiving test results for CI...');
      // Additional CI-specific cleanup can go here
    }

  } catch (error) {
    console.error('❌ Global teardown failed:', error);
    // Don't throw - teardown failures shouldn't break the test run
  }

  console.log('✅ E2E test environment cleanup complete');
}

export default globalTeardown;