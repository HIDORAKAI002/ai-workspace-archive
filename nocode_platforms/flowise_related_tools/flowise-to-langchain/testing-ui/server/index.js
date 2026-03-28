const express = require('express');
const cors = require('cors');
const path = require('path');
const { execFile } = require('child_process');
const fs = require('fs').promises;
const WebSocket = require('ws');
const http = require('http');
const multer = require('multer');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Input validation middleware
const validateInput = (req, res, next) => {
  const { flow, options, settings } = req.body;
  
  // Validate flow structure
  if (flow && typeof flow !== 'object') {
    return res.status(400).json({
      success: false,
      error: 'Flow must be a valid JSON object'
    });
  }
  
  // Sanitize and validate format/output language
  if (options?.format) {
    const allowedFormats = ['typescript', 'python', 'javascript'];
    if (!allowedFormats.includes(options.format)) {
      return res.status(400).json({
        success: false,
        error: `Format must be one of: ${allowedFormats.join(', ')}`
      });
    }
  }
  
  if (settings?.outputLanguage) {
    const allowedLanguages = ['typescript', 'python', 'javascript'];
    if (!allowedLanguages.includes(settings.outputLanguage)) {
      return res.status(400).json({
        success: false,
        error: `Output language must be one of: ${allowedLanguages.join(', ')}`
      });
    }
  }
  
  next();
};

// Port configuration
const PORT = process.env.PORT || 3001;

// Handle preflight requests
app.options('*', cors());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
  });
});

// Configure multer for file uploads
const upload = multer({ 
  dest: path.join(__dirname, 'temp/uploads'),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/json' || file.originalname.endsWith('.json')) {
      cb(null, true);
    } else {
      cb(new Error('Only JSON files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  }
});

// File upload endpoint
app.post('/api/flows/upload', upload.single('flow'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: 'No flow file provided'
      });
    }

    try {
      const content = await fs.readFile(req.file.path, 'utf-8');
      const flow = JSON.parse(content);
      
      // Clean up uploaded file
      await fs.unlink(req.file.path).catch(() => {});
      
      const flowId = `flow-${Date.now()}`;
      
      res.json({
        success: true,
        flowId,
        flow: {
          id: flowId,
          name: flow.name || 'Uploaded Flow',
          description: flow.description || '',
          nodes: flow.nodes || [],
          edges: flow.edges || [],
          version: flow.version || '1.0.0',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isValid: true
        }
      });
    } catch (parseError) {
      // Clean up uploaded file on error
      await fs.unlink(req.file.path).catch(() => {});
      res.status(400).json({
        success: false,
        error: 'Invalid JSON file format'
      });
    }
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Flow validation endpoint
app.post('/api/flows/validate', async (req, res) => {
  try {
    const { flow } = req.body;
    
    if (!flow) {
      return res.status(400).json({
        success: false,
        error: 'No flow provided for validation'
      });
    }

    const errors = [];
    const warnings = [];
    const suggestions = [];
    
    // Basic validation logic
    if (!flow.nodes || flow.nodes.length === 0) {
      errors.push({
        message: 'Flow must contain at least one node',
        code: 'EMPTY_FLOW',
        suggestion: 'Add nodes to your flow before converting'
      });
    }
    
    // Check for disconnected nodes
    const connectedNodes = new Set([
      ...(flow.edges || []).map(edge => edge.source),
      ...(flow.edges || []).map(edge => edge.target)
    ]);
    
    const disconnectedNodes = (flow.nodes || []).filter(node => !connectedNodes.has(node.id));
    if (disconnectedNodes.length > 0) {
      warnings.push({
        message: `${disconnectedNodes.length} disconnected nodes found`,
        code: 'DISCONNECTED_NODES'
      });
    }
    
    // Check for unsupported node types
    const supportedTypes = ['llm', 'prompt', 'memory', 'tool', 'chain', 'agent'];
    const unsupportedNodes = (flow.nodes || []).filter(node => !supportedTypes.includes(node.type));
    
    if (unsupportedNodes.length > 0) {
      errors.push({
        message: `Unsupported node types: ${unsupportedNodes.map(n => n.type).join(', ')}`,
        code: 'UNSUPPORTED_NODE_TYPES',
        suggestion: 'Remove or replace unsupported nodes'
      });
    }
    
    // Add optimization suggestions
    if ((flow.nodes || []).length > 10) {
      suggestions.push({
        type: 'optimization',
        message: 'Consider breaking down large flows into smaller components',
        impact: 'medium'
      });
    }
    
    res.json({
      success: true,
      isValid: errors.length === 0,
      errors,
      warnings,
      suggestions,
      detectedVersion: flow.version || '1.0.0',
      nodeCount: (flow.nodes || []).length,
      edgeCount: (flow.edges || []).length,
      nodeTypes: Array.from(new Set((flow.nodes || []).map(n => n.type))),
      complexity: (flow.nodes || []).length > 15 ? 'high' : (flow.nodes || []).length > 5 ? 'medium' : 'low',
      supportedFeatures: supportedTypes.filter(type => (flow.nodes || []).some(n => n.type === type)),
      unsupportedFeatures: unsupportedNodes.map(node => ({
        name: node.type,
        reason: 'Node type not supported in current version',
        workaround: 'Use alternative node types or custom implementation'
      }))
    });
  } catch (error) {
    console.error('Validation error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Flow conversion endpoint (new API style)
app.post('/api/flows/convert', validateInput, async (req, res) => {
  try {
    const { flow, options } = req.body;
    
    if (!flow) {
      return res.status(400).json({
        success: false,
        error: 'No flow provided for conversion'
      });
    }

    // Save flow to temporary file
    const tempFlowPath = path.join(__dirname, 'temp', `flow-${Date.now()}.json`);
    await fs.mkdir(path.dirname(tempFlowPath), { recursive: true });
    await fs.writeFile(tempFlowPath, JSON.stringify(flow, null, 2));
    
    // Prepare conversion command
    const outputLang = options?.format || 'python';
    const cliPath = path.join(__dirname, '../../index.js');
    const outputPath = path.join(__dirname, 'temp', `output-${Date.now()}`);
    
    // Execute conversion with safe parameters
    const args = ['--input', tempFlowPath, '--output', outputPath, '--format', outputLang];
    
    execFile('node', [cliPath, ...args], async (error, stdout, stderr) => {
      // Clean up temp file
      await fs.unlink(tempFlowPath).catch(() => {});
      
      if (error) {
        console.error('Conversion error:', error);
        return res.status(500).json({
          success: false,
          error: stderr || error.message,
        });
      }
      
      try {
        // Read converted files
        const files = await fs.readdir(outputPath);
        const result = {
          success: true,
          nodesConverted: (flow.nodes || []).length,
          filesGenerated: files.map(f => `${outputPath}/${f}`),
          warnings: [],
          errors: [],
          metadata: {
            inputFile: flow.name || 'flow',
            outputDirectory: outputPath,
            format: outputLang,
            target: options?.target || 'langchain',
            timestamp: new Date().toISOString()
          }
        };
        
        // Read file contents
        if (files.length > 0) {
          const mainFile = files[0];
          const content = await fs.readFile(path.join(outputPath, mainFile), 'utf-8');
          result.generatedCode = content;
        }
        
        // Clean up output directory
        await fs.rm(outputPath, { recursive: true, force: true }).catch(() => {});
        
        res.json(result);
      } catch (readError) {
        console.error('Error reading output:', readError);
        res.status(500).json({
          success: false,
          error: 'Failed to read conversion output',
        });
      }
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Flow testing endpoint
app.post('/api/flows/test', async (req, res) => {
  try {
    const { flow, conversionResult, testType } = req.body;
    
    // Simulate test execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const testCounts = {
      unit: 5,
      integration: 3,
      e2e: 2,
      all: 10
    };
    
    const totalTests = testCounts[testType] || 5;
    const passedTests = Math.floor(totalTests * (Math.random() * 0.4 + 0.6)); // 60-100% pass rate
    const failedTests = [];
    
    // Generate some mock failed tests
    for (let i = passedTests; i < totalTests; i++) {
      failedTests.push({
        name: `Test ${i + 1}`,
        error: `Assertion failed: Expected output to match pattern`,
        suggestion: 'Check the input parameters and expected output format'
      });
    }
    
    res.json({
      success: passedTests === totalTests,
      totalTests,
      passedTests,
      failedTests,
      duration: 1500 + Math.random() * 3000,
      coverage: testType === 'all' ? '87.5%' : undefined
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Conversion status endpoint
app.get('/api/flows/conversion/:conversionId/status', (req, res) => {
  const { conversionId } = req.params;
  
  // Mock status response
  res.json({
    success: true,
    status: 'completed',
    progress: 100,
    conversionId
  });
});

// Download generated files endpoint
app.get('/api/flows/conversion/:conversionId/download', (req, res) => {
  const { conversionId } = req.params;
  
  // Mock file download - return empty zip
  res.setHeader('Content-Type', 'application/zip');
  res.setHeader('Content-Disposition', `attachment; filename="${conversionId}.zip"`);
  res.send(Buffer.from('Mock generated files'));
});

// Legacy flow conversion endpoint
app.post('/api/convert', validateInput, async (req, res) => {
  try {
    const { flow, settings } = req.body;
    
    // Save flow to temporary file
    const tempFlowPath = path.join(__dirname, 'temp', `flow-${Date.now()}.json`);
    await fs.mkdir(path.dirname(tempFlowPath), { recursive: true });
    await fs.writeFile(tempFlowPath, JSON.stringify(flow, null, 2));
    
    // Prepare conversion command
    const outputLang = settings?.outputLanguage || 'python';
    const cliPath = path.join(__dirname, '../../index.js');
    const outputPath = path.join(__dirname, 'temp', `output-${Date.now()}`);
    
    // Execute conversion with safe parameters
    const args = ['--input', tempFlowPath, '--output', outputPath, '--format', outputLang];
    
    execFile('node', [cliPath, ...args], async (error, stdout, stderr) => {
      // Clean up temp file
      await fs.unlink(tempFlowPath).catch(() => {});
      
      if (error) {
        console.error('Conversion error:', error);
        return res.status(500).json({
          success: false,
          error: stderr || error.message,
        });
      }
      
      try {
        // Read converted files
        const files = await fs.readdir(outputPath);
        const result = {
          success: true,
          files: {},
          logs: stdout,
        };
        
        for (const file of files) {
          const content = await fs.readFile(path.join(outputPath, file), 'utf-8');
          result.files[file] = content;
        }
        
        // Clean up output directory
        await fs.rm(outputPath, { recursive: true, force: true }).catch(() => {});
        
        res.json(result);
      } catch (readError) {
        console.error('Error reading output:', readError);
        res.status(500).json({
          success: false,
          error: 'Failed to read conversion output',
        });
      }
    });
  } catch (error) {
    console.error('Conversion error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Test endpoint
app.post('/api/test', async (req, res) => {
  try {
    const { code, testCases, language } = req.body;
    
    // For now, return mock results
    const results = testCases.map((testCase, index) => ({
      id: `test-${Date.now()}-${index}`,
      name: testCase.name,
      status: Math.random() > 0.3 ? 'passed' : 'failed',
      duration: Math.floor(Math.random() * 1000) + 100,
      timestamp: new Date().toISOString(),
      output: {
        actual: 'Test output',
        expected: testCase.expectedOutput,
      },
    }));
    
    res.json({
      success: true,
      results,
      summary: {
        total: results.length,
        passed: results.filter(r => r.status === 'passed').length,
        failed: results.filter(r => r.status === 'failed').length,
      },
    });
  } catch (error) {
    console.error('Test error:', error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// WebSocket handling for real-time updates
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');
  
  ws.on('message', (message) => {
    try {
      const data = JSON.parse(message);
      console.log('WebSocket message:', data);
      
      // Echo back for now
      ws.send(JSON.stringify({
        type: 'ack',
        originalMessage: data,
        timestamp: new Date().toISOString(),
      }));
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  });
  
  ws.on('close', () => {
    console.log('WebSocket client disconnected');
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    success: false,
    error: err.message || 'Internal server error',
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  console.log(`WebSocket server running on ws://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});