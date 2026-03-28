/**
 * Node Converter Registry System
 *
 * This module implements a plugin-based registry for converting Flowise nodes
 * into LangChain code. Each converter is responsible for transforming specific
 * node types into their corresponding LangChain implementations.
 */

import {
  IRNode,
  CodeFragment,
  GenerationContext,
  ConverterRegistryEntry,
  NodeId,
} from '../ir/types.js';

/**
 * Base interface for all node converters
 */
export interface NodeConverter {
  /**
   * The Flowise node type this converter handles
   */
  readonly flowiseType: string;

  /**
   * The category of nodes this converter handles
   */
  readonly category: string;

  /**
   * Convert a Flowise node to LangChain code fragments
   */
  convert(node: IRNode, context: GenerationContext): CodeFragment[];

  /**
   * Get required dependencies for this converter
   */
  getDependencies(node: IRNode, context?: GenerationContext): string[];

  /**
   * Validate if the node can be converted
   */
  canConvert(node: IRNode): boolean;

  /**
   * Get supported Flowise versions
   */
  getSupportedVersions(): string[];

  /**
   * Check if this converter is deprecated
   */
  isDeprecated(): boolean;

  /**
   * Get replacement converter if deprecated
   */
  getReplacementType(): string | undefined;
}

/**
 * Abstract base class for converters providing common functionality
 */
export abstract class BaseConverter implements NodeConverter {
  abstract readonly flowiseType: string;
  abstract readonly category: string;

  abstract convert(node: IRNode, context: GenerationContext): CodeFragment[];

  getDependencies(_node: IRNode, _context?: GenerationContext): string[] {
    // Default dependencies - can be overridden
    return ['@langchain/core'];
  }

  canConvert(node: IRNode): boolean {
    return node.type === this.flowiseType;
  }

  getSupportedVersions(): string[] {
    return ['*']; // Support all versions by default
  }

  isDeprecated(): boolean {
    return false;
  }

  getReplacementType(): string | undefined {
    return undefined;
  }

  /**
   * Helper method to create code fragments
   */
  protected createCodeFragment(
    id: string,
    type: CodeFragment['type'],
    content: string,
    dependencies: string[] = [],
    nodeId?: NodeId,
    order: number = 0,
    metadata?: Record<string, unknown>
  ): CodeFragment {
    return {
      id,
      type,
      content,
      dependencies,
      language: 'typescript', // Default to TypeScript
      metadata: {
        ...(nodeId !== undefined && { nodeId }),
        order,
        description: `Generated code for ${this.flowiseType}`,
        category: this.category,
        ...metadata,
      },
    };
  }

  /**
   * Helper method to generate import statements
   */
  protected generateImport(
    packageName: string,
    imports: string[],
    isDefault: boolean = false
  ): string {
    if (isDefault) {
      return `import ${imports[0]} from '${packageName}';`;
    }

    if (imports.length === 1) {
      return `import { ${imports[0]} } from '${packageName}';`;
    }

    return `import {\n  ${imports.join(',\n  ')}\n} from '${packageName}';`;
  }

  /**
   * Helper method to generate variable names
   */
  protected generateVariableName(node: IRNode, suffix: string = ''): string {
    const baseName = (node.label || node.type || node.id)
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');

    return `${baseName}${suffix ? `_${suffix}` : ''}`;
  }

  /**
   * Helper method to get parameter value with type safety
   */
  protected getParameterValue<T = unknown>(
    node: IRNode,
    paramName: string,
    defaultValue?: T
  ): T | undefined {
    if (!node.parameters || !Array.isArray(node.parameters)) {
      return defaultValue;
    }
    const param = node.parameters.find((p) => p.name === paramName);
    return (param?.value as T) ?? defaultValue;
  }

  /**
   * Helper method to format parameter values for code generation
   */
  protected formatParameterValue(value: unknown): string {
    if (value === null || value === undefined) {
      return 'undefined';
    }

    if (typeof value === 'string') {
      return `"${value.replace(/"/g, '\\"')}"`;
    }

    if (typeof value === 'boolean' || typeof value === 'number') {
      return String(value);
    }

    if (Array.isArray(value)) {
      return `[${value.map((v) => this.formatParameterValue(v)).join(', ')}]`;
    }

    if (typeof value === 'object') {
      const entries = Object.entries(value)
        .map(([k, v]) => `${k}: ${this.formatParameterValue(v)}`)
        .join(', ');
      return `{ ${entries} }`;
    }

    return String(value);
  }
}

/**
 * Registry for managing node converters
 */
export class ConverterRegistry {
  private converters = new Map<string, NodeConverter>();
  private aliases = new Map<string, string>();

  /**
   * Register a converter for a specific node type
   */
  register(converter: NodeConverter): void {
    if (this.converters.has(converter.flowiseType)) {
      throw new Error(
        `Converter for type '${converter.flowiseType}' is already registered`
      );
    }

    this.converters.set(converter.flowiseType, converter);
  }

  /**
   * Register an alias for a node type
   */
  registerAlias(alias: string, targetType: string): void {
    if (!this.converters.has(targetType)) {
      throw new Error(`Target type '${targetType}' is not registered`);
    }

    this.aliases.set(alias, targetType);
  }

  /**
   * Unregister a converter
   */
  unregister(flowiseType: string): boolean {
    return this.converters.delete(flowiseType);
  }

  /**
   * Get a converter for a specific node type
   */
  getConverter(flowiseType: string): NodeConverter | undefined {
    // Check direct match first
    let converter = this.converters.get(flowiseType);

    // Check aliases if no direct match
    if (!converter) {
      const targetType = this.aliases.get(flowiseType);
      if (targetType) {
        converter = this.converters.get(targetType);
      }
    }

    return converter;
  }

  /**
   * Check if a converter exists for a node type
   */
  hasConverter(flowiseType: string): boolean {
    return this.converters.has(flowiseType) || this.aliases.has(flowiseType);
  }

  /**
   * Get all registered converter types
   */
  getRegisteredTypes(): string[] {
    return Array.from(this.converters.keys());
  }

  /**
   * Get all registered aliases
   */
  getRegisteredAliases(): Record<string, string> {
    return Object.fromEntries(this.aliases);
  }

  /**
   * Get converters by category
   */
  getConvertersByCategory(category: string): NodeConverter[] {
    return Array.from(this.converters.values()).filter(
      (converter) => converter.category === category
    );
  }

  /**
   * Convert a node using the appropriate converter
   */
  convertNode(node: IRNode, context: GenerationContext): CodeFragment[] {
    const converter = this.getConverter(node.type);

    if (!converter) {
      throw new Error(`No converter registered for node type: ${node.type}`);
    }

    if (!converter.canConvert(node)) {
      throw new Error(`Converter for '${node.type}' cannot convert this node`);
    }

    if (converter.isDeprecated()) {
      const replacement = converter.getReplacementType();
      console.warn(
        `Converter for '${node.type}' is deprecated.` +
          (replacement ? ` Use '${replacement}' instead.` : '')
      );
    }

    return converter.convert(node, context);
  }

  /**
   * Get all dependencies for a set of nodes
   */
  getAllDependencies(nodes: IRNode[], context: GenerationContext): string[] {
    const allDeps = new Set<string>();

    for (const node of nodes) {
      const converter = this.getConverter(node.type);
      if (converter) {
        const deps = converter.getDependencies(node, context);
        deps.forEach((dep) => allDeps.add(dep));
      }
    }

    return Array.from(allDeps).sort();
  }

  /**
   * Validate that all nodes can be converted
   */
  validateNodes(nodes: IRNode[]): {
    valid: boolean;
    unsupportedNodes: IRNode[];
    deprecatedNodes: IRNode[];
  } {
    const unsupportedNodes: IRNode[] = [];
    const deprecatedNodes: IRNode[] = [];

    for (const node of nodes) {
      const converter = this.getConverter(node.type);

      if (!converter) {
        unsupportedNodes.push(node);
      } else if (converter.isDeprecated()) {
        deprecatedNodes.push(node);
      }
    }

    return {
      valid: unsupportedNodes.length === 0,
      unsupportedNodes,
      deprecatedNodes,
    };
  }

  /**
   * Get registry statistics
   */
  getStatistics(): {
    totalConverters: number;
    totalAliases: number;
    convertersByCategory: Record<string, number>;
    deprecatedConverters: number;
  } {
    const convertersByCategory: Record<string, number> = {};
    let deprecatedCount = 0;

    for (const converter of this.converters.values()) {
      const category = converter.category;
      convertersByCategory[category] =
        (convertersByCategory[category] || 0) + 1;

      if (converter.isDeprecated()) {
        deprecatedCount++;
      }
    }

    return {
      totalConverters: this.converters.size,
      totalAliases: this.aliases.size,
      convertersByCategory,
      deprecatedConverters: deprecatedCount,
    };
  }

  /**
   * Clear all registered converters
   */
  clear(): void {
    this.converters.clear();
    this.aliases.clear();
  }

  /**
   * Create a registry entry for external registration
   */
  createRegistryEntry(converter: NodeConverter): ConverterRegistryEntry {
    const replacedBy = converter.getReplacementType();
    return {
      flowiseType: converter.flowiseType,
      category: converter.category,
      converter: converter.convert.bind(converter),
      dependencies: [],
      supportedVersions: converter.getSupportedVersions(),
      deprecated: converter.isDeprecated(),
      ...(replacedBy !== undefined && { replacedBy }),
      documentation: `Converter for ${converter.flowiseType} nodes`,
    };
  }
}

/**
 * Factory for creating converter instances
 */
export class ConverterFactory {
  private static registry = new ConverterRegistry();

  /**
   * Get the global converter registry
   */
  static getRegistry(): ConverterRegistry {
    return this.registry;
  }

  /**
   * Create a converter instance by type
   */
  static createConverter(type: string): NodeConverter | undefined {
    return this.registry.getConverter(type);
  }

  /**
   * Register a converter class
   */
  static registerConverter(ConverterClass: new () => NodeConverter): void {
    const instance = new ConverterClass();
    this.registry.register(instance);
  }

  /**
   * Bulk register multiple converters
   */
  static registerConverters(
    ConverterClasses: Array<new () => NodeConverter>
  ): void {
    for (const ConverterClass of ConverterClasses) {
      this.registerConverter(ConverterClass);
    }
  }

  /**
   * Auto-discover and register converters from a module
   */
  static async autoRegisterFromModule(modulePath: string): Promise<void> {
    try {
      const module = await import(modulePath);

      for (const [name, exportedItem] of Object.entries(module)) {
        if (
          typeof exportedItem === 'function' &&
          name.endsWith('Converter') &&
          exportedItem.prototype &&
          'convert' in exportedItem.prototype
        ) {
          this.registerConverter(exportedItem as new () => NodeConverter);
        }
      }
    } catch (error) {
      throw new Error(
        `Failed to auto-register converters from ${modulePath}: ${error}`
      );
    }
  }

  /**
   * Reset the registry (useful for testing)
   */
  static reset(): void {
    this.registry.clear();
  }
}

/**
 * Default global converter registry instance
 */
export const converterRegistry = ConverterFactory.getRegistry();

/**
 * Plugin interface for extending the registry
 */
export interface ConverterPlugin {
  name: string;
  version: string;
  description?: string;
  converters: Array<new () => NodeConverter>;
  aliases?: Record<string, string>;

  /**
   * Initialize the plugin
   */
  initialize?(registry: ConverterRegistry): void;

  /**
   * Cleanup the plugin
   */
  cleanup?(registry: ConverterRegistry): void;
}

/**
 * Plugin manager for handling converter plugins
 */
export class PluginManager {
  private plugins = new Map<string, ConverterPlugin>();
  private registry: ConverterRegistry;

  constructor(registry: ConverterRegistry = converterRegistry) {
    this.registry = registry;
  }

  /**
   * Load a plugin
   */
  loadPlugin(plugin: ConverterPlugin): void {
    if (this.plugins.has(plugin.name)) {
      throw new Error(`Plugin '${plugin.name}' is already loaded`);
    }

    // Register converters
    for (const ConverterClass of plugin.converters) {
      const instance = new ConverterClass();
      this.registry.register(instance);
    }

    // Register aliases
    if (plugin.aliases) {
      for (const [alias, target] of Object.entries(plugin.aliases)) {
        this.registry.registerAlias(alias, target);
      }
    }

    // Initialize plugin
    if (plugin.initialize) {
      plugin.initialize(this.registry);
    }

    this.plugins.set(plugin.name, plugin);
  }

  /**
   * Unload a plugin
   */
  unloadPlugin(pluginName: string): boolean {
    const plugin = this.plugins.get(pluginName);
    if (!plugin) {
      return false;
    }

    // Cleanup plugin
    if (plugin.cleanup) {
      plugin.cleanup(this.registry);
    }

    // Unregister converters
    for (const ConverterClass of plugin.converters) {
      const instance = new ConverterClass();
      this.registry.unregister(instance.flowiseType);
    }

    this.plugins.delete(pluginName);
    return true;
  }

  /**
   * Get loaded plugins
   */
  getLoadedPlugins(): ConverterPlugin[] {
    return Array.from(this.plugins.values());
  }

  /**
   * Check if a plugin is loaded
   */
  isPluginLoaded(pluginName: string): boolean {
    return this.plugins.has(pluginName);
  }
}

export default ConverterRegistry;
