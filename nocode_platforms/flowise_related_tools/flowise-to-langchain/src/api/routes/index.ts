/**
 * API Routes
 *
 * This module defines all the API routes and their handlers,
 * organizing endpoints by functionality.
 */

import { Router } from 'express';
import { convertRouter } from './convert.js';
import validateRouter from './validate.js';
import testRouter from './test.js';
import uploadRouter from './upload.js';
import batchRouter from './batch.js';
import jobRouter from './jobs.js';
import statsRouter from './stats.js';

/**
 * Main API router
 */
export const apiRouter = Router();

// Mount sub-routers
apiRouter.use('/convert', convertRouter);
apiRouter.use('/validate', validateRouter);
apiRouter.use('/test', testRouter);
apiRouter.use('/upload', uploadRouter);
apiRouter.use('/batch', batchRouter);
apiRouter.use('/jobs', jobRouter);
apiRouter.use('/stats', statsRouter);

// API info endpoint
apiRouter.get('/', (req, res) => {
  res.json({
    name: 'Flowise to LangChain API',
    version: '1.0.0',
    description: 'API for converting Flowise flows to LangChain code',
    endpoints: {
      convert: '/api/convert',
      validate: '/api/validate',
      test: '/api/test',
      upload: '/api/upload',
      batch: '/api/batch',
      jobs: '/api/jobs',
      stats: '/api/stats',
    },
    documentation: '/docs',
    websocket: '/ws',
    health: '/health',
  });
});

// API documentation endpoint
apiRouter.get('/docs', (req, res) => {
  res.json({
    openapi: '3.0.0',
    info: {
      title: 'Flowise to LangChain API',
      version: '1.0.0',
      description: 'API for converting Flowise flows to LangChain code',
    },
    servers: [
      {
        url: `${req.protocol}://${req.get('host')}/api`,
        description: 'Current server',
      },
    ],
    paths: {
      '/convert': {
        post: {
          summary: 'Convert Flowise flow to LangChain code',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    input: {
                      oneOf: [
                        {
                          type: 'string',
                          description: 'File path or JSON string',
                        },
                        { type: 'object', description: 'Flowise flow object' },
                      ],
                    },
                    options: {
                      type: 'object',
                      properties: {
                        format: {
                          type: 'string',
                          enum: ['typescript', 'javascript', 'python'],
                        },
                        target: {
                          type: 'string',
                          enum: ['node', 'browser', 'edge'],
                        },
                        withLangfuse: { type: 'boolean' },
                        includeTests: { type: 'boolean' },
                        includeDocs: { type: 'boolean' },
                        includeComments: { type: 'boolean' },
                        outputFormat: { type: 'string', enum: ['esm', 'cjs'] },
                        verbose: { type: 'boolean' },
                      },
                    },
                    stream: { type: 'boolean' },
                    connectionId: { type: 'string' },
                  },
                  required: ['input'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Conversion successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          jobId: { type: 'string' },
                          files: { type: 'array' },
                          metrics: { type: 'object' },
                          analysis: { type: 'object' },
                          warnings: { type: 'array' },
                          errors: { type: 'array' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/validate': {
        post: {
          summary: 'Validate Flowise flow',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    input: {
                      oneOf: [
                        {
                          type: 'string',
                          description: 'File path or JSON string',
                        },
                        { type: 'object', description: 'Flowise flow object' },
                      ],
                    },
                    options: {
                      type: 'object',
                      properties: {
                        strict: { type: 'boolean' },
                        checkDeprecated: { type: 'boolean' },
                        suggestOptimizations: { type: 'boolean' },
                        autoFix: { type: 'boolean' },
                      },
                    },
                  },
                  required: ['input'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Validation completed',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          result: { type: 'object' },
                          fixed: { type: 'string' },
                          suggestions: { type: 'array' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/test': {
        post: {
          summary: 'Test generated code',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    files: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          path: { type: 'string' },
                          content: { type: 'string' },
                          type: { type: 'string' },
                          size: { type: 'number' },
                          language: { type: 'string' },
                        },
                      },
                    },
                    options: {
                      type: 'object',
                      properties: {
                        testType: {
                          type: 'string',
                          enum: ['unit', 'integration', 'e2e', 'all'],
                        },
                        timeout: { type: 'number' },
                        mockExternal: { type: 'boolean' },
                        generateReport: { type: 'boolean' },
                        envFile: { type: 'string' },
                      },
                    },
                    stream: { type: 'boolean' },
                    connectionId: { type: 'string' },
                  },
                  required: ['files'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Testing completed',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          jobId: { type: 'string' },
                          results: { type: 'object' },
                          report: { type: 'object' },
                          testFiles: { type: 'array' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/upload': {
        post: {
          summary: 'Upload Flowise flow file',
          requestBody: {
            content: {
              'multipart/form-data': {
                schema: {
                  type: 'object',
                  properties: {
                    file: {
                      type: 'string',
                      format: 'binary',
                    },
                    validate: { type: 'boolean' },
                    autoConvert: { type: 'boolean' },
                    conversionOptions: { type: 'object' },
                  },
                  required: ['file'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Upload successful',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          jobId: { type: 'string' },
                          file: { type: 'object' },
                          validation: { type: 'object' },
                          conversion: { type: 'object' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/batch': {
        post: {
          summary: 'Process multiple operations in batch',
          requestBody: {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    operations: {
                      type: 'array',
                      items: {
                        type: 'object',
                        properties: {
                          type: {
                            type: 'string',
                            enum: ['convert', 'validate', 'test'],
                          },
                          input: { type: 'object' },
                          options: { type: 'object' },
                        },
                      },
                    },
                    options: {
                      type: 'object',
                      properties: {
                        maxConcurrency: { type: 'number' },
                        stopOnError: { type: 'boolean' },
                        stream: { type: 'boolean' },
                        connectionId: { type: 'string' },
                      },
                    },
                  },
                  required: ['operations'],
                },
              },
            },
          },
          responses: {
            200: {
              description: 'Batch processing initiated',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          jobId: { type: 'string' },
                          results: { type: 'array' },
                          metrics: { type: 'object' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/jobs/{jobId}': {
        get: {
          summary: 'Get job status',
          parameters: [
            {
              name: 'jobId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Job status retrieved',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          id: { type: 'string' },
                          type: { type: 'string' },
                          status: { type: 'string' },
                          progress: { type: 'number' },
                          createdAt: { type: 'string' },
                          startedAt: { type: 'string' },
                          completedAt: { type: 'string' },
                          result: { type: 'object' },
                          error: { type: 'object' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        delete: {
          summary: 'Cancel job',
          parameters: [
            {
              name: 'jobId',
              in: 'path',
              required: true,
              schema: { type: 'string' },
            },
          ],
          responses: {
            200: {
              description: 'Job cancelled',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      message: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/stats': {
        get: {
          summary: 'Get API statistics',
          responses: {
            200: {
              description: 'Statistics retrieved',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean' },
                      data: {
                        type: 'object',
                        properties: {
                          totalRequests: { type: 'number' },
                          activeConnections: { type: 'number' },
                          runningJobs: { type: 'number' },
                          completedJobs: { type: 'number' },
                          failedJobs: { type: 'number' },
                          avgResponseTime: { type: 'number' },
                          memoryUsage: { type: 'object' },
                          cpuUsage: { type: 'number' },
                          uptime: { type: 'number' },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
});
