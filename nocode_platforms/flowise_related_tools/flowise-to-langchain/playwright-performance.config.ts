import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Performance testing configuration
 */
export default defineConfig({
  ...baseConfig,
  testDir: './test/e2e/performance',
  use: {
    ...baseConfig.use,
    /* Performance testing specific settings */
    trace: 'on',
    video: 'on',
  },
  /* Run performance tests on specific browsers */
  projects: [
    {
      name: 'chromium-performance',
      use: { 
        ...baseConfig.projects?.[0]?.use,
        launchOptions: {
          args: [
            '--disable-web-security',
            '--disable-features=TranslateUI',
            '--disable-ipc-flooding-protection',
            '--no-sandbox'
          ]
        }
      },
    },
  ],
  /* Longer timeout for performance tests */
  timeout: 120000,
  expect: {
    timeout: 30000,
  },
});