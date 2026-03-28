/**
 * Validation Middleware
 *
 * Request validation middleware using JSON Schema.
 */

import { Request, Response, NextFunction } from 'express';

interface ValidationSchema {
  body?: any;
  query?: any;
  params?: any;
}

/**
 * Simple JSON schema validation
 */
const validateSchema = (
  data: any,
  schema: any
): { valid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!schema) return { valid: true, errors };

  // Type validation
  if (schema.type) {
    const actualType = Array.isArray(data) ? 'array' : typeof data;
    if (actualType !== schema.type) {
      errors.push(`Expected type ${schema.type}, got ${actualType}`);
      return { valid: false, errors };
    }
  }

  // Required properties
  if (schema.required && schema.type === 'object') {
    for (const prop of schema.required) {
      if (!(prop in data)) {
        errors.push(`Missing required property: ${prop}`);
      }
    }
  }

  // Properties validation
  if (schema.properties && schema.type === 'object') {
    for (const [key, propSchema] of Object.entries(schema.properties)) {
      if (key in data) {
        const propValidation = validateSchema(data[key], propSchema);
        if (!propValidation.valid) {
          errors.push(...propValidation.errors.map((err) => `${key}: ${err}`));
        }
      }
    }
  }

  // Array items validation
  if (schema.items && schema.type === 'array') {
    for (let i = 0; i < data.length; i++) {
      const itemValidation = validateSchema(data[i], schema.items);
      if (!itemValidation.valid) {
        errors.push(...itemValidation.errors.map((err) => `[${i}]: ${err}`));
      }
    }
  }

  // Enum validation
  if (schema.enum && !schema.enum.includes(data)) {
    errors.push(`Value must be one of: ${schema.enum.join(', ')}`);
  }

  // OneOf validation
  if (schema.oneOf) {
    const validOptions = schema.oneOf.filter(
      (option: any) => validateSchema(data, option).valid
    );
    if (validOptions.length === 0) {
      errors.push('Value does not match any of the allowed schemas');
    } else if (validOptions.length > 1) {
      errors.push('Value matches multiple schemas (should match exactly one)');
    }
  }

  return { valid: errors.length === 0, errors };
};

/**
 * Validate request middleware
 */
export const validateRequest = (schema: ValidationSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const errors: string[] = [];

    // Validate body
    if (schema.body) {
      const bodyValidation = validateSchema(req.body, schema.body);
      if (!bodyValidation.valid) {
        errors.push(...bodyValidation.errors.map((err) => `body: ${err}`));
      }
    }

    // Validate query
    if (schema.query) {
      const queryValidation = validateSchema(req.query, schema.query);
      if (!queryValidation.valid) {
        errors.push(...queryValidation.errors.map((err) => `query: ${err}`));
      }
    }

    // Validate params
    if (schema.params) {
      const paramsValidation = validateSchema(req.params, schema.params);
      if (!paramsValidation.valid) {
        errors.push(...paramsValidation.errors.map((err) => `params: ${err}`));
      }
    }

    // If validation failed, return error
    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        message: 'Request validation failed',
        details: errors,
        timestamp: new Date().toISOString(),
      });
    }

    return next();
  };
};
