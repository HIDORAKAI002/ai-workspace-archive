import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { HttpStreamTransport } from '../../../src/transports/http/server.js';
import http from 'node:http';

/**
 * Regression tests for session resilience in HttpStreamTransport.
 *
 * These cover two bugs that caused "Session not found" (-32001) errors
 * for clients like Cline after a session was established:
 *
 *  1. onerror callback destroyed sessions on transient SDK errors (parse errors,
 *     failed SSE writes) — the session should survive these.
 *  2. Re-initialization with a stale session ID was rejected with 404 instead
 *     of creating a new session.
 */
describe('HttpStreamTransport — Session Resilience', () => {
  let transport: HttpStreamTransport;
  let testPort: number;
  // Track open requests so we can clean them up before closing the transport
  let openRequests: http.ClientRequest[];

  const initializeBody = {
    jsonrpc: '2.0',
    method: 'initialize',
    params: {
      protocolVersion: '2024-11-05',
      capabilities: {},
      clientInfo: { name: 'test-client', version: '1.0.0' },
    },
    id: 1,
  };

  beforeEach(() => {
    testPort = 4000 + Math.floor(Math.random() * 1000);
    openRequests = [];
    transport = new HttpStreamTransport({
      port: testPort,
      endpoint: '/mcp',
      responseMode: 'stream',
    });
  });

  afterEach(async () => {
    // Destroy any open HTTP connections so the server can shut down cleanly
    for (const req of openRequests) {
      req.destroy();
    }
    openRequests = [];

    if (transport.isRunning()) {
      await transport.close();
    }
  });

  function getTransports(): Record<string, any> {
    return (transport as any)._transports;
  }

  function wait(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * Polls until at least one session exists in the transport map.
   * Throws after the timeout if no session appears.
   */
  async function waitForSession(timeoutMs = 2000): Promise<string> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const ids = Object.keys(getTransports());
      if (ids.length > 0) return ids[0];
      await wait(20);
    }
    throw new Error('Timed out waiting for session to be created');
  }

  /**
   * Fire-and-forget POST. The SSE response may never complete (no MCP server),
   * so we don't await the response — we track the request for cleanup.
   */
  function firePost(body: any, sessionId?: string): void {
    const headers: http.OutgoingHttpHeaders = {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/event-stream',
    };
    if (sessionId) {
      headers['Mcp-Session-Id'] = sessionId;
    }
    const bodyStr = JSON.stringify(body);

    const req = http.request({
      hostname: 'localhost',
      port: testPort,
      path: '/mcp',
      method: 'POST',
      headers: { ...headers, 'Content-Length': Buffer.byteLength(bodyStr) },
    });
    req.on('error', () => {});
    req.write(bodyStr);
    req.end();

    openRequests.push(req);
  }

  /**
   * Full request/response for non-streaming responses (errors, 404s, etc.)
   */
  function makeRequest(
    body: any,
    sessionId?: string,
  ): Promise<{ statusCode: number; headers: http.IncomingHttpHeaders; body: string }> {
    return new Promise((resolve, reject) => {
      const headers: http.OutgoingHttpHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json, text/event-stream',
      };
      if (sessionId) {
        headers['Mcp-Session-Id'] = sessionId;
      }
      const bodyStr = JSON.stringify(body);

      const req = http.request(
        {
          hostname: 'localhost',
          port: testPort,
          path: '/mcp',
          method: 'POST',
          headers: { ...headers, 'Content-Length': Buffer.byteLength(bodyStr) },
        },
        (res) => {
          let responseBody = '';
          res.on('data', (chunk: Buffer) => {
            responseBody += chunk.toString();
          });
          res.on('end', () => {
            resolve({
              statusCode: res.statusCode!,
              headers: res.headers,
              body: responseBody,
            });
          });
        },
      );
      req.on('error', reject);
      req.write(bodyStr);
      req.end();

      openRequests.push(req);
    });
  }

  // ---------------------------------------------------------------------------
  // Bug 1: onerror must NOT destroy sessions
  // ---------------------------------------------------------------------------
  describe('onerror should not destroy sessions', () => {
    it('should keep session alive after onerror fires on the internal transport', async () => {
      await transport.start();
      transport.onmessage = async () => {};

      firePost(initializeBody);
      const sessionId = await waitForSession();

      // Simulate the SDK firing onerror (e.g. parse error on a bad request)
      const internalTransport = getTransports()[sessionId];
      internalTransport.onerror?.(new Error('Simulated transient error'));

      // Session must still be in the map
      expect(getTransports()[sessionId]).toBeDefined();
    });

    it('should keep session alive after multiple onerror events', async () => {
      await transport.start();
      transport.onmessage = async () => {};

      firePost(initializeBody);
      const sessionId = await waitForSession();
      const internalTransport = getTransports()[sessionId];

      internalTransport.onerror?.(new Error('Error 1'));
      internalTransport.onerror?.(new Error('Error 2'));
      internalTransport.onerror?.(new Error('Error 3'));

      expect(getTransports()[sessionId]).toBeDefined();
    });
  });

  // ---------------------------------------------------------------------------
  // Bug 2: Re-initialization with stale session ID
  // ---------------------------------------------------------------------------
  describe('re-initialization with stale session ID', () => {
    it('should create a new session instead of returning 404', async () => {
      await transport.start();
      transport.onmessage = async () => {};

      // Send an initialize request with a session ID that doesn't exist
      firePost(initializeBody, 'stale-session-id-that-does-not-exist');
      const sessionId = await waitForSession();

      // A new session was created (not rejected with 404)
      expect(sessionId).not.toBe('stale-session-id-that-does-not-exist');
      expect(getTransports()[sessionId]).toBeDefined();
    });

    it('should still reject non-initialize requests with unknown session IDs', async () => {
      await transport.start();
      transport.onmessage = async () => {};

      const response = await makeRequest(
        { jsonrpc: '2.0', method: 'tools/list', id: 1 },
        'nonexistent-session-id',
      );

      expect(response.statusCode).toBe(404);
      expect(response.body).toContain('Session not found');
    });
  });

  // ---------------------------------------------------------------------------
  // onclose SHOULD still clean up sessions (correct behavior preserved)
  // ---------------------------------------------------------------------------
  describe('onclose should still remove sessions', () => {
    it('should remove session when transport is closed', async () => {
      await transport.start();
      transport.onmessage = async () => {};

      firePost(initializeBody);
      const sessionId = await waitForSession();
      expect(getTransports()[sessionId]).toBeDefined();

      // Simulate the SDK calling close (as it does for DELETE requests)
      const internalTransport = getTransports()[sessionId];
      await internalTransport.close();

      expect(getTransports()[sessionId]).toBeUndefined();
    });
  });

  // ---------------------------------------------------------------------------
  // Broadcast send failures should not destroy sessions
  // ---------------------------------------------------------------------------
  describe('broadcast failures should not destroy sessions', () => {
    it('should preserve sessions after a failed broadcast send', async () => {
      await transport.start();
      transport.onmessage = async () => {};

      firePost(initializeBody);
      const sessionId = await waitForSession();

      // Monkey-patch the internal transport's send to throw
      const internalTransport = getTransports()[sessionId];
      internalTransport.send = async () => {
        throw new Error('Simulated send failure');
      };

      // Broadcast — should NOT remove the session
      await transport.send({ jsonrpc: '2.0', method: 'notification/test' });

      expect(getTransports()[sessionId]).toBeDefined();
    });
  });
});
