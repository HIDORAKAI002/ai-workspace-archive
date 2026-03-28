/**
 * Test module for prompt validation and verification.
 * Contains utilities for validating prompt structures and their parameters.
 */

// Copyright (c) 2025, 2026 Jon Verrier

// ===Start StrongAI Generated Comment (20260219)===
// This module provides utilities and tests for validating prompt definitions used by an application. Its purpose is to ensure prompt objects and their parameter specifications meet a strict structure before use.
// 
// It exports two classes. PromptValidationError is a custom error type thrown when validation fails. PromptValidator exposes a static validatePrompt function that checks a Partial<IPrompt>. It verifies required top-level fields (id, version, name, systemPrompt, userPrompt). It ensures userPromptParameters and systemPromptParameters, when present, are arrays and each set contains at least one required parameter. It validates each parameter using a private helper that enforces required fields (name, description, required, type), requires defaultValue for optional parameters, and restricts type to ParameterTypeString or ParameterTypeNumber. Any deviation throws PromptValidationError.
// 
// The module imports IPrompt, IPromptParameterSpec, and the ParameterType constants from ../src/entry to drive type and value checks. It loads a known-good prompt from Prompts.json as test data. It uses mocha’s describe and it plus expect from expect to define and assert test cases that cover structure, parameter rules, default values, and rejection of unsupported enum parameters.
// ===End StrongAI Generated Comment===

import { expect } from 'expect';
import { describe, it } from 'mocha';
import { IPrompt, IPromptParameterSpec, ParameterTypeString, ParameterTypeNumber, ParameterTypeEnum } from '../src/entry';
import prompts from '../src/Prompts.json';

export class PromptValidationError extends Error {
   constructor(message: string) {
      super(message);
      this.name = 'PromptValidationError';
   }
}

export class PromptValidator {

   static validatePrompt(prompt: Partial<IPrompt>): void {
      // Check required top-level fields
      const requiredFields = ['id', 'version', 'name', 'systemPrompt', 'userPrompt'];
      for (const field of requiredFields) {
         if (!prompt[field as keyof IPrompt]) {
            throw new PromptValidationError(`Missing required field: ${field}`);
         }
      }

      // Check parameter structure
      if (prompt.userPromptParameters) {
         if (!Array.isArray(prompt.userPromptParameters)) {
            throw new PromptValidationError('userPromptParameters must be an array');
         }
         
         // Ensure at least one required parameter exists
         const hasRequiredParam = prompt.userPromptParameters.some(param => param.required);
         if (!hasRequiredParam) {
            throw new PromptValidationError('User prompt missing a required parameter');
         }
         for (const param of prompt.userPromptParameters) {
            this.validateParameter(param);
         }
      }
      if (prompt.systemPromptParameters) {
         if (!Array.isArray(prompt.systemPromptParameters)) {
            throw new PromptValidationError('systemPromptParameters must be an array');
         }

         // Ensure at least one required parameter exists
         const hasRequiredParam = prompt.systemPromptParameters.some(param => param.required);
         if (!hasRequiredParam) {
            throw new PromptValidationError('System prompt missing a required parameter');
         }
         for (const param of prompt.systemPromptParameters) {
            this.validateParameter(param);
         }
      }
   }

   private static validateParameter(param: Partial<IPromptParameterSpec>): void {
      // Check required parameter fields
      const requiredFields = ['name', 'description', 'required', 'type'];
      for (const field of requiredFields) {
         if (param[field as keyof IPromptParameterSpec] === undefined) {
            throw new PromptValidationError(`Missing required field in parameter: ${field}`);
         }
      }

      // Validate defaultValue presence for optional parameters
      if (param.required === false && !param.defaultValue) {
         throw new PromptValidationError(
            `Optional parameter "${param.name}" must have a default value`
         );
      }

      // Validate type is one of the allowed types
      if (param.type !== ParameterTypeString && param.type !== ParameterTypeNumber) {
         throw new PromptValidationError(`Invalid type for parameter "${param.name}": ${param.type}`);
      }
   }
}

describe('PromptValidator', () => {
   // Test data
   const validUnitTestPrompt: IPrompt = prompts.find(p => p.id === "f6596917-628b-4901-b41d-a2fbfaca63e2")!;

   describe('Basic Structure Validation', () => {
      it('should validate a correct prompt structure', () => {
         expect(() => PromptValidator.validatePrompt(validUnitTestPrompt)).not.toThrow();
      });

      it('should fail when missing id', () => {
         const invalidPrompt = { ...validUnitTestPrompt, id: undefined };
         expect(() => PromptValidator.validatePrompt(invalidPrompt))
            .toThrow(PromptValidationError);
      });

      it('should fail when missing version', () => {
         const invalidPrompt = { ...validUnitTestPrompt, version: undefined };
         expect(() => PromptValidator.validatePrompt(invalidPrompt))
            .toThrow(PromptValidationError);
      });

      it('should fail when userPromptParameters is not an array', () => {
         const invalidPrompt = {
            ...validUnitTestPrompt,
            userPromptParameters: 'not an array' as any
         };
         expect(() => PromptValidator.validatePrompt(invalidPrompt))
            .toThrow(PromptValidationError);
      });

      it('should fail when systemPromptParameters is not an array', () => {
         const invalidPrompt = {
            ...validUnitTestPrompt,
            systemPromptParameters: 'not an array' as any
         };
         expect(() => PromptValidator.validatePrompt(invalidPrompt))
            .toThrow(PromptValidationError);
      });
   });

   describe('Parameter Validation', () => {
      it('should validate parameter structure when missing description', () => {
         const invalidParam = {
            ...validUnitTestPrompt,
            userPromptParameters: [{
               name: "test",
               // missing description
               required: true
            }]
         };
         expect(() => PromptValidator.validatePrompt(invalidParam as unknown as Partial<IPrompt>))
            .toThrow(PromptValidationError);
      });

      it('should validate parameter structure when missing \'required\'', () => {
         const invalidParam = {
            ...validUnitTestPrompt,
            userPromptParameters: [{
               name: "test",
               description: "test param",
               type: ParameterTypeString,
               // missing required               
            }]
         };
         expect(() => PromptValidator.validatePrompt(invalidParam as unknown as Partial<IPrompt>))
            .toThrow(PromptValidationError);
      });

      it('should require default values for optional parameters', () => {
         const missingDefault = {
            ...validUnitTestPrompt,
            userPromptParameters: [{
               name: "test",
               description: "test param",
               type: ParameterTypeString,
               required: false
            }]
         };
         expect(() => PromptValidator.validatePrompt(missingDefault as unknown as Partial<IPrompt>))
            .toThrow(PromptValidationError);
      });

      it('should use the default values for optional parameters', () => {
         const missingDefault = {
            ...validUnitTestPrompt,
            userPromptParameters: [{
               "name": "prompt",
               "description": "A prompt for an LLM for which we want to generate test code.",
               "required": true,
               "type": ParameterTypeString
             }, 
             {
               name: "test",
               description: "test param",
               type: ParameterTypeString,
               required: false,
               defaultValue: "testDefaultValue"
            }]
         };
            expect(() => PromptValidator.validatePrompt(missingDefault as unknown as Partial<IPrompt>))
               .not.toThrow(PromptValidationError);
      });

      it('should validate enum parameters', () => {
         const invalidParam = {
            ...validUnitTestPrompt,
            userPromptParameters: [{
               name: "test",
               description: "test param",
               type: ParameterTypeEnum,
               required: true,
               allowedValues: ["test1", "test2"]
            }]
         };
         expect(() => PromptValidator.validatePrompt(invalidParam as unknown as Partial<IPrompt>))
            .toThrow(PromptValidationError);
      });

      it('should require all required parameters', () => {
         const noRequiredParams = {
            ...validUnitTestPrompt,
            userPromptParameters: [
               {
                  name: "language",
                  description: "The language in which to generate tests.",
                  type: ParameterTypeString,
                  required: false,
                  defaultValue: "typescript"
               }
            ]
         };
         expect(() => PromptValidator.validatePrompt(noRequiredParams as unknown as Partial<IPrompt>))
            .toThrow(PromptValidationError);
      });
   });
});


