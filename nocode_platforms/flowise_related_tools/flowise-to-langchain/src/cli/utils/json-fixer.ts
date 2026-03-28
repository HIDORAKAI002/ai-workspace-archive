/**
 * Utility functions to automatically fix common JSON issues in Flowise exports
 */

export async function fixJsonIssues(jsonString: string): Promise<any | null> {
  try {
    // Try to parse as-is first
    return JSON.parse(jsonString);
  } catch (initialError) {
    console.log('Attempting to fix JSON issues...');

    let fixedJson = jsonString;

    // Common fixes to apply
    const fixes = [
      // Fix trailing commas
      () => {
        fixedJson = fixedJson.replace(/,(\s*[}\]])/g, '$1');
      },

      // Fix single quotes to double quotes
      () => {
        fixedJson = fixedJson.replace(/'/g, '"');
      },

      // Fix unquoted keys
      () => {
        fixedJson = fixedJson.replace(
          /([{,]\s*)([a-zA-Z_$][a-zA-Z0-9_$]*)\s*:/g,
          '$1"$2":'
        );
      },

      // Fix undefined values
      () => {
        fixedJson = fixedJson.replace(/:\s*undefined/g, ': null');
      },

      // Fix NaN values
      () => {
        fixedJson = fixedJson.replace(/:\s*NaN/g, ': null');
      },

      // Fix Infinity values
      () => {
        fixedJson = fixedJson.replace(/:\s*Infinity/g, ': null');
      },

      // Fix function expressions (remove them)
      () => {
        fixedJson = fixedJson.replace(
          /:\s*function\s*\([^)]*\)\s*\{[^}]*\}/g,
          ': null'
        );
      },

      // Fix comments (remove them)
      () => {
        // Remove single-line comments
        fixedJson = fixedJson.replace(/\/\/.*$/gm, '');
        // Remove multi-line comments
        fixedJson = fixedJson.replace(/\/\*[\s\S]*?\*\//g, '');
      },

      // Fix missing quotes around strings that look like they should be strings
      () => {
        // This is more complex and risky, so we'll be conservative
        fixedJson = fixedJson.replace(
          /:\s*([a-zA-Z][a-zA-Z0-9_]*)\s*([,}\]])/g,
          (match, value, suffix) => {
            // Don't quote boolean or null values
            if (['true', 'false', 'null'].includes(value)) {
              return match;
            }
            return `: "${value}"${suffix}`;
          }
        );
      },

      // Fix extra commas at the end of arrays/objects
      () => {
        fixedJson = fixedJson.replace(/,(\s*[}\]])/g, '$1');
      },
    ];

    // Apply fixes one by one and test parsing
    for (let i = 0; i < fixes.length; i++) {
      try {
        const fix = fixes[i];
        if (fix) {
          fix();
        }
        const parsed = JSON.parse(fixedJson);
        console.log(`✅ Fixed JSON with ${i + 1} fix(es) applied`);
        return parsed;
      } catch (error) {
        // Continue to next fix
        continue;
      }
    }

    // If all fixes failed, try a more aggressive approach
    try {
      console.log('Trying aggressive JSON repair...');
      const aggressivelyFixed = aggressiveJsonFix(fixedJson);
      const parsed = JSON.parse(aggressivelyFixed);
      console.log('✅ Fixed JSON with aggressive repair');
      return parsed;
    } catch (error) {
      console.log('❌ Unable to automatically fix JSON issues');
      console.log('Original error:', (initialError as Error).message);
      console.log(
        'Consider manually reviewing the JSON file for syntax errors'
      );
      return null;
    }
  }
}

function aggressiveJsonFix(jsonString: string): string {
  // This function attempts more aggressive fixes that might change semantics
  let fixed = jsonString;

  try {
    // Remove any obvious non-JSON content at the beginning or end
    fixed = fixed.trim();

    // Ensure it starts with { or [
    if (!fixed.startsWith('{') && !fixed.startsWith('[')) {
      const firstBrace = fixed.indexOf('{');
      const firstBracket = fixed.indexOf('[');

      if (
        firstBrace !== -1 &&
        (firstBracket === -1 || firstBrace < firstBracket)
      ) {
        fixed = fixed.substring(firstBrace);
      } else if (firstBracket !== -1) {
        fixed = fixed.substring(firstBracket);
      }
    }

    // Ensure it ends properly
    if (fixed.startsWith('{') && !fixed.endsWith('}')) {
      // Find the last } and cut there
      const lastBrace = fixed.lastIndexOf('}');
      if (lastBrace !== -1) {
        fixed = fixed.substring(0, lastBrace + 1);
      }
    } else if (fixed.startsWith('[') && !fixed.endsWith(']')) {
      // Find the last ] and cut there
      const lastBracket = fixed.lastIndexOf(']');
      if (lastBracket !== -1) {
        fixed = fixed.substring(0, lastBracket + 1);
      }
    }

    // Remove any weird characters that might have snuck in
    // eslint-disable-next-line no-control-regex
    fixed = fixed.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

    // Try to balance braces and brackets
    fixed = balanceBrackets(fixed);

    return fixed;
  } catch (error) {
    throw new Error('Aggressive fix failed: ' + (error as Error).message);
  }
}

function balanceBrackets(jsonString: string): string {
  let result = jsonString;
  let braceCount = 0;
  let bracketCount = 0;

  // Count unbalanced braces and brackets
  for (const char of result) {
    if (char === '{') braceCount++;
    else if (char === '}') braceCount--;
    else if (char === '[') bracketCount++;
    else if (char === ']') bracketCount--;
  }

  // Add missing closing braces
  while (braceCount > 0) {
    result += '}';
    braceCount--;
  }

  // Add missing closing brackets
  while (bracketCount > 0) {
    result += ']';
    bracketCount--;
  }

  return result;
}

export function validateJsonSyntax(jsonString: string): {
  isValid: boolean;
  error?: string;
} {
  try {
    JSON.parse(jsonString);
    return { isValid: true };
  } catch (error) {
    return {
      isValid: false,
      error: (error as Error).message,
    };
  }
}

export function formatJson(data: any, indent: number = 2): string {
  return JSON.stringify(data, null, indent);
}

export function minifyJson(data: any): string {
  return JSON.stringify(data);
}
