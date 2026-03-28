import { chromium, FullConfig } from '@playwright/test';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';

/**
 * Global setup for E2E tests
 * Prepares test environment and data
 */
async function globalSetup(config: FullConfig): Promise<void> {
  console.log('🚀 Starting E2E test environment setup...');

  // Create test data directories
  await mkdir('test-results', { recursive: true });
  await mkdir('test-data/temp', { recursive: true });

  // Setup test server if needed
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Wait for local server to be ready
    console.log('⏳ Waiting for development server...');
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
    console.log('✅ Development server is ready');

    // Prepare test data files
    await setupTestFixtures();

    // Initialize API health check
    await healthCheckAPI(page);

  } catch (error) {
    console.error('❌ Global setup failed:', error);
    throw error;
  } finally {
    await browser.close();
  }

  console.log('✅ E2E test environment setup complete');
}

/**
 * Setup test fixture files
 */
async function setupTestFixtures(): Promise<void> {
  console.log('📁 Setting up test fixtures...');

  // Copy sample Flowise files to test data directory
  const testFixtures = [
    {
      name: 'basic-llm-chain.json',
      content: await import('../fixtures/basic-llm-chain.json')
    },
    {
      name: 'complex-agent-workflow.json', 
      content: await import('../fixtures/complex-agent-workflow.json')
    },
    {
      name: 'invalid-workflow.json',
      content: await import('../fixtures/invalid-workflow.json')
    }
  ];

  for (const fixture of testFixtures) {
    const filePath = join('test-data/temp', fixture.name);
    await writeFile(filePath, JSON.stringify(fixture.content, null, 2));
  }

  console.log('✅ Test fixtures ready');
}

/**
 * Health check API endpoints
 */
async function healthCheckAPI(page: any): Promise<void> {
  console.log('🔍 Checking API health...');

  try {
    // Check main API endpoint
    const response = await page.goto('http://localhost:8080/api/health');
    if (response?.status() !== 200) {
      console.warn('⚠️ API health check failed, continuing anyway');
    } else {
      console.log('✅ API health check passed');
    }
  } catch (error) {
    console.warn('⚠️ API not available for health check, continuing anyway');
  }
}

export default globalSetup;