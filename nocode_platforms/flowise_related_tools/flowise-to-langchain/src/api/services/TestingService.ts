/**
 * Testing Service
 * 
 * Handles testing of converted LangChain code
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';

const execAsync = promisify(exec);

export interface TestResult {
  success: boolean;
  output?: string;
  error?: string;
  duration: number;
  testsPassed?: number;
  testsFailed?: number;
}

export class TestingService {
  async runTests(projectPath: string, testCommand?: string): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // Check if project exists
      await fs.access(projectPath);
      
      // Default test command
      const cmd = testCommand || 'npm test';
      
      // Run tests
      const { stdout, stderr } = await execAsync(cmd, {
        cwd: projectPath,
        timeout: 60000 // 1 minute timeout
      });
      
      const duration = Date.now() - startTime;
      
      // Parse test results if possible
      const testsPassed = this.extractTestCount(stdout, /(\d+) passed/);
      const testsFailed = this.extractTestCount(stdout, /(\d+) failed/);
      
      return {
        success: !stderr || stderr.length === 0,
        output: stdout,
        error: stderr,
        duration,
        testsPassed,
        testsFailed
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration
      };
    }
  }

  async runSingleTest(
    code: string, 
    testInput?: any,
    language: 'typescript' | 'javascript' = 'typescript'
  ): Promise<TestResult> {
    const startTime = Date.now();
    
    try {
      // Create temporary directory
      const tmpDir = path.join(process.cwd(), '.tmp', `test_${Date.now()}`);
      await fs.mkdir(tmpDir, { recursive: true });
      
      // Write test file
      const ext = language === 'typescript' ? 'ts' : 'js';
      const testFile = path.join(tmpDir, `test.${ext}`);
      await fs.writeFile(testFile, code);
      
      // Run the test
      const cmd = language === 'typescript' 
        ? `npx tsx ${testFile}`
        : `node ${testFile}`;
        
      const { stdout, stderr } = await execAsync(cmd, {
        cwd: tmpDir,
        timeout: 30000
      });
      
      // Clean up
      await fs.rm(tmpDir, { recursive: true, force: true });
      
      const duration = Date.now() - startTime;
      
      return {
        success: true,
        output: stdout,
        error: stderr,
        duration
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        duration
      };
    }
  }

  async validateCode(code: string, language: 'typescript' | 'javascript'): Promise<{
    valid: boolean;
    errors: string[];
  }> {
    try {
      if (language === 'typescript') {
        // Use TypeScript compiler API for validation
        const { stdout, stderr } = await execAsync('npx tsc --noEmit', {
          input: code
        });
        
        return {
          valid: !stderr,
          errors: stderr ? [stderr] : []
        };
      } else {
        // Basic JavaScript syntax check
        try {
          new Function(code);
          return { valid: true, errors: [] };
        } catch (error) {
          return {
            valid: false,
            errors: [error instanceof Error ? error.message : 'Syntax error']
          };
        }
      }
    } catch (error) {
      return {
        valid: false,
        errors: [error instanceof Error ? error.message : 'Validation failed']
      };
    }
  }

  private extractTestCount(output: string, pattern: RegExp): number | undefined {
    const match = output.match(pattern);
    return match ? parseInt(match[1], 10) : undefined;
  }
}