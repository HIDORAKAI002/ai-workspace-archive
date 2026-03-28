/**
 * Development Tools Wrapper Converters
 *
 * Wraps static development tool converters to follow NodeConverter pattern
 */

import { BaseConverter } from '../registry.js';
import {
  IRNode,
  GenerationContext,
  CodeSection,
  CodeFragment,
} from '../../ir/types.js';
import {
  CodeInterpreterConverter,
  OpenAPIConverter,
  GitHubConverter,
  DockerConverter,
  ShellConverter,
  DatabaseConverter,
} from './development-tools.js';

// Base wrapper class
abstract class DevelopmentToolWrapper extends BaseConverter {
  category = 'tools';

  abstract getStaticConverter(): any;

  convert(node: IRNode, context: GenerationContext): CodeFragment[] {
    const nodeData = {
      id: node.id,
      type: node.type,
      category: this.category,
      label: node.label,
      version: node.version || 1,
      name: node.name,
      inputs: node.data?.inputs || {},
      outputs: node.data?.outputs || {},
      outputAnchors: node.data?.outputAnchors || [],
    };

    const result = this.getStaticConverter().convert(nodeData);

    if (!result.success) {
      throw new Error(result.error || 'Conversion failed');
    }

    const fragments: CodeFragment[] = [];

    // Add imports
    if (result.imports?.length) {
      fragments.push(
        this.createCodeFragment(
          `${node.id}_imports`,
          'import',
          result.imports.join('\n'),
          result.dependencies || [],
          node.id,
          1
        )
      );
    }

    // Add main code
    fragments.push(
      this.createCodeFragment(
        `${node.id}_execution`,
        'execution',
        result.code,
        result.dependencies || [],
        node.id,
        100
      )
    );

    return fragments;
  }

  override getDependencies(): string[] {
    return ['@langchain/core'];
  }

  getImportStatements(): string[] {
    return ['import { DynamicStructuredTool } from "@langchain/core/tools";'];
  }
}

// Wrapper implementations
export class CodeInterpreterWrapper extends DevelopmentToolWrapper {
  readonly flowiseType = 'codeInterpreter';
  getStaticConverter() {
    return CodeInterpreterConverter;
  }
}

export class OpenAPIWrapper extends DevelopmentToolWrapper {
  readonly flowiseType = 'openAPITool';
  getStaticConverter() {
    return OpenAPIConverter;
  }
}

export class GitHubWrapper extends DevelopmentToolWrapper {
  readonly flowiseType = 'githubTool';
  getStaticConverter() {
    return GitHubConverter;
  }
}

export class DockerWrapper extends DevelopmentToolWrapper {
  readonly flowiseType = 'dockerTool';
  getStaticConverter() {
    return DockerConverter;
  }
}

export class ShellWrapper extends DevelopmentToolWrapper {
  readonly flowiseType = 'shellToolAdvanced';
  getStaticConverter() {
    return ShellConverter;
  }
}

export class DatabaseWrapper extends DevelopmentToolWrapper {
  readonly flowiseType = 'databaseTool';
  getStaticConverter() {
    return DatabaseConverter;
  }
}
