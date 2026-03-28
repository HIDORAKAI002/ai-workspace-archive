// scripts/generate-version.js
import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const packageJson = JSON.parse(
    readFileSync(join(__dirname, '../package.json'), 'utf8')
);

const content = `// Generated file - do not edit
export const VERSION = '${packageJson.version}';
`;

writeFileSync(join(__dirname, '../src/version.ts'), content);
console.log(`Generated version.ts with version ${packageJson.version}`);