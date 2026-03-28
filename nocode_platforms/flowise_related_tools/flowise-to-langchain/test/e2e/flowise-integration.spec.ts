/**
 * E2E Tests for Flowise API Integration
 * Tests the complete workflow: Settings → Browse → Import → Convert
 */

import { test, expect } from '@playwright/test'

test.describe('Flowise API Integration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002')
    
    // Mock Flowise API responses
    await page.route('**/api/v1/chatflows', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([
          {
            id: 'flow-1',
            name: 'Customer Support Bot',
            description: 'AI assistant for customer inquiries',
            deployed: true,
            isPublic: true,
            category: 'Customer Service',
            createdDate: '2024-01-15T10:30:00Z',
            updatedDate: '2024-07-20T15:45:00Z',
            flowData: JSON.stringify({
              nodes: [
                {
                  id: 'chatOpenAI_0',
                  type: 'customNode',
                  data: { label: 'ChatOpenAI', name: 'chatOpenAI' }
                }
              ],
              edges: []
            })
          },
          {
            id: 'flow-2', 
            name: 'Document Q&A System',
            description: 'RAG system for document queries',
            deployed: false,
            isPublic: false,
            category: 'Document Processing',
            createdDate: '2024-02-10T14:20:00Z',
            updatedDate: '2024-07-21T09:15:00Z',
            flowData: JSON.stringify({
              nodes: [
                {
                  id: 'retriever_0',
                  type: 'customNode', 
                  data: { label: 'Retriever', name: 'retriever' }
                }
              ],
              edges: []
            })
          }
        ])
      })
    })

    await page.route('**/api/v1/chatflows/flow-1', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'flow-1',
          name: 'Customer Support Bot',
          flowData: JSON.stringify({
            nodes: [
              {
                id: 'chatOpenAI_0',
                type: 'customNode',
                position: { x: 100, y: 200 },
                data: {
                  label: 'ChatOpenAI',
                  name: 'chatOpenAI',
                  type: 'ChatOpenAI',
                  inputs: {
                    modelName: 'gpt-4',
                    temperature: 0.7
                  }
                }
              }
            ],
            edges: []
          })
        })
      })
    })

    await page.route('**/api/health', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ status: 'healthy', version: '1.0.0' })
      })
    })
  })

  test('should configure Flowise settings successfully', async ({ page }) => {
    // Navigate to settings
    await page.click('[data-testid="nav-settings"]')
    
    // Wait for settings page to load
    await expect(page.locator('h2:has-text("Flowise Configuration")')).toBeVisible()
    
    // Configure Flowise URL
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    
    // Configure API key
    await page.fill('[data-testid="flowise-api-key"]', 'test-api-key-123')
    
    // Test connection
    await page.click('[data-testid="test-connection"]')
    
    // Verify successful connection
    await expect(page.locator('[data-testid="connection-status"]')).toContainText('Connected')
    await expect(page.locator('[data-testid="connection-latency"]')).toBeVisible()
    
    // Save configuration
    await page.click('[data-testid="save-settings"]')
    
    // Verify success message
    await expect(page.locator('[data-testid="notification"]')).toContainText('Settings saved successfully')
  })

  test('should browse and search Flowise flows', async ({ page }) => {
    // First configure settings
    await page.click('[data-testid="nav-settings"]')
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    await page.fill('[data-testid="flowise-api-key"]', 'test-api-key-123')
    await page.click('[data-testid="save-settings"]')
    
    // Navigate to workspace
    await page.click('[data-testid="nav-workspace"]')
    
    // Click on Flowise Integration tab
    await page.click('[data-testid="tab-flowise"]')
    
    // Wait for flows to load
    await expect(page.locator('[data-testid="flow-browser"]')).toBeVisible()
    
    // Verify flows are displayed
    await expect(page.locator('[data-testid="flow-card"]')).toHaveCount(2)
    await expect(page.locator('text=Customer Support Bot')).toBeVisible()
    await expect(page.locator('text=Document Q&A System')).toBeVisible()
    
    // Test search functionality
    await page.fill('[data-testid="flow-search"]', 'Customer')
    await expect(page.locator('[data-testid="flow-card"]')).toHaveCount(1)
    await expect(page.locator('text=Customer Support Bot')).toBeVisible()
    
    // Clear search
    await page.fill('[data-testid="flow-search"]', '')
    await expect(page.locator('[data-testid="flow-card"]')).toHaveCount(2)
    
    // Test category filter
    await page.selectOption('[data-testid="category-filter"]', 'Customer Service')
    await expect(page.locator('[data-testid="flow-card"]')).toHaveCount(1)
    
    // Test deployment status filter
    await page.selectOption('[data-testid="status-filter"]', 'deployed')
    await expect(page.locator('[data-testid="flow-card"]')).toHaveCount(1)
  })

  test('should preview and import a Flowise flow', async ({ page }) => {
    // Configure settings
    await page.click('[data-testid="nav-settings"]')
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    await page.fill('[data-testid="flowise-api-key"]', 'test-api-key-123')
    await page.click('[data-testid="save-settings"]')
    
    // Navigate to workspace and Flowise integration
    await page.click('[data-testid="nav-workspace"]')
    await page.click('[data-testid="tab-flowise"]')
    
    // Wait for flows to load
    await expect(page.locator('[data-testid="flow-card"]')).toHaveCount(2)
    
    // Click on first flow to preview
    await page.click('[data-testid="flow-card"]:first-child')
    
    // Verify preview modal opens
    await expect(page.locator('[data-testid="flow-preview-modal"]')).toBeVisible()
    await expect(page.locator('text=Customer Support Bot')).toBeVisible()
    
    // Verify flow details are shown
    await expect(page.locator('[data-testid="flow-nodes-count"]')).toContainText('1 node')
    await expect(page.locator('[data-testid="flow-complexity"]')).toContainText('Simple')
    await expect(page.locator('[data-testid="flow-category"]')).toContainText('Customer Service')
    
    // Import the flow
    await page.click('[data-testid="import-flow-btn"]')
    
    // Verify import progress
    await expect(page.locator('[data-testid="import-progress"]')).toBeVisible()
    
    // Wait for import completion
    await expect(page.locator('[data-testid="import-success"]')).toBeVisible({ timeout: 10000 })
    
    // Verify flow appears in workspace
    await page.click('[data-testid="close-preview"]')
    await page.click('[data-testid="tab-workspace"]')
    await expect(page.locator('[data-testid="imported-flow"]')).toContainText('Customer Support Bot')
  })

  test('should handle API errors gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/api/v1/chatflows', async route => {
      await route.fulfill({
        status: 500,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Internal Server Error' })
      })
    })
    
    // Configure settings
    await page.click('[data-testid="nav-settings"]')
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    await page.fill('[data-testid="flowise-api-key"]', 'test-api-key-123')
    
    // Test connection (should fail)
    await page.click('[data-testid="test-connection"]')
    
    // Verify error handling
    await expect(page.locator('[data-testid="connection-error"]')).toContainText('Failed to connect')
    await expect(page.locator('[data-testid="error-details"]')).toContainText('Internal Server Error')
    
    // Verify retry mechanism
    await expect(page.locator('[data-testid="retry-button"]')).toBeVisible()
    
    // Test retry functionality
    await page.route('**/api/v1/chatflows', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify([])
      })
    })
    
    await page.click('[data-testid="retry-button"]')
    await expect(page.locator('[data-testid="connection-status"]')).toContainText('Connected')
  })

  test('should handle invalid API responses', async ({ page }) => {
    // Mock invalid JSON response
    await page.route('**/api/v1/chatflows', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: 'invalid json response'
      })
    })
    
    // Configure settings
    await page.click('[data-testid="nav-settings"]')
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    await page.fill('[data-testid="flowise-api-key"]', 'test-api-key-123')
    await page.click('[data-testid="save-settings"]')
    
    // Navigate to workspace
    await page.click('[data-testid="nav-workspace"]')
    await page.click('[data-testid="tab-flowise"]')
    
    // Verify error handling for invalid response
    await expect(page.locator('[data-testid="api-error"]')).toContainText('Invalid response format')
    await expect(page.locator('[data-testid="error-actions"]')).toBeVisible()
  })

  test('should persist settings across sessions', async ({ page, context }) => {
    // Configure settings
    await page.click('[data-testid="nav-settings"]')
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    await page.fill('[data-testid="flowise-api-key"]', 'persistent-key-123')
    await page.click('[data-testid="save-settings"]')
    
    // Verify settings are saved
    await expect(page.locator('[data-testid="notification"]')).toContainText('Settings saved')
    
    // Create new page to simulate new session
    const newPage = await context.newPage()
    await newPage.goto('http://localhost:3002')
    
    // Navigate to settings
    await newPage.click('[data-testid="nav-settings"]')
    
    // Verify settings are persisted
    await expect(newPage.locator('[data-testid="flowise-url"]')).toHaveValue('http://localhost:3000')
    // API key should be encrypted, so check connection status instead
    await expect(newPage.locator('[data-testid="connection-indicator"]')).toContainText('Configured')
  })

  test('should support bulk flow import', async ({ page }) => {
    // Configure settings
    await page.click('[data-testid="nav-settings"]')
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    await page.fill('[data-testid="flowise-api-key"]', 'test-api-key-123')
    await page.click('[data-testid="save-settings"]')
    
    // Navigate to workspace
    await page.click('[data-testid="nav-workspace"]')
    await page.click('[data-testid="tab-flowise"]')
    
    // Wait for flows to load
    await expect(page.locator('[data-testid="flow-card"]')).toHaveCount(2)
    
    // Enable bulk selection mode
    await page.click('[data-testid="bulk-select-toggle"]')
    
    // Select multiple flows
    await page.check('[data-testid="flow-checkbox"]:nth-child(1)')
    await page.check('[data-testid="flow-checkbox"]:nth-child(2)')
    
    // Verify selection count
    await expect(page.locator('[data-testid="selection-count"]')).toContainText('2 selected')
    
    // Import selected flows
    await page.click('[data-testid="bulk-import-btn"]')
    
    // Verify bulk import progress
    await expect(page.locator('[data-testid="bulk-import-progress"]')).toBeVisible()
    await expect(page.locator('[data-testid="import-queue"]')).toContainText('2 flows')
    
    // Wait for completion
    await expect(page.locator('[data-testid="bulk-import-complete"]')).toBeVisible({ timeout: 15000 })
    await expect(page.locator('[data-testid="import-summary"]')).toContainText('2 flows imported successfully')
  })

  test('should validate flow compatibility before import', async ({ page }) => {
    // Mock flow with unsupported nodes
    await page.route('**/api/v1/chatflows/flow-1', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          id: 'flow-1',
          name: 'Unsupported Flow',
          flowData: JSON.stringify({
            nodes: [
              {
                id: 'unsupported_0',
                type: 'customNode',
                data: { label: 'UnsupportedNode', name: 'unsupportedNode' }
              }
            ],
            edges: []
          })
        })
      })
    })
    
    // Configure and navigate
    await page.click('[data-testid="nav-settings"]')
    await page.fill('[data-testid="flowise-url"]', 'http://localhost:3000')
    await page.fill('[data-testid="flowise-api-key"]', 'test-api-key-123')
    await page.click('[data-testid="save-settings"]')
    
    await page.click('[data-testid="nav-workspace"]')
    await page.click('[data-testid="tab-flowise"]')
    
    // Click on flow to preview
    await page.click('[data-testid="flow-card"]:first-child')
    
    // Verify compatibility warning
    await expect(page.locator('[data-testid="compatibility-warning"]')).toBeVisible()
    await expect(page.locator('[data-testid="unsupported-nodes"]')).toContainText('UnsupportedNode')
    
    // Verify import button is disabled or shows warning
    await expect(page.locator('[data-testid="import-flow-btn"]')).toHaveAttribute('data-warning', 'true')
  })
})