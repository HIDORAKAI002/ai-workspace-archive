export function generateReadme(projectName: string): string {
  return `# ${projectName}

A Model Context Protocol (MCP) server built with mcp-framework.

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Build the project
npm run build

\`\`\`

## Project Structure

\`\`\`
${projectName}/
├── src/
│   ├── tools/        # MCP Tools
│   │   └── ExampleTool.ts
│   └── index.ts      # Server entry point
├── package.json
└── tsconfig.json
\`\`\`

## Adding Components

The project comes with an example tool in \`src/tools/ExampleTool.ts\`. You can add more tools using the CLI:

\`\`\`bash
# Add a new tool
mcp add tool my-tool

# Example tools you might create:
mcp add tool data-processor
mcp add tool api-client
mcp add tool file-handler
\`\`\`

## Tool Development

Example tool structure:

\`\`\`typescript
import { MCPTool } from "mcp-framework";
import { z } from "zod";

interface MyToolInput {
  message: string;
}

class MyTool extends MCPTool<MyToolInput> {
  name = "my_tool";
  description = "Describes what your tool does";

  schema = {
    message: {
      type: z.string(),
      description: "Description of this input parameter",
    },
  };

  async execute(input: MyToolInput) {
    // Your tool logic here
    return \`Processed: \${input.message}\`;
  }
}

export default MyTool;
\`\`\`

## Publishing to npm

1. Update your package.json:
   - Ensure \`name\` is unique and follows npm naming conventions
   - Set appropriate \`version\`
   - Add \`description\`, \`author\`, \`license\`, etc.
   - Check \`bin\` points to the correct entry file

2. Build and test locally:
   \`\`\`bash
   npm run build
   npm link
   ${projectName}  # Test your CLI locally
   \`\`\`

3. Login to npm (create account if necessary):
   \`\`\`bash
   npm login
   \`\`\`

4. Publish your package:
   \`\`\`bash
   npm publish
   \`\`\`

After publishing, users can add it to their claude desktop client (read below) or run it with npx
\`\`\`

## Using with Claude Desktop

### Local Development

Add this configuration to your Claude Desktop config file:

**MacOS**: \`~/Library/Application Support/Claude/claude_desktop_config.json\`
**Windows**: \`%APPDATA%/Claude/claude_desktop_config.json\`

\`\`\`json
{
  "mcpServers": {
    "${projectName}": {
      "command": "node",
      "args":["/absolute/path/to/${projectName}/dist/index.js"]
    }
  }
}
\`\`\`

### After Publishing

Add this configuration to your Claude Desktop config file:

**MacOS**: \`~/Library/Application Support/Claude/claude_desktop_config.json\`
**Windows**: \`%APPDATA%/Claude/claude_desktop_config.json\`

\`\`\`json
{
  "mcpServers": {
    "${projectName}": {
      "command": "npx",
      "args": ["${projectName}"]
    }
  }
}
\`\`\`

## Building and Testing

1. Make changes to your tools
2. Run \`npm run build\` to compile
3. The server will automatically load your tools on startup

## Learn More

- [MCP Framework Github](https://github.com/QuantGeekDev/mcp-framework)
- [MCP Framework Docs](https://mcp-framework.com)
`;
}
