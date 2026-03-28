/**
 * Google Suite Tools Converters
 *
 * Converts Flowise Google Suite tool nodes into LangChain implementations
 * Supports Gmail, Calendar, Drive, Docs, and Sheets integration
 */

import { BaseConverter } from '../registry.js';
import { IRNode, CodeFragment, GenerationContext } from '../../ir/types.js';

/**
 * Base Google Tool converter with common OAuth2 functionality
 */
abstract class BaseGoogleToolConverter extends BaseConverter {
  readonly category = 'google-tool';

  protected generateGoogleToolConfiguration(
    node: IRNode,
    _context: GenerationContext
  ): {
    imports: string[];
    packageName: string;
    className: string;
    config: Record<string, unknown>;
    auth: Record<string, unknown>;
  } {
    return {
      imports: this.getRequiredImports(),
      packageName: this.getPackageName(),
      className: this.getClassName(),
      config: this.extractToolConfig(node),
      auth: this.extractAuthConfig(node),
    };
  }

  protected abstract getRequiredImports(): string[];
  protected abstract getPackageName(): string;
  protected abstract getClassName(): string;
  protected abstract extractToolConfig(node: IRNode): Record<string, unknown>;
  protected abstract getGoogleService(): string;

  protected extractAuthConfig(node: IRNode): Record<string, unknown> {
    const auth: Record<string, unknown> = {};

    const clientId = this.getParameterValue(
      node,
      'clientId',
      'process.env.GOOGLE_CLIENT_ID'
    );
    const clientSecret = this.getParameterValue(
      node,
      'clientSecret',
      'process.env.GOOGLE_CLIENT_SECRET'
    );
    const refreshToken = this.getParameterValue(
      node,
      'refreshToken',
      'process.env.GOOGLE_REFRESH_TOKEN'
    );
    const accessToken = this.getParameterValue(node, 'accessToken', '');

    auth.clientId =
      clientId === 'process.env.GOOGLE_CLIENT_ID'
        ? clientId
        : this.formatParameterValue(clientId);
    auth.clientSecret =
      clientSecret === 'process.env.GOOGLE_CLIENT_SECRET'
        ? clientSecret
        : this.formatParameterValue(clientSecret);
    auth.refreshToken =
      refreshToken === 'process.env.GOOGLE_REFRESH_TOKEN'
        ? refreshToken
        : this.formatParameterValue(refreshToken);

    if (accessToken) {
      auth.accessToken = this.formatParameterValue(accessToken);
    }

    return auth;
  }

  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const variableName = this.generateVariableName(
      node,
      `google_${this.getGoogleService()}`
    );
    const config = this.generateGoogleToolConfiguration(node, context);
    const fragments: CodeFragment[] = [];

    // Import fragment
    fragments.push(
      this.createCodeFragment(
        `${node.id}_import`,
        'import',
        this.generateImport(config.packageName, config.imports) +
          '\n' +
          "import { OAuth2Client } from 'google-auth-library';",
        [config.packageName, 'google-auth-library'],
        node.id,
        1
      )
    );

    // Auth configuration fragment
    if (Object.keys(config.auth).length > 0) {
      const authCode = this.generateAuthCode(config.auth, variableName);
      fragments.push(
        this.createCodeFragment(
          `${node.id}_auth`,
          'declaration',
          authCode,
          ['google-auth'],
          node.id,
          50
        )
      );
    }

    // Tool configuration fragment
    const configStr = this.generateConfigurationString(config.config);
    const initCode = configStr
      ? `const ${variableName} = new ${config.className}(${configStr});`
      : `const ${variableName} = new ${config.className}();`;

    fragments.push(
      this.createCodeFragment(
        `${node.id}_init`,
        'initialization',
        initCode,
        [config.className],
        node.id,
        100
      )
    );

    return fragments;
  }

  protected generateAuthCode(
    auth: Record<string, unknown>,
    variableName: string
  ): string {
    const authEntries = Object.entries(auth);
    if (authEntries.length === 0) return '';

    const authConfig = authEntries
      .map(([key, value]) => {
        return `  ${key}: ${value}`;
      })
      .join(',\n');

    return `const ${variableName}_auth = {\n${authConfig}\n};`;
  }

  protected generateConfigurationString(
    config: Record<string, unknown>
  ): string {
    const entries = Object.entries(config);
    if (entries.length === 0) return '';

    const configPairs = entries.map(([key, value]) => {
      return `${key}: ${this.formatParameterValue(value)}`;
    });

    return `{\n  ${configPairs.join(',\n  ')}\n}`;
  }
}

/**
 * Gmail Tool Converter
 * Email management and automation
 */
export class GmailToolConverter extends BaseGoogleToolConverter {
  readonly flowiseType = 'gmailTool';

  protected getRequiredImports(): string[] {
    return ['GmailTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/gmail';
  }

  protected getClassName(): string {
    return 'GmailTool';
  }

  protected getGoogleService(): string {
    return 'gmail';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const maxResults = this.getParameterValue(node, 'maxResults', 10);
    const includeSpamTrash = this.getParameterValue(
      node,
      'includeSpamTrash',
      false
    );
    const labelIds = this.getParameterValue(node, 'labelIds', []);
    const query = this.getParameterValue(node, 'query', '');

    config.maxResults = maxResults;
    config.includeSpamTrash = includeSpamTrash;

    if (Array.isArray(labelIds) && labelIds.length > 0) {
      config.labelIds = labelIds;
    }

    if (query) {
      config.query = query;
    }

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}

/**
 * Google Calendar Tool Converter
 * Event scheduling and management
 */
export class GoogleCalendarToolConverter extends BaseGoogleToolConverter {
  readonly flowiseType = 'googleCalendarTool';

  protected getRequiredImports(): string[] {
    return ['GoogleCalendarTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_calendar';
  }

  protected getClassName(): string {
    return 'GoogleCalendarTool';
  }

  protected getGoogleService(): string {
    return 'calendar';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const calendarId = this.getParameterValue(node, 'calendarId', 'primary');
    const maxResults = this.getParameterValue(node, 'maxResults', 10);
    const timeMin = this.getParameterValue(node, 'timeMin', '');
    const timeMax = this.getParameterValue(node, 'timeMax', '');

    config.calendarId = calendarId;
    config.maxResults = maxResults;

    if (timeMin) {
      config.timeMin = timeMin;
    }

    if (timeMax) {
      config.timeMax = timeMax;
    }

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}

/**
 * Google Drive Tool Converter
 * File storage and sharing
 */
export class GoogleDriveToolConverter extends BaseGoogleToolConverter {
  readonly flowiseType = 'googleDriveTool';

  protected getRequiredImports(): string[] {
    return ['GoogleDriveTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_drive';
  }

  protected getClassName(): string {
    return 'GoogleDriveTool';
  }

  protected getGoogleService(): string {
    return 'drive';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const folderId = this.getParameterValue(node, 'folderId', '');
    const maxResults = this.getParameterValue(node, 'maxResults', 100);
    const includeItemsFromAllDrives = this.getParameterValue(
      node,
      'includeItemsFromAllDrives',
      false
    );
    const mimeType = this.getParameterValue(node, 'mimeType', '');

    if (folderId) {
      config.folderId = folderId;
    }

    config.maxResults = maxResults;
    config.includeItemsFromAllDrives = includeItemsFromAllDrives;

    if (mimeType) {
      config.mimeType = mimeType;
    }

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}

/**
 * Google Docs Tool Converter
 * Document creation and editing
 */
export class GoogleDocsToolConverter extends BaseGoogleToolConverter {
  readonly flowiseType = 'googleDocsTool';

  protected getRequiredImports(): string[] {
    return ['GoogleDocsTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_docs';
  }

  protected getClassName(): string {
    return 'GoogleDocsTool';
  }

  protected getGoogleService(): string {
    return 'docs';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const documentId = this.getParameterValue(node, 'documentId', '');
    const readOnly = this.getParameterValue(node, 'readOnly', false);
    const includeComments = this.getParameterValue(
      node,
      'includeComments',
      false
    );

    if (documentId) {
      config.documentId = documentId;
    }

    config.readOnly = readOnly;
    config.includeComments = includeComments;

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}

/**
 * Google Sheets Tool Converter
 * Spreadsheet automation
 */
export class GoogleSheetsToolConverter extends BaseGoogleToolConverter {
  readonly flowiseType = 'googleSheetsTool';

  protected getRequiredImports(): string[] {
    return ['GoogleSheetsTool'];
  }

  protected getPackageName(): string {
    return '@langchain/community/tools/google_sheets';
  }

  protected getClassName(): string {
    return 'GoogleSheetsTool';
  }

  protected getGoogleService(): string {
    return 'sheets';
  }

  protected extractToolConfig(node: IRNode): Record<string, unknown> {
    const config: Record<string, unknown> = {};

    const spreadsheetId = this.getParameterValue(node, 'spreadsheetId', '');
    const range = this.getParameterValue(node, 'range', 'A1:Z1000');
    const valueInputOption = this.getParameterValue(
      node,
      'valueInputOption',
      'RAW'
    );
    const includeGridData = this.getParameterValue(
      node,
      'includeGridData',
      false
    );

    if (spreadsheetId) {
      config.spreadsheetId = spreadsheetId;
    }

    config.range = range;
    config.valueInputOption = valueInputOption;
    config.includeGridData = includeGridData;

    return config;
  }

  override getDependencies(node: IRNode, context: GenerationContext): string[] {
    return [
      'googleapis',
      '@langchain/community',
      'google-auth-library',
      'limiter',
      'jsonwebtoken',
      'crypto',
    ];
  }
}
