import { defineConfig } from '@playwright/test';
import baseConfig from './playwright.config';

/**
 * Visual regression testing configuration
 */
export default defineConfig({
  ...baseConfig,
  testDir: './test/e2e/visual',
  use: {
    ...baseConfig.use,
    /* Configure visual comparisons */
    screenshot: 'only-on-failure',
  },
  /* Only run on Chromium for consistent visual testing */
  projects: [
    {
      name: 'chromium-visual',
      use: { 
        ...baseConfig.projects?.[0]?.use,
        viewport: { width: 1280, height: 720 }
      },
    },
  ],
  expect: {
    /* Threshold for visual comparisons */
    toHaveScreenshot: { threshold: 0.3 },
    toMatchSnapshot: { threshold: 0.3 },
  },
});