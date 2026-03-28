/**
 * WebSocket Service
 *
 * This service handles real-time WebSocket connections for streaming
 * conversion results, progress updates, and notifications.
 */

import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';
import { randomUUID } from 'crypto';
import { EventEmitter } from 'events';
import { logger } from '../../cli/utils/logger.js';
import {
  WebSocketMessage,
  ProgressMessage,
  ResultMessage,
  ErrorMessage,
  ApiError,
} from '../types/api.js';

/**
 * WebSocket connection info
 */
interface ConnectionInfo {
  id: string;
  ws: WebSocket;
  userId?: string;
  subscriptions: Set<string>;
  lastPing: Date;
  isAlive: boolean;
  metadata: Record<string, any>;
}

/**
 * WebSocket configuration
 */
interface WebSocketConfig {
  heartbeatInterval: number;
  maxConnections: number;
  pingTimeout: number;
  subscriptionTimeout: number;
}

/**
 * WebSocket Service class
 */
export class WebSocketService extends EventEmitter {
  private wss: WebSocketServer;
  private config: WebSocketConfig;
  private connections: Map<string, ConnectionInfo> = new Map();
  private subscriptions: Map<string, Set<string>> = new Map(); // jobId -> connectionIds
  private heartbeatInterval: NodeJS.Timeout;
  private cleanupInterval: NodeJS.Timeout;

  constructor(wss: WebSocketServer, config: Partial<WebSocketConfig> = {}) {
    super();

    this.wss = wss;
    this.config = {
      heartbeatInterval: 30000,
      maxConnections: 100,
      pingTimeout: 60000,
      subscriptionTimeout: 5 * 60 * 1000, // 5 minutes
      ...config,
    };
  }

  /**
   * Initialize WebSocket service
   */
  public initialize(): void {
    this.setupHeartbeat();
    this.setupCleanup();

    logger.info('WebSocket service initialized', {
      config: this.config,
    });
  }

  /**
   * Handle new WebSocket connection
   */
  public handleConnection(ws: WebSocket, req: IncomingMessage): void {
    // Check connection limits
    if (this.connections.size >= this.config.maxConnections) {
      ws.close(1013, 'Server overloaded');
      return;
    }

    const connectionId = randomUUID();
    const connection: ConnectionInfo = {
      id: connectionId,
      ws,
      subscriptions: new Set(),
      lastPing: new Date(),
      isAlive: true,
      metadata: {
        userAgent: req.headers['user-agent'],
        ip: req.socket.remoteAddress,
        connectedAt: new Date().toISOString(),
      },
    };

    this.connections.set(connectionId, connection);

    // Setup connection event handlers
    this.setupConnectionHandlers(connection);

    // Send welcome message
    this.sendMessage(connectionId, {
      type: 'ping',
      id: randomUUID(),
      payload: {
        connectionId,
        serverTime: new Date().toISOString(),
        message: 'Connected to Flowise API WebSocket',
      },
      timestamp: new Date().toISOString(),
    });

    this.emit('connection:established', {
      connectionId,
      metadata: connection.metadata,
    });

    logger.info('WebSocket connection established', {
      connectionId,
      totalConnections: this.connections.size,
    });
  }

  /**
   * Setup connection event handlers
   */
  private setupConnectionHandlers(connection: ConnectionInfo): void {
    const { ws, id } = connection;

    // Handle incoming messages
    ws.on('message', (data) => {
      try {
        const message = JSON.parse(data.toString()) as WebSocketMessage;
        this.handleMessage(id, message);
      } catch (error) {
        logger.error('Invalid WebSocket message:', { error, connectionId: id });
        this.sendError(id, {
          code: 'INVALID_MESSAGE',
          message: 'Invalid JSON message format',
        });
      }
    });

    // Handle connection close
    ws.on('close', (code, reason) => {
      this.handleDisconnection(id, code, reason);
    });

    // Handle connection error
    ws.on('error', (error) => {
      logger.error('WebSocket error:', { error, connectionId: id });
      this.handleDisconnection(id, 1011, Buffer.from('Server error'));
    });

    // Handle pong response
    ws.on('pong', () => {
      connection.isAlive = true;
      connection.lastPing = new Date();
    });
  }

  /**
   * Handle incoming WebSocket message
   */
  private handleMessage(connectionId: string, message: WebSocketMessage): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    switch (message.type) {
      case 'ping':
        this.sendMessage(connectionId, {
          type: 'pong',
          id: message.id,
          timestamp: new Date().toISOString(),
        });
        break;

      case 'subscribe':
        this.handleSubscribe(connectionId, message.payload);
        break;

      case 'unsubscribe':
        this.handleUnsubscribe(connectionId, message.payload);
        break;

      default:
        logger.warn('Unknown message type:', {
          type: message.type,
          connectionId,
        });
        this.sendError(connectionId, {
          code: 'UNKNOWN_MESSAGE_TYPE',
          message: `Unknown message type: ${message.type}`,
        });
    }
  }

  /**
   * Handle subscription request
   */
  private handleSubscribe(connectionId: string, payload: any): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    const { jobId, userId } = payload;

    if (!jobId) {
      this.sendError(connectionId, {
        code: 'MISSING_JOB_ID',
        message: 'Job ID is required for subscription',
      });
      return;
    }

    // Add subscription
    connection.subscriptions.add(jobId);
    connection.userId = userId;

    // Track subscription
    if (!this.subscriptions.has(jobId)) {
      this.subscriptions.set(jobId, new Set());
    }
    this.subscriptions.get(jobId)!.add(connectionId);

    // Send confirmation
    this.sendMessage(connectionId, {
      type: 'result',
      id: randomUUID(),
      payload: {
        subscribed: true,
        jobId,
        message: `Subscribed to job ${jobId}`,
      },
      timestamp: new Date().toISOString(),
    });

    logger.info('Client subscribed to job:', { connectionId, jobId });
  }

  /**
   * Handle unsubscription request
   */
  private handleUnsubscribe(connectionId: string, payload: any): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    const { jobId } = payload;

    if (!jobId) {
      this.sendError(connectionId, {
        code: 'MISSING_JOB_ID',
        message: 'Job ID is required for unsubscription',
      });
      return;
    }

    // Remove subscription
    connection.subscriptions.delete(jobId);

    // Remove from subscription tracking
    const jobSubscriptions = this.subscriptions.get(jobId);
    if (jobSubscriptions) {
      jobSubscriptions.delete(connectionId);
      if (jobSubscriptions.size === 0) {
        this.subscriptions.delete(jobId);
      }
    }

    // Send confirmation
    this.sendMessage(connectionId, {
      type: 'result',
      id: randomUUID(),
      payload: {
        unsubscribed: true,
        jobId,
        message: `Unsubscribed from job ${jobId}`,
      },
      timestamp: new Date().toISOString(),
    });

    logger.info('Client unsubscribed from job:', { connectionId, jobId });
  }

  /**
   * Handle connection disconnection
   */
  private handleDisconnection(
    connectionId: string,
    code: number,
    reason: Buffer
  ): void {
    const connection = this.connections.get(connectionId);
    if (!connection) return;

    // Clean up subscriptions
    for (const jobId of connection.subscriptions) {
      const jobSubscriptions = this.subscriptions.get(jobId);
      if (jobSubscriptions) {
        jobSubscriptions.delete(connectionId);
        if (jobSubscriptions.size === 0) {
          this.subscriptions.delete(jobId);
        }
      }
    }

    // Remove connection
    this.connections.delete(connectionId);

    this.emit('connection:closed', {
      connectionId,
      code,
      reason: reason.toString(),
      totalConnections: this.connections.size,
    });

    logger.info('WebSocket connection closed', {
      connectionId,
      code,
      reason: reason.toString(),
      totalConnections: this.connections.size,
    });
  }

  /**
   * Send message to a specific connection
   */
  public sendMessage(connectionId: string, message: WebSocketMessage): boolean {
    const connection = this.connections.get(connectionId);
    if (!connection || connection.ws.readyState !== WebSocket.OPEN) {
      return false;
    }

    try {
      connection.ws.send(JSON.stringify(message));
      return true;
    } catch (error) {
      logger.error('Failed to send WebSocket message:', {
        error,
        connectionId,
      });
      return false;
    }
  }

  /**
   * Send error message
   */
  public sendError(connectionId: string, error: ApiError): boolean {
    const errorMessage: WebSocketMessage = {
      type: 'error',
      id: randomUUID(),
      payload: error,
      timestamp: new Date().toISOString(),
    };

    return this.sendMessage(connectionId, errorMessage);
  }

  /**
   * Broadcast progress update to job subscribers
   */
  public broadcastProgress(jobId: string, progress: ProgressMessage): void {
    const subscribers = this.subscriptions.get(jobId);
    if (!subscribers) return;

    const message: WebSocketMessage = {
      type: 'progress',
      id: randomUUID(),
      payload: progress,
      timestamp: new Date().toISOString(),
    };

    let successCount = 0;
    for (const connectionId of subscribers) {
      if (this.sendMessage(connectionId, message)) {
        successCount++;
      }
    }

    logger.debug('Progress broadcast sent:', {
      jobId,
      subscribers: subscribers.size,
      successful: successCount,
      progress: progress.progress,
    });
  }

  /**
   * Broadcast result to job subscribers
   */
  public broadcastResult(jobId: string, result: any, operation: string): void {
    const subscribers = this.subscriptions.get(jobId);
    if (!subscribers) return;

    const resultMessage: ResultMessage = {
      jobId,
      result,
      operation: operation as any,
    };

    const message: WebSocketMessage = {
      type: 'result',
      id: randomUUID(),
      payload: resultMessage,
      timestamp: new Date().toISOString(),
    };

    let successCount = 0;
    for (const connectionId of subscribers) {
      if (this.sendMessage(connectionId, message)) {
        successCount++;
      }
    }

    logger.info('Result broadcast sent:', {
      jobId,
      operation,
      subscribers: subscribers.size,
      successful: successCount,
    });
  }

  /**
   * Broadcast error to job subscribers
   */
  public broadcastError(
    jobId: string,
    error: ApiError,
    operation?: string
  ): void {
    const subscribers = this.subscriptions.get(jobId);
    if (!subscribers) return;

    const errorMessage: ErrorMessage = {
      jobId,
      error,
      operation: operation as any,
    };

    const message: WebSocketMessage = {
      type: 'error',
      id: randomUUID(),
      payload: errorMessage,
      timestamp: new Date().toISOString(),
    };

    let successCount = 0;
    for (const connectionId of subscribers) {
      if (this.sendMessage(connectionId, message)) {
        successCount++;
      }
    }

    logger.error('Error broadcast sent:', {
      jobId,
      operation,
      error: error.message,
      subscribers: subscribers.size,
      successful: successCount,
    });
  }

  /**
   * Get connection statistics
   */
  public getStats(): {
    totalConnections: number;
    totalSubscriptions: number;
    activeJobs: number;
    averageSubscriptionsPerConnection: number;
  } {
    const totalConnections = this.connections.size;
    const totalSubscriptions = Array.from(this.connections.values()).reduce(
      (sum, conn) => sum + conn.subscriptions.size,
      0
    );
    const activeJobs = this.subscriptions.size;
    const averageSubscriptionsPerConnection =
      totalConnections > 0 ? totalSubscriptions / totalConnections : 0;

    return {
      totalConnections,
      totalSubscriptions,
      activeJobs,
      averageSubscriptionsPerConnection,
    };
  }

  /**
   * Get connection info
   */
  public getConnectionInfo(connectionId: string): ConnectionInfo | null {
    return this.connections.get(connectionId) || null;
  }

  /**
   * Close connection
   */
  public closeConnection(
    connectionId: string,
    code: number = 1000,
    reason?: string
  ): boolean {
    const connection = this.connections.get(connectionId);
    if (!connection) return false;

    connection.ws.close(code, reason);
    return true;
  }

  /**
   * Setup heartbeat mechanism
   */
  private setupHeartbeat(): void {
    this.heartbeatInterval = setInterval(() => {
      for (const [connectionId, connection] of this.connections) {
        if (connection.isAlive === false) {
          // Connection is dead, terminate it
          connection.ws.terminate();
          this.handleDisconnection(
            connectionId,
            1006,
            Buffer.from('Heartbeat failed')
          );
        } else {
          // Send ping
          connection.isAlive = false;
          connection.ws.ping();
        }
      }
    }, this.config.heartbeatInterval);
  }

  /**
   * Setup periodic cleanup
   */
  private setupCleanup(): void {
    this.cleanupInterval = setInterval(() => {
      const now = new Date().getTime();
      const timeout = this.config.subscriptionTimeout;

      // Clean up stale subscriptions
      for (const [jobId, subscribers] of this.subscriptions) {
        const staleConnections = [];

        for (const connectionId of subscribers) {
          const connection = this.connections.get(connectionId);
          if (!connection || now - connection.lastPing.getTime() > timeout) {
            staleConnections.push(connectionId);
          }
        }

        // Remove stale connections
        for (const connectionId of staleConnections) {
          subscribers.delete(connectionId);
        }

        // Remove empty job subscriptions
        if (subscribers.size === 0) {
          this.subscriptions.delete(jobId);
        }
      }
    }, 60000); // Run every minute
  }

  /**
   * Cleanup resources
   */
  public cleanup(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
    }

    // Close all connections
    for (const connection of this.connections.values()) {
      connection.ws.close(1001, 'Server shutting down');
    }

    this.connections.clear();
    this.subscriptions.clear();
  }
}
