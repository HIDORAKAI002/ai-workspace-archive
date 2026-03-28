import { IncomingMessage } from "node:http";
import { logger } from "../../core/Logger.js";
import { AuthProvider, AuthResult, DEFAULT_AUTH_ERROR } from "../types.js";

export const DEFAULT_API_KEY_HEADER_NAME = "X-API-Key"
/**
 * Configuration options for API key authentication
 */
export interface APIKeyConfig {
  /**
   * Valid API keys
   */
  keys: string[];

  /**
   * Name of the header containing the API key
   * @default "X-API-Key"
   */
  headerName?: string;
}

/**
 * API key-based authentication provider
 */
export class APIKeyAuthProvider implements AuthProvider {
  private config: Required<APIKeyConfig>;

  constructor(config: APIKeyConfig) {
    this.config = {
      headerName: DEFAULT_API_KEY_HEADER_NAME,
      ...config
    };

    if (!this.config.keys?.length) {
      throw new Error("At least one API key is required");
    }
  }

  /**
   * Get the number of configured API keys
   */
  getKeyCount(): number {
    return this.config.keys.length;
  }

  /**
   * Get the configured header name
   */
  getHeaderName(): string {
    return this.config.headerName;
  }

  async authenticate(req: IncomingMessage): Promise<boolean | AuthResult> {
    logger.debug(`API Key auth attempt from ${req.socket.remoteAddress}`);
    
    logger.debug(`All request headers: ${JSON.stringify(req.headers, null, 2)}`);
    
    const headerVariations = [
      this.config.headerName,
      this.config.headerName.toLowerCase(),
      this.config.headerName.toUpperCase(),
      'x-api-key',
      'X-API-KEY',
      'X-Api-Key'
    ];
    
    logger.debug(`Looking for header variations: ${headerVariations.join(', ')}`);
    
    let apiKey: string | undefined;
    let matchedHeader: string | undefined;

    for (const [key, value] of Object.entries(req.headers)) {
      const lowerKey = key.toLowerCase();
      if (headerVariations.some(h => h.toLowerCase() === lowerKey)) {
        apiKey = Array.isArray(value) ? value[0] : value;
        matchedHeader = key;
        break;
      }
    }
    
    if (!apiKey) {
      logger.debug(`API Key header missing}`);
      logger.debug(`Available headers: ${Object.keys(req.headers).join(', ')}`);
      return false;
    }

    logger.debug(`Found API key in header: ${matchedHeader}`);
    
    for (const validKey of this.config.keys) {
      if (apiKey === validKey) {
        logger.debug(`API Key authentication successful`);
        return true;
      }
    }

    logger.debug(`Invalid API Key provided`);
    return false;
  }

  getAuthError() {
    return {
      ...DEFAULT_AUTH_ERROR,
      message: "Invalid API key"
    };
  }
}
