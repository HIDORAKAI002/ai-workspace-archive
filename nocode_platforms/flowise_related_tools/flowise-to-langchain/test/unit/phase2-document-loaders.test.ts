/**
 * Phase 2 Document Loader Converter Test Suite
 * 
 * Tests for all document loader converters including:
 * - PDFLoader, CSVLoader, JSONLoader, TextLoader
 * - DocxLoader, DirectoryLoader, WebLoader
 * - Parameter mapping and validation
 * - Code generation and TypeScript compilation
 */

import { describe, test, expect, beforeEach, afterEach } from '@jest/globals';
import type { IRNode, GenerationContext, CodeFragment } from '../../src/ir/types.js';

// Import all document loader converters
import {
  PDFLoaderConverter,
  CSVLoaderConverter,
  JSONLoaderConverter,
  TextLoaderConverter,
  DocxLoaderConverter,
  DirectoryLoaderConverter,
  ExcelLoaderConverter,
  WebBaseLoaderConverter,
  WebLoaderConverter,
} from '../../src/registry/converters/document-loader.js';

import {
  createMockNode,
  validateTypeScriptCode,
  PerformanceTimer,
  MemoryTracker,
} from '../utils/test-helpers.js';

// Test utilities
function createDocumentLoaderNode(
  loaderType: string,
  overrides: Partial<any> = {}
): IRNode {
  const baseConfig = {
    id: `${loaderType}-${Math.random().toString(36).substr(2, 9)}`,
    type: loaderType,
    label: `${loaderType}_node`,
    category: 'documentloader',
    inputs: [],
    outputs: [],
    data: {
      id: `${loaderType}-${Math.random().toString(36).substr(2, 9)}`,
      label: loaderType.charAt(0).toUpperCase() + loaderType.slice(1),
      version: 2,
      name: loaderType,
      type: loaderType,
      baseClasses: ['DocumentLoader'],
      category: 'Document Loaders',
      description: `Load documents using ${loaderType}`,
      inputParams: [],
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
  projectName: 'test-document-loaders',
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

describe('Phase 2 Document Loader Converters', () => {
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
    expect(duration).toBeLessThan(1000); // Should complete within 1s
    expect(memory.difference).toBeLessThan(50 * 1024 * 1024); // Should use less than 50MB
  });

  describe('PDFLoaderConverter', () => {
    const converter = new PDFLoaderConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(PDFLoaderConverter);
      expect(converter.flowiseType).toBe('pdfLoader');
      expect(converter.category).toBe('documentloader');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community/document_loaders/fs/pdf');
      expect(dependencies).toContain('pdf-parse');
    });

    test('should convert basic PDF loader node', () => {
      const mockNode = createDocumentLoaderNode('pdfLoader', {
        data: {
          inputs: {
            filePath: '/path/to/document.pdf',
            splitPages: true,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2); // import and initialization
      
      // Validate import fragment
      const importFragment = fragments.find(f => 
        f.type === 'import' && f.content.includes('PDFLoader')
      );
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('@langchain/community/document_loaders/fs/pdf');
      expect(importFragment!.content).toContain('PDFLoader');
      
      // Validate initialization fragment
      const initFragment = fragments.find(f => 
        f.type === 'initialization'
      );
      expect(initFragment).toBeDefined();
      expect(initFragment!.content).toContain('new PDFLoader');
      expect(initFragment!.content).toContain('"/path/to/document.pdf"');
      expect(initFragment!.content).toContain('splitPages: true');
    });

    test('should handle missing optional parameters', () => {
      const mockNode = createDocumentLoaderNode('pdfLoader', {
        data: {
          inputs: {
            filePath: '/path/to/document.pdf',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // PDFLoader takes file path as first parameter
      expect(initFragment!.content).toContain('new PDFLoader("/path/to/document.pdf"');
      expect(initFragment!.content).toContain('splitPages: true'); // Default value
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createDocumentLoaderNode('pdfLoader', {
        data: {
          inputs: {
            filePath: '/test/document.pdf',
            splitPages: false,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n\n');
      
      // Check for valid TypeScript patterns
      expect(code).toContain('import { PDFLoader }');
      expect(code).toContain('from \'@langchain/community/document_loaders/fs/pdf\'');
      expect(code).toContain('const pdfloader_node_loader = new PDFLoader');
      expect(code).toContain('splitPages: false');
    });
  });

  describe('CSVLoaderConverter', () => {
    const converter = new CSVLoaderConverter();

    test('should convert CSV loader with all parameters', () => {
      const mockNode = createDocumentLoaderNode('csvLoader', {
        data: {
          inputs: {
            filePath: '/data/records.csv',
            column: 'content',
            separator: ';',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      expect(fragments).toHaveLength(2);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment!.content).toContain('CSVLoader');
      expect(importFragment!.content).toContain('@langchain/community/document_loaders/fs/csv');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      // CSVLoader takes file path as first parameter
      expect(initFragment!.content).toContain('new CSVLoader("/data/records.csv"');
      expect(initFragment!.content).toContain('column: "content"');
      expect(initFragment!.content).toContain('separator: ";"');
    });

    test('should use default separator when not provided', () => {
      const mockNode = createDocumentLoaderNode('csvLoader', {
        data: {
          inputs: {
            filePath: '/data/records.csv',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('separator: ","'); // Default comma
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community/document_loaders/fs/csv');
      expect(dependencies).toContain('csv-parser');
    });
  });

  describe('JSONLoaderConverter', () => {
    const converter = new JSONLoaderConverter();

    test('should convert JSON loader with pointers', () => {
      const mockNode = createDocumentLoaderNode('jsonLoader', {
        data: {
          inputs: {
            filePath: '/data/config.json',
            pointers: ['/data/items', '/metadata/description'],
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment!.content).toContain('JSONLoader');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      // JSONLoader uses config object (not file path as first parameter)
      expect(initFragment!.content).toContain('new JSONLoader({');
      expect(initFragment!.content).toContain('filePath: "/data/config.json"');
      expect(initFragment!.content).toContain('pointers: ["/data/items", "/metadata/description"]');
    });

    test('should handle missing pointers', () => {
      const mockNode = createDocumentLoaderNode('jsonLoader', {
        data: {
          inputs: {
            filePath: '/data/simple.json',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // JSONLoader uses config object
      expect(initFragment!.content).toContain('new JSONLoader({');
      expect(initFragment!.content).toContain('filePath: "/data/simple.json"');
      expect(initFragment!.content).not.toContain('pointers');
    });
  });

  describe('TextLoaderConverter', () => {
    const converter = new TextLoaderConverter();

    test('should convert text loader with custom encoding', () => {
      const mockNode = createDocumentLoaderNode('textLoader', {
        data: {
          inputs: {
            filePath: '/docs/readme.txt',
            encoding: 'utf16',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      // TextLoader takes file path as first parameter
      expect(initFragment!.content).toContain('new TextLoader("/docs/readme.txt"');
      expect(initFragment!.content).toContain('encoding: "utf16"');
    });

    test('should use default UTF-8 encoding', () => {
      const mockNode = createDocumentLoaderNode('textLoader', {
        data: {
          inputs: {
            filePath: '/docs/standard.txt',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('encoding: "utf8"'); // Default
    });
  });

  describe('DocxLoaderConverter', () => {
    const converter = new DocxLoaderConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(DocxLoaderConverter);
      expect(converter.flowiseType).toBe('docxLoader');
      expect(converter.category).toBe('documentloader');
    });

    test('should convert docx loader with file path as first argument', () => {
      const mockNode = createDocumentLoaderNode('docxLoader', {
        data: {
          inputs: {
            filePath: '/documents/report.docx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('DocxLoader');
      expect(importFragment!.content).toContain('@langchain/community/document_loaders/fs/docx');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment).toBeDefined();
      // DocxLoader takes file path as first parameter
      expect(initFragment!.content).toContain('new DocxLoader("/documents/report.docx")');
      expect(initFragment!.content).not.toContain('filePath:'); // File path is NOT in config object
    });

    test('should handle missing file path', () => {
      const mockNode = createDocumentLoaderNode('docxLoader', {
        data: {
          inputs: {}
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should still generate code even without file path
      expect(initFragment!.content).toContain('new DocxLoader()');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community/document_loaders/fs/docx');
      expect(dependencies).toContain('mammoth');
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createDocumentLoaderNode('docxLoader', {
        data: {
          inputs: {
            filePath: '/test/document.docx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content || '').join('\n\n');
      
      expect(code).toContain('import { DocxLoader } from \'@langchain/community/document_loaders/fs/docx\';');
      expect(code).toContain('const docxloader_node_loader = new DocxLoader("/test/document.docx");');
    });
  });

  describe('DirectoryLoaderConverter', () => {
    const converter = new DirectoryLoaderConverter();

    test('should convert directory loader with all options', () => {
      const mockNode = createDocumentLoaderNode('directoryLoader', {
        data: {
          inputs: {
            directoryPath: '/documents/all',
            extensions: ['.txt', '.md', '.doc'],
            recursive: false,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      // DirectoryLoader takes directory path as first parameter
      expect(initFragment!.content).toContain('new DirectoryLoader("/documents/all"');
      expect(initFragment!.content).toContain('extensions: [".txt", ".md", ".doc"]');
      expect(initFragment!.content).toContain('recursive: false');
    });

    test('should use defaults for missing parameters', () => {
      const mockNode = createDocumentLoaderNode('directoryLoader', {
        data: {
          inputs: {
            directoryPath: '/documents',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toContain('extensions: [".txt"]'); // Default
      expect(initFragment!.content).toContain('recursive: true'); // Default
    });
  });

  describe('ExcelLoaderConverter - Enhanced Tests', () => {
    const converter = new ExcelLoaderConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(ExcelLoaderConverter);
      expect(converter.flowiseType).toBe('excelLoader');
      expect(converter.category).toBe('documentloader');
    });

    test('should convert Excel loader with file path as first argument', () => {
      const mockNode = createDocumentLoaderNode('excelLoader', {
        data: {
          inputs: {
            filePath: '/data/spreadsheet.xlsx',
            sheetName: 'Data',
            headerRow: 2,
            range: 'A1:Z100',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('ExcelLoader');
      expect(importFragment!.content).toContain('@langchain/community/document_loaders/fs/excel');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment).toBeDefined();
      // ExcelLoader takes file path as first parameter, config as second
      expect(initFragment!.content).toContain('new ExcelLoader("/data/spreadsheet.xlsx", {');
      expect(initFragment!.content).toContain('sheetName: "Data"');
      expect(initFragment!.content).toContain('headerRow: 2');
      expect(initFragment!.content).toContain('range: "A1:Z100"');
      expect(initFragment!.content).not.toContain('filePath:'); // File path is NOT in config
    });

    test('should omit default headerRow value', () => {
      const mockNode = createDocumentLoaderNode('excelLoader', {
        data: {
          inputs: {
            filePath: '/data/simple.xlsx',
            headerRow: 1, // Default value
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // headerRow: 1 is default, should not be included
      expect(initFragment!.content).not.toContain('headerRow');
      expect(initFragment!.content).toBe('const excelloader_node_loader = new ExcelLoader("/data/simple.xlsx");');
    });

    test('should handle minimal configuration', () => {
      const mockNode = createDocumentLoaderNode('excelLoader', {
        data: {
          inputs: {
            filePath: '/data/basic.xlsx',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      expect(initFragment!.content).toBe('const excelloader_node_loader = new ExcelLoader("/data/basic.xlsx");');
    });

    test('should handle missing file path', () => {
      const mockNode = createDocumentLoaderNode('excelLoader', {
        data: {
          inputs: {
            sheetName: 'Sheet1',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should generate config-based initialization when no file path
      expect(initFragment!.content).toContain('new ExcelLoader({');
      expect(initFragment!.content).toContain('sheetName: "Sheet1"');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community/document_loaders/fs/excel');
      expect(dependencies).toContain('xlsx');
    });
  });

  describe('WebBaseLoaderConverter', () => {
    const converter = new WebBaseLoaderConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(WebBaseLoaderConverter);
      expect(converter.flowiseType).toBe('webBaseLoader');
      expect(converter.category).toBe('documentloader');
    });

    test('should convert web loader with URL as first argument', () => {
      const mockNode = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            url: 'https://example.com/docs',
            selector: '.content-main',
            maxConcurrency: 3,
            timeout: 10000,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment).toBeDefined();
      expect(importFragment!.content).toContain('WebBaseLoader');
      expect(importFragment!.content).toContain('@langchain/community/document_loaders/web/web_base');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      expect(initFragment).toBeDefined();
      // WebBaseLoader takes URL as first parameter, config as second
      expect(initFragment!.content).toContain('new WebBaseLoader("https://example.com/docs", {');
      expect(initFragment!.content).toContain('selector: ".content-main"');
      expect(initFragment!.content).toContain('maxConcurrency: 3');
      expect(initFragment!.content).toContain('timeout: 10000');
      expect(initFragment!.content).not.toContain('url:'); // URL is NOT in config
    });

    test('should handle webPath alias for URL', () => {
      const mockNode = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            webPath: 'https://api.example.com/data',
            selector: '#api-docs',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should use webPath value as URL parameter
      expect(initFragment!.content).toContain('new WebBaseLoader("https://api.example.com/data", {');
      expect(initFragment!.content).toContain('selector: "#api-docs"');
    });

    test('should handle minimal configuration', () => {
      const mockNode = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            url: 'https://simple.com',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // maxConcurrency: 1 is always included as it's the default
      expect(initFragment!.content).toContain('new WebBaseLoader("https://simple.com", {');
      expect(initFragment!.content).toContain('maxConcurrency: 1');
    });

    test('should omit default maxConcurrency value', () => {
      const mockNode = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            url: 'https://test.com',
            maxConcurrency: 1, // Default value
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // maxConcurrency: 1 is default, still included in config
      expect(initFragment!.content).toContain('new WebBaseLoader("https://test.com", {');
      expect(initFragment!.content).toContain('maxConcurrency: 1');
    });

    test('should handle missing URL', () => {
      const mockNode = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            selector: '.content',
            timeout: 5000,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should generate config-based initialization when no URL
      expect(initFragment!.content).toContain('new WebBaseLoader({');
      expect(initFragment!.content).toContain('selector: ".content"');
      expect(initFragment!.content).toContain('timeout: 5000');
    });

    test('should provide correct dependencies', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community/document_loaders/web/web_base');
      expect(dependencies).toHaveLength(1); // No additional dependencies needed
    });

    test('should generate valid TypeScript code', () => {
      const mockNode = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            url: 'https://docs.example.com/api',
            selector: 'article.doc-content',
            maxConcurrency: 5,
            timeout: 30000,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content || '').join('\n\n');
      
      // Check for valid TypeScript patterns
      expect(code).toContain('import { WebBaseLoader }');
      expect(code).toContain('from \'@langchain/community/document_loaders/web/web_base\'');
      expect(code).toContain('const webbaseloader_node_loader = new WebBaseLoader');
      expect(code).toContain('"https://docs.example.com/api"');
      expect(code).toContain('selector: "article.doc-content"');
      expect(code).toContain('maxConcurrency: 5');
      expect(code).toContain('timeout: 30000');
    });
  });

  describe('WebLoaderConverter (CheerioWebBaseLoader)', () => {
    const converter = new WebLoaderConverter();

    test('should be instantiable with correct properties', () => {
      expect(converter).toBeInstanceOf(WebLoaderConverter);
      expect(converter.flowiseType).toBe('webLoader');
      expect(converter.category).toBe('documentloader');
      expect(converter.isDeprecated()).toBe(true);
      expect(converter.getReplacementType()).toBe('webBaseLoader');
    });

    test('should convert to CheerioWebBaseLoader', () => {
      const mockNode = createDocumentLoaderNode('webLoader', {
        data: {
          inputs: {
            webPath: 'https://example.com/docs',
            selector: '.content-main',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      
      const importFragment = fragments.find(f => f.type === 'import');
      expect(importFragment!.content).toContain('CheerioWebBaseLoader');
      expect(importFragment!.content).toContain('@langchain/community/document_loaders/web/cheerio');
      
      const initFragment = fragments.find(f => f.type === 'initialization');
      // CheerioWebBaseLoader takes URL as first parameter
      expect(initFragment!.content).toContain('new CheerioWebBaseLoader("https://example.com/docs", {');
      expect(initFragment!.content).toContain('selector: ".content-main"');
    });

    test('should handle url parameter alias', () => {
      const mockNode = createDocumentLoaderNode('webLoader', {
        data: {
          inputs: {
            url: 'https://api.example.com',
            selector: '#docs',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should use url value as first parameter
      expect(initFragment!.content).toContain('new CheerioWebBaseLoader("https://api.example.com", {');
      expect(initFragment!.content).toContain('selector: "#docs"');
    });

    test('should provide cheerio dependency', () => {
      const dependencies = converter.getDependencies();
      expect(dependencies).toContain('@langchain/community/document_loaders/web/cheerio');
      expect(dependencies).toContain('cheerio');
    });
  });

  describe('Integration Tests', () => {
    test('all converters should generate valid TypeScript', () => {
      const converters = [
        new PDFLoaderConverter(),
        new CSVLoaderConverter(),
        new JSONLoaderConverter(),
        new TextLoaderConverter(),
        new DocxLoaderConverter(),
        new DirectoryLoaderConverter(),
        new ExcelLoaderConverter(),
        new WebBaseLoaderConverter(),
        new WebLoaderConverter(),
      ];

      const loaderTypes = [
        'pdfLoader',
        'csvLoader',
        'jsonLoader',
        'textLoader',
        'docxLoader',
        'directoryLoader',
        'excelLoader',
        'webBaseLoader',
        'webLoader',
      ];

      converters.forEach((converter, index) => {
        const mockNode = createDocumentLoaderNode(loaderTypes[index], {
          data: {
            inputs: {
              filePath: '/test/file',
              url: 'https://test.com',
              webPath: 'https://test.com',
              directoryPath: '/test/dir',
            }
          }
        });

        const fragments = converter.convert(mockNode, mockContext);
        const code = fragments.map(f => f.content).join('\n\n');
        
        // Basic TypeScript validation
        expect(code).toContain('import {');
        expect(code).toContain('from \'@langchain/community');
        expect(code).toContain('= new ');
        expect(code.split('\n').length).toBeGreaterThan(1);
      });
    });

    test('should handle concurrent conversions', async () => {
      const converter = new PDFLoaderConverter();
      const promises = [];

      // Create 10 concurrent conversions
      for (let i = 0; i < 10; i++) {
        const mockNode = createDocumentLoaderNode('pdfLoader', {
          data: {
            inputs: {
              filePath: `/path/document-${i}.pdf`,
              splitPages: i % 2 === 0,
            }
          }
        });

        promises.push(
          Promise.resolve(converter.convert(mockNode, mockContext))
        );
      }

      const results = await Promise.all(promises);
      expect(results).toHaveLength(10);
      results.forEach(fragments => {
        expect(fragments).toHaveLength(2); // import and init
      });
    });
  });

  describe('Performance Tests', () => {
    test('should handle bulk conversion efficiently', () => {
      const converters = [
        new PDFLoaderConverter(),
        new CSVLoaderConverter(),
        new JSONLoaderConverter(),
        new TextLoaderConverter(),
      ];

      const timer = new PerformanceTimer();
      timer.start();
      
      // Convert 100 nodes
      for (let i = 0; i < 100; i++) {
        const converter = converters[i % converters.length];
        const loaderType = ['pdfLoader', 'csvLoader', 'jsonLoader', 'textLoader'][i % 4];
        
        const mockNode = createDocumentLoaderNode(loaderType, {
          data: {
            inputs: {
              filePath: `/path/file-${i}`,
            }
          }
        });
        
        converter.convert(mockNode, mockContext);
      }
      
      const duration = timer.stop();
      expect(duration).toBeLessThan(2000); // Should complete within 2s
    });

    test('should have consistent memory usage', () => {
      const converter = new PDFLoaderConverter();
      const tracker = new MemoryTracker();
      
      tracker.start();
      
      // Convert multiple times
      for (let i = 0; i < 50; i++) {
        const mockNode = createDocumentLoaderNode('pdfLoader', {
          data: {
            inputs: {
              filePath: `/test/document-${i}.pdf`,
            }
          }
        });
        converter.convert(mockNode, mockContext);
      }
      
      const memory = tracker.getUsage();
      expect(memory.difference).toBeLessThan(20 * 1024 * 1024); // Less than 20MB
    });
  });

  describe('Error Handling', () => {
    test('should handle malformed node data gracefully', () => {
      const converter = new PDFLoaderConverter();
      
      const malformedNode = {
        id: 'malformed',
        type: 'pdfLoader',
        label: 'PDF_Loader', // Add required label field
        // Missing other fields
      } as any as IRNode;

      expect(() => {
        converter.convert(malformedNode, mockContext);
      }).not.toThrow();
      
      // Should still generate some code
      const fragments = converter.convert(malformedNode, mockContext);
      expect(fragments.length).toBeGreaterThan(0);
    });

    test('should handle missing input parameters', () => {
      const converter = new CSVLoaderConverter();
      
      const nodeWithoutInputs = createDocumentLoaderNode('csvLoader');
      delete nodeWithoutInputs.data.inputs;

      const fragments = converter.convert(nodeWithoutInputs, mockContext);
      expect(fragments).toHaveLength(2);
    });

    test('should handle empty file paths', () => {
      const converter = new TextLoaderConverter();
      
      const nodeWithEmptyPath = createDocumentLoaderNode('textLoader', {
        data: {
          inputs: {
            filePath: '',
          }
        }
      });

      const fragments = converter.convert(nodeWithEmptyPath, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should still generate code, even with empty path
      // TextLoader uses config object when file path is empty
      expect(initFragment!.content).toContain('new TextLoader({');
      expect(initFragment!.content).toContain('encoding: "utf8"');
    });

    test('should handle special characters in file paths', () => {
      const converter = new DocxLoaderConverter();
      
      const nodeWithSpecialPath = createDocumentLoaderNode('docxLoader', {
        data: {
          inputs: {
            filePath: '/path/with spaces/"quotes"/and\'apostrophes.docx',
          }
        }
      });

      const fragments = converter.convert(nodeWithSpecialPath, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should properly escape special characters
      expect(initFragment!.content).toContain('new DocxLoader("/path/with spaces/\\"quotes\\"/and\'apostrophes.docx")');
    });

    test('should handle invalid URLs gracefully', () => {
      const converter = new WebBaseLoaderConverter();
      
      const nodeWithInvalidURL = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            url: 'not-a-valid-url',
            selector: '.content',
          }
        }
      });

      const fragments = converter.convert(nodeWithInvalidURL, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should still generate code with the provided URL
      expect(initFragment!.content).toContain('new WebBaseLoader("not-a-valid-url", {');
    });

    test('should handle null/undefined values', () => {
      const converter = new ExcelLoaderConverter();
      
      const nodeWithNullValues = createDocumentLoaderNode('excelLoader', {
        data: {
          inputs: {
            filePath: '/data.xlsx',
            sheetName: null,
            headerRow: undefined,
            range: null,
          }
        }
      });

      const fragments = converter.convert(nodeWithNullValues, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should skip null/undefined values
      expect(initFragment!.content).toBe('const excelloader_node_loader = new ExcelLoader("/data.xlsx");');
    });

    test('should handle mixed parameter sources', () => {
      const converter = new CSVLoaderConverter();
      
      const nodeWithMixedParams = {
        id: 'mixed-params',
        type: 'csvLoader',
        label: 'CSV_Loader',
        category: 'documentloader',
        inputs: [],
        outputs: [],
        parameters: [
          { name: 'filePath', value: '/from-params.csv', type: 'string' },
        ],
        data: {
          inputs: {
            column: 'description',
            separator: ';',
          }
        },
        position: { x: 0, y: 0 },
      } as IRNode;

      const fragments = converter.convert(nodeWithMixedParams, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should handle both parameter sources
      expect(initFragment!.content).toContain('"/from-params.csv"');
      expect(initFragment!.content).toContain('column: "description"');
      expect(initFragment!.content).toContain('separator: ";"');
    });
  });

  describe('Code Quality Tests', () => {
    test('should generate properly formatted TypeScript', () => {
      const converter = new PDFLoaderConverter();
      const mockNode = createDocumentLoaderNode('pdfLoader', {
        data: {
          inputs: {
            filePath: '/test.pdf',
            splitPages: true,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n\n');

      // Check for proper formatting
      expect(code).toMatch(/import.*from.*@langchain\/community/);
      expect(code).toMatch(/const \w+ = new PDFLoader/);
      
      // Check for proper indentation (2 spaces as per config)
      const lines = code.split('\n');
      const configLines = lines.filter(line => line.includes(':') && !line.includes('import'));
      configLines.forEach(line => {
        if (line.trim().length > 0) {
          expect(line).toMatch(/^\s+\w+:/); // Should have indentation
        }
      });
    });

    test('should use single quotes as per style guide', () => {
      const converter = new CSVLoaderConverter();
      const mockNode = createDocumentLoaderNode('csvLoader', {
        data: {
          inputs: {
            filePath: '/data.csv',
            separator: ',',
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const code = fragments.map(f => f.content).join('\n');

      // Should use single quotes for imports
      expect(code).toMatch(/import.*from\s+'@langchain\/community/);
    });

    test('should generate consistent variable names', () => {
      const converter = new JSONLoaderConverter();
      const mockNode = createDocumentLoaderNode('jsonLoader', {
        data: {
          inputs: {
            filePath: '/data.json',
          }
        }
      });
      mockNode.id = 'json-test-123';

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should generate reasonable variable names (lowercase with underscores)
      expect(initFragment!.content).toMatch(/const \w+_loader = new JSONLoader/);
    });
  });

  describe('Special Initialization Code Paths', () => {
    test('should handle file-based loaders with correct parameter order', () => {
      const loaderConfigs = [
        { converter: new PDFLoaderConverter(), type: 'pdfLoader', className: 'PDFLoader' },
        { converter: new CSVLoaderConverter(), type: 'csvLoader', className: 'CSVLoader' },
        { converter: new TextLoaderConverter(), type: 'textLoader', className: 'TextLoader' },
        { converter: new DocxLoaderConverter(), type: 'docxLoader', className: 'DocxLoader' },
        { converter: new ExcelLoaderConverter(), type: 'excelLoader', className: 'ExcelLoader' },
      ];

      loaderConfigs.forEach(({ converter, type, className }) => {
        const mockNode = createDocumentLoaderNode(type, {
          data: {
            inputs: {
              filePath: `/test/file.${type}`,
              // Add some config params
              splitPages: true,
              column: 'data',
              encoding: 'utf16',
              sheetName: 'Sheet1',
            }
          }
        });

        const fragments = converter.convert(mockNode, mockContext);
        const initFragment = fragments.find(f => f.type === 'initialization');
        
        // File path should be first parameter
        expect(initFragment!.content).toMatch(new RegExp(`new ${className}\\("/test/file\\.${type}"`));
        
        // Config should NOT include filePath
        if (initFragment!.content.includes('{')) {
          expect(initFragment!.content).not.toContain('filePath:');
        }
      });
    });

    test('should handle web-based loaders with URL as first parameter', () => {
      const loaderConfigs = [
        { 
          converter: new WebBaseLoaderConverter(), 
          type: 'webBaseLoader', 
          className: 'WebBaseLoader',
          urlParam: 'url' 
        },
        { 
          converter: new WebLoaderConverter(), 
          type: 'webLoader', 
          className: 'CheerioWebBaseLoader',
          urlParam: 'webPath' 
        },
      ];

      loaderConfigs.forEach(({ converter, type, className, urlParam }) => {
        const mockNode = createDocumentLoaderNode(type, {
          data: {
            inputs: {
              [urlParam]: 'https://example.com/test',
              selector: '.content',
              maxConcurrency: 5,
            }
          }
        });

        const fragments = converter.convert(mockNode, mockContext);
        const initFragment = fragments.find(f => f.type === 'initialization');
        
        // URL should be first parameter
        expect(initFragment!.content).toMatch(new RegExp(`new ${className}\\("https://example\\.com/test"`));
        
        // Config should include selector but NOT URL
        expect(initFragment!.content).toContain('selector: ".content"');
        expect(initFragment!.content).not.toContain(`${urlParam}:`);
        expect(initFragment!.content).not.toContain('url:');
        expect(initFragment!.content).not.toContain('webPath:');
      });
    });

    test('should handle DirectoryLoader with directoryPath as first parameter', () => {
      const converter = new DirectoryLoaderConverter();
      const mockNode = createDocumentLoaderNode('directoryLoader', {
        data: {
          inputs: {
            directoryPath: '/documents/all',
            extensions: ['.pdf', '.doc'],
            recursive: false,
          }
        }
      });

      const fragments = converter.convert(mockNode, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Directory path should be first parameter
      expect(initFragment!.content).toContain('new DirectoryLoader("/documents/all", {');
      expect(initFragment!.content).toContain('extensions: [".pdf", ".doc"]');
      expect(initFragment!.content).toContain('recursive: false');
      expect(initFragment!.content).not.toContain('directoryPath:');
    });

    test('should fall back to config object when first parameter is missing', () => {
      // Test file loaders without file path
      const pdfConverter = new PDFLoaderConverter();
      const pdfNode = createDocumentLoaderNode('pdfLoader', {
        data: {
          inputs: {
            splitPages: false,
          }
        }
      });
      
      const pdfFragments = pdfConverter.convert(pdfNode, mockContext);
      const pdfInit = pdfFragments.find(f => f.type === 'initialization');
      expect(pdfInit!.content).toContain('new PDFLoader({');
      expect(pdfInit!.content).toContain('splitPages: false');

      // Test web loader without URL
      const webConverter = new WebBaseLoaderConverter();
      const webNode = createDocumentLoaderNode('webBaseLoader', {
        data: {
          inputs: {
            selector: '.main',
            timeout: 5000,
          }
        }
      });
      
      const webFragments = webConverter.convert(webNode, mockContext);
      const webInit = webFragments.find(f => f.type === 'initialization');
      expect(webInit!.content).toContain('new WebBaseLoader({');
      expect(webInit!.content).toContain('selector: ".main"');
      expect(webInit!.content).toContain('timeout: 5000');
    });

    test('should handle empty config objects correctly', () => {
      const converter = new ExcelLoaderConverter();
      
      // With file path but no other config
      const nodeWithPath = createDocumentLoaderNode('excelLoader', {
        data: {
          inputs: {
            filePath: '/data.xlsx',
          }
        }
      });
      
      const fragments = converter.convert(nodeWithPath, mockContext);
      const initFragment = fragments.find(f => f.type === 'initialization');
      
      // Should not include empty config object
      expect(initFragment!.content).toBe('const excelloader_node_loader = new ExcelLoader("/data.xlsx");');
      expect(initFragment!.content).not.toContain(', {');
    });
  });
});