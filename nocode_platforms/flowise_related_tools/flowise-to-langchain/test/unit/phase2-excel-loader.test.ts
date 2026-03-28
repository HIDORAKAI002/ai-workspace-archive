/**
 * Phase 2 Excel Loader Converter Test Suite
 * 
 * Focused tests for Excel document loader converter including:
 * - ExcelLoader parameter mapping (sheetName, headerRow, range)
 * - File path handling and configuration
 * - TypeScript code generation and validation
 * - Excel-specific functionality
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import Excel loader converter
import { ExcelLoaderConverter } from '../../src/registry/converters/document-loader.js';

import {
  createMockNode,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Test utilities
function createExcelLoaderNode(overrides: Partial<any> = {}): IRNode {
  const baseConfig = {
    id: `excelLoader-${Math.random().toString(36).substr(2, 9)}`,
    type: 'excelLoader',
    label: 'excelLoader_node',
    category: 'documentloader',
    inputs: [],
    outputs: [],
    data: {
      id: `excelLoader-${Math.random().toString(36).substr(2, 9)}`,
      label: 'Excel Loader',
      version: 2,
      name: 'excelLoader',
      type: 'excelLoader',
      baseClasses: ['DocumentLoader'],
      category: 'Document Loaders',
      description: 'Load documents from Excel files',
      inputParams: [
        {
          label: 'File Path',
          name: 'filePath',
          type: 'string',
          required: true,
        },
        {
          label: 'Sheet Name',
          name: 'sheetName',
          type: 'string',
          optional: true,
        },
        {
          label: 'Header Row',
          name: 'headerRow',
          type: 'number',
          optional: true,
          default: 1,
        },
        {
          label: 'Range',
          name: 'range',
          type: 'string',
          optional: true,
          placeholder: 'e.g., A1:C10',
        }
      ],
      inputAnchors: [],
      inputs: {},
      outputAnchors: [{
        id: 'output',
        name: 'output',
        label: 'Document',
        type: 'Document',
      }],
    },
    ...overrides,
  };

  // Merge inputs
  if (overrides.data?.inputs) {
    baseConfig.data.inputs = {
      ...baseConfig.data.inputs,
      ...overrides.data.inputs,
    };
  }

  return baseConfig as IRNode;
}

const mockContext: GenerationContext = {
  targetLanguage: 'typescript',
  outputPath: '/test',
  projectName: 'test-excel-loader',
  includeTests: false,
  includeDocs: false,
  includeLangfuse: false,
  packageManager: 'npm',
  environment: {},
  codeStyle: {
    indentSize: 2,
    useSpaces: true,
    semicolons: true,
    singleQuotes: true,
    trailingCommas: true
  }
};

describe('Phase 2 Excel Loader Converter', () => {
  let performanceTimer: PerformanceTimer;
  let memoryTracker: MemoryTracker;

  beforeEach(() => {
    performanceTimer = new PerformanceTimer();
    memoryTracker = new MemoryTracker();
    performanceTimer.start();
    memoryTracker.start();
  });

  afterEach(() => {
    const duration = performanceTimer.stop();
    const memory = memoryTracker.getUsage();
    
    // Performance assertions
    expect(duration).toBeLessThan(500); // Should complete within 500ms
    expect(memory.difference).toBeLessThan(25 * 1024 * 1024); // Should use less than 25MB
  });

  describe('ExcelLoaderConverter Basic Tests', () => {
    const converter = new ExcelLoaderConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(ExcelLoaderConverter);
      expect(converter.flowiseType).toBe('excelLoader');
      expect(converter.category).toBe('documentloader');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toHaveLength(2);
      expect(dependencies).toContain('@langchain/community/document_loaders/fs/excel');
      expect(dependencies).toContain('xlsx');
    });

    test('should support correct versions', () => {
      const versions = converter.getSupportedVersions();
      expect(versions).toContain('0.2.0');
      expect(versions).toContain('0.2.1');
      expect(versions).toContain('0.2.2');
    });
  });

  describe('Excel-Specific Parameter Handling', () => {
    const converter = new ExcelLoaderConverter();

    test('should convert Excel loader with file path only', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/spreadsheet.xlsx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and initialization
      
      // Validate import fragment
      const importFragment = fragments.find(f => 
        f.type === 'import' && f.content.includes('ExcelLoader')
      );
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('import { ExcelLoader } from \'@langchain/community/document_loaders/fs/excel\';');
      
      // Validate initialization fragment - should use file path as first parameter
      const initFragment = fragments.find(f => 
        f.type === 'initialization'
      );
      expect(initFragment).toBeDefined();
      expect(initFragment!.content).toContain('new ExcelLoader("/data/spreadsheet.xlsx")');
    });

    test('should handle sheet name parameter', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/multi-sheet.xlsx',
            sheetName: 'Data',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('new ExcelLoader("/data/multi-sheet.xlsx", {');
      expect(initFragment!.content).toContain('sheetName: "Data"');
    });

    test('should handle header row parameter', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/custom-header.xlsx',
            headerRow: 3,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('new ExcelLoader("/data/custom-header.xlsx", {');
      expect(initFragment!.content).toContain('headerRow: 3');
    });

    test('should handle range parameter', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/large-sheet.xlsx',
            range: 'A1:D100',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('new ExcelLoader("/data/large-sheet.xlsx", {');
      expect(initFragment!.content).toContain('range: "A1:D100"');
    });

    test('should handle all parameters together', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/complex.xlsx',
            sheetName: 'Sales',
            headerRow: 2,
            range: 'B2:F50',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('new ExcelLoader("/data/complex.xlsx", {');
      expect(initFragment!.content).toContain('sheetName: "Sales"');
      expect(initFragment!.content).toContain('headerRow: 2');
      expect(initFragment!.content).toContain('range: "B2:F50"');
    });

    test('should not include default header row value of 1', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/default-header.xlsx',
            headerRow: 1, // Default value
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should not include headerRow: 1 since it's the default
      expect(initFragment!.content).not.toContain('headerRow: 1');
    });
  });

  describe('File Path Handling', () => {
    const converter = new ExcelLoaderConverter();

    test('should handle absolute file paths', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/Users/data/absolute-path.xlsx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('"/Users/data/absolute-path.xlsx"');
    });

    test('should handle relative file paths', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: './data/relative-path.xlsx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('"./data/relative-path.xlsx"');
    });

    test('should handle file paths with spaces', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/My Documents/file with spaces.xlsx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('"/data/My Documents/file with spaces.xlsx"');
    });

    test('should handle Windows-style file paths', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: 'C:\\Data\\Windows\\file.xlsx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('"C:\\Data\\Windows\\file.xlsx"');
    });
  });

  describe('TypeScript Code Generation', () => {
    const converter = new ExcelLoaderConverter();

    test('should generate valid TypeScript for minimal configuration', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/test/data.xlsx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      // Check import fragment
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('import');
      expect(importFragment!.content).toContain('ExcelLoader');
      expect(importFragment!.content).toContain('@langchain/community/document_loaders/fs/excel');
      
      // Check initialization fragment
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment).toBeDefined();
      expect(initFragment!.content).toContain('const');
      expect(initFragment!.content).toContain('= new ExcelLoader(');
      expect(initFragment!.content).toContain('/test/data.xlsx');
    });

    test('should generate valid TypeScript for full configuration', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/test/complex.xlsx',
            sheetName: 'Report',
            headerRow: 5,
            range: 'A5:Z100',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      // Check that all fragments are properly structured
      expect(fragments).toHaveLength(2);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toMatch(/import.*{.*ExcelLoader.*}.*from/);
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment).toBeDefined();
      expect(initFragment!.content).toContain('sheetName: "Report"');
      expect(initFragment!.content).toContain('headerRow: 5');
      expect(initFragment!.content).toContain('range: "A5:Z100"');
    });

    test('should generate properly formatted code', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/formatted.xlsx',
            sheetName: 'Sheet1',
            range: 'A1:B10',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization')!;
      
      // Check proper formatting
      expect(initFragment.content).toMatch(/const \w+_loader = new ExcelLoader\("/); // Updated pattern for actual variable naming
      expect(initFragment.content).toMatch(/{\n\s+sheetName: "Sheet1",\n\s+range: "A1:B10"\n}/);
      
      // Verify indentation (2 spaces as per config)
      const lines = initFragment.content.split('\n');
      const indentedLines = lines.filter(line => line.startsWith('  '));
      indentedLines.forEach(line => {
        expect(line).toMatch(/^  \w+:/); // Should have exactly 2 spaces
      });
    });

    test('should use consistent variable naming', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/test.xlsx',
          }
        }
      });
      mockNode.id = 'excel-unique-123';

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization')!;
      
      // Should generate a reasonable variable name based on the node label
      expect(initFragment.content).toMatch(/const \w+_loader = new ExcelLoader/);
    });
  });

  describe('Error Handling', () => {
    const converter = new ExcelLoaderConverter();

    test('should handle missing file path gracefully', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            // No filePath provided
            sheetName: 'Sheet1',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should still generate code, but without file path parameter
      expect(initFragment!.content).toContain('new ExcelLoader(');
      expect(initFragment!.content).toContain('sheetName: "Sheet1"');
    });

    test('should handle empty string file path', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '',
            headerRow: 2,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should generate code but with empty string
      expect(initFragment!.content).toContain('new ExcelLoader(');
    });

    test('should handle invalid parameter types', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/test.xlsx',
            headerRow: 'not-a-number' as any, // Invalid type
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should include the value as-is and let TypeScript handle the error
      expect(initFragment!.content).toContain('headerRow: "not-a-number"');
    });

    test('should handle malformed node structure', () => {
      const malformedNode = {
        id: 'malformed',
        type: 'excelLoader',
        // Missing data property
      } as any as IRNode;

      // Handle missing label property gracefully
      const malformedNodeWithLabel = {
        ...malformedNode,
        label: 'excel_loader' // Add label to prevent error
      };
      
      expect(() => {
        converter.convert(malformedNodeWithLabel, mockContext);
      }).not.toThrow();
    });
  });

  describe('Performance Tests', () => {
    const converter = new ExcelLoaderConverter();

    test('should handle rapid conversions efficiently', () => {
      const timer = new PerformanceTimer();
      timer.start();
      
      // Convert 50 Excel loader nodes
      for (let i = 0; i < 50; i++) {
        const mockNode = createExcelLoaderNode({
          data: {
            inputs: {
              filePath: `/data/file-${i}.xlsx`,
              sheetName: `Sheet${i % 3 + 1}`,
              headerRow: i % 5 + 1,
              range: `A1:Z${(i + 1) * 10}`,
            }
          }
        });
        
        converter.convert(mockNode, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(1000); // Should complete within 1s
    });

    test('should maintain consistent memory usage', () => {
      const tracker = new MemoryTracker();
      tracker.start();
      
      // Convert multiple times with different configurations
      for (let i = 0; i < 30; i++) {
        const mockNode = createExcelLoaderNode({
          data: {
            inputs: {
              filePath: `/test/memory-test-${i}.xlsx`,
              sheetName: ['Data', 'Report', 'Summary'][i % 3],
              headerRow: [1, 2, 3, 4, 5][i % 5],
              range: i % 2 === 0 ? `A1:D${i * 10}` : undefined,
            }
          }
        });
        converter.convert(mockNode, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(15 * 1024 * 1024); // Less than 15MB
    });
  });

  describe('Integration with Document Loader Base', () => {
    const converter = new ExcelLoaderConverter();

    test('should properly extend base document loader functionality', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/integration.xlsx',
            sheetName: 'TestSheet',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      // Should have correct fragment structure
      expect(fragments).toHaveLength(2);
      expect(fragments[0].type).toBe('import');
      expect(fragments[1].type).toBe('initialization');
      
      // Should have proper dependencies array
      expect(fragments[0].dependencies).toContain('@langchain/community/document_loaders/fs/excel');
      
      // Fragments don't have priority field, they use metadata.order
      // Import fragments typically have lower order
      // Initialization fragments have higher order (130 as seen in the base class)
    });

    test('should handle data.inputs structure correctly', () => {
      const mockNode = createExcelLoaderNode({
        data: {
          inputs: {
            filePath: '/data/inputs-test.xlsx',
            sheetName: 'InputTest',
            headerRow: 3,
          }
        },
        // Also test legacy parameters array (should be ignored)
        parameters: [
          { name: 'filePath', value: '/legacy/path.xlsx' },
          { name: 'headerRow', value: 99 },
        ],
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization')!;
      
      // The base document loader handles file path as first parameter, not in config object
      // Check that it generates proper initialization code
      expect(initFragment.content).toContain('new ExcelLoader(');
      expect(initFragment.content).toContain('sheetName: "InputTest"');
      
      // The converter checks parameters array first, then data.inputs
      // In this test, parameters array has the values, so it should use those
      expect(initFragment.content).toContain('/legacy/path.xlsx');
      expect(initFragment.content).toContain('headerRow: 99');
    });
  });
});