import { test, expect } from '@playwright/test';
import { FlowiseConverterPage } from '../pages/FlowiseConverterPage';
import path from 'path';

test.describe('Complex Workflow Conversion', () => {
  let converterPage: FlowiseConverterPage;

  test.beforeEach(async ({ page }) => {
    converterPage = new FlowiseConverterPage(page);
    await converterPage.navigateToConverter();
  });

  test('should convert complex agent workflow with multiple tools', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');

    // Act - Upload complex workflow
    await converterPage.uploadFlowiseFile(testFile);

    // Assert - Verify all nodes are loaded
    await converterPage.verifyFlowPreview();
    await converterPage.verifyNodePresent('calculator_0');
    await converterPage.verifyNodePresent('serpAPI_0');
    await converterPage.verifyNodePresent('bufferMemory_0');
    await converterPage.verifyNodePresent('chatOpenAI_0');
    await converterPage.verifyNodePresent('agentExecutor_0');

    // Act - Configure for complex conversion
    await converterPage.configureConversion({
      outputFormat: 'typescript',
      includeTests: true,
      includeDocs: true,
      optimizationLevel: 'advanced'
    });

    // Act - Convert
    await converterPage.startConversion();

    // Assert - Verify complex code generation
    await converterPage.verifyConversionResults();
    
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('AgentExecutor');
    expect(codeContent).toContain('Calculator');
    expect(codeContent).toContain('SerpAPI');
    expect(codeContent).toContain('BufferMemory');
    expect(codeContent).toContain('ChatOpenAI');
  });

  test('should handle agent workflow with memory integration', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Verify memory integration
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('memory');
    expect(codeContent).toContain('BufferMemory');
    expect(codeContent).toContain('history');
  });

  test('should optimize agent workflow for performance', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act - Use advanced optimization
    await converterPage.configureConversion({
      optimizationLevel: 'advanced'
    });
    await converterPage.startConversion();

    // Assert - Check for optimization patterns
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('async'); // Async optimizations
    expect(codeContent).toContain('Promise'); // Promise-based patterns
  });

  test('should generate comprehensive tests for agent workflow', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act - Generate with tests
    await converterPage.configureConversion({
      includeTests: true
    });
    await converterPage.startConversion();
    await converterPage.runTests();

    // Assert - Verify test coverage
    await converterPage.verifyTestResults(true);
    
    // Check if tests cover main components
    const testContent = await converterPage.testResults.textContent();
    expect(testContent).toContain('agent');
    expect(testContent).toContain('tools');
    expect(testContent).toContain('memory');
  });

  test('should handle large workflow with performance monitoring', async () => {
    // This test simulates a large workflow conversion
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Monitor conversion performance
    const startTime = Date.now();
    await converterPage.startConversion();
    const endTime = Date.now();

    const conversionTime = endTime - startTime;
    
    // Assert - Should complete within reasonable time
    expect(conversionTime).toBeLessThan(30000); // 30 seconds max

    // Verify performance metrics
    const metrics = await converterPage.getConversionMetrics();
    expect(metrics.duration).toBeLessThan(30000);
    expect(metrics.nodesProcessed).toBeGreaterThanOrEqual(5);
  });

  test('should maintain workflow integrity during conversion', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Verify workflow structure is preserved
    const codeContent = await converterPage.codePreview.textContent();
    
    // Check that all tools are connected to the agent
    expect(codeContent).toContain('tools: [');
    expect(codeContent).toContain('calculator');
    expect(codeContent).toContain('serpAPI');
    
    // Check that memory is properly integrated
    expect(codeContent).toContain('memory:');
    
    // Check that the agent executor is configured correctly
    expect(codeContent).toContain('AgentExecutor');
    expect(codeContent).toContain('maxIterations');
  });

  test('should support different agent types and configurations', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Verify agent type configuration
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('zero-shot-react-description');
    expect(codeContent).toContain('verbose: true');
    expect(codeContent).toContain('maxIterations: 5');
  });

  test('should handle tool dependencies and initialization order', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Verify initialization order
    const codeContent = await converterPage.codePreview.textContent();
    
    // Tools should be initialized before agent
    const calculatorIndex = codeContent.indexOf('Calculator');
    const serpAPIIndex = codeContent.indexOf('SerpAPI');
    const agentIndex = codeContent.indexOf('AgentExecutor');
    
    expect(calculatorIndex).toBeLessThan(agentIndex);
    expect(serpAPIIndex).toBeLessThan(agentIndex);
  });

  test('should generate proper error handling for complex workflows', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Verify error handling patterns
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('try');
    expect(codeContent).toContain('catch');
    expect(codeContent).toContain('error');
    expect(codeContent).toContain('throw');
  });

  test('should support workflow customization and parameterization', async () => {
    // Arrange
    const testFile = path.join(__dirname, '../fixtures/complex-agent-workflow.json');
    await converterPage.uploadFlowiseFile(testFile);

    // Act
    await converterPage.startConversion();

    // Assert - Verify parameterization
    const codeContent = await converterPage.codePreview.textContent();
    expect(codeContent).toContain('constructor');
    expect(codeContent).toContain('config');
    expect(codeContent).toContain('process.env');
  });
});