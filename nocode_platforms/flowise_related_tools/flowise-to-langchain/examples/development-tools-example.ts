/**
 * Development Tools Examples
 * 
 * This file demonstrates how to use the various development tools converters
 * for code execution, API integration, GitHub operations, Docker management,
 * shell commands, and database operations.
 */

import { 
  CodeInterpreterConverter,
  OpenAPIConverter,
  GitHubConverter,
  DockerConverter,
  ShellConverter,
  DatabaseConverter 
} from '../src/registry/converters/development-tools';
import type { NodeData } from '../src/types/flowise';

// Code Interpreter Example - Python execution
export const codeInterpreterExample: NodeData = {
  id: 'code-interpreter-1',
  inputs: {
    code: `
import pandas as pd
import numpy as np

# Create sample data
data = {
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'city': ['New York', 'London', 'Tokyo', 'Paris']
}

df = pd.DataFrame(data)
print("Data Analysis Results:")
print(f"Average age: {df['age'].mean():.1f}")
print(f"Cities represented: {', '.join(df['city'].unique())}")

# Return structured result
result = {
    'total_records': len(df),
    'average_age': float(df['age'].mean()),
    'cities': df['city'].tolist(),
    'summary': f"Dataset contains {len(df)} people with average age {df['age'].mean():.1f}"
}
print(f"Result: {result}")
`,
    language: 'python',
    timeout: 30000,
    environment: {
      PYTHONPATH: '/usr/local/lib/python3.9/site-packages'
    },
    packages: ['pandas', 'numpy']
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// OpenAPI Tool Example - REST API integration
export const openAPIExample: NodeData = {
  id: 'openapi-1',
  inputs: {
    apiSpecUrl: 'https://jsonplaceholder.typicode.com/openapi.json',
    operationId: 'getPosts',
    authConfig: {
      type: 'bearer',
      token: 'your-api-token-here'
    },
    parameters: {
      userId: 1,
      limit: 10
    }
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// GitHub Tool Example - Repository management
export const githubExample: NodeData = {
  id: 'github-1',
  inputs: {
    token: process.env.GITHUB_TOKEN,
    owner: 'your-username',
    repo: 'your-repository',
    operation: 'create_issue',
    data: {
      title: 'Automated Issue Creation',
      body: `
# Bug Report

## Description
This issue was created automatically by the development tools system.

## Expected Behavior
- The system should handle automated issue creation
- Proper formatting should be maintained
- Labels should be applied correctly

## Actual Behavior
Testing automated issue creation workflow.

## Environment
- OS: ${process.platform}
- Node.js: ${process.version}
- Timestamp: ${new Date().toISOString()}

## Additional Information
This is a test issue created to validate the GitHub integration.
      `,
      labels: ['bug', 'automated', 'needs-triage'],
      assignees: ['your-username']
    }
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// Docker Tool Example - Container management
export const dockerExample: NodeData = {
  id: 'docker-1',
  inputs: {
    operation: 'run',
    image: 'nginx:alpine',
    containerName: 'dev-nginx',
    environment: {
      NGINX_HOST: 'localhost',
      NGINX_PORT: '80'
    },
    volumes: [
      './html:/usr/share/nginx/html:ro',
      './nginx.conf:/etc/nginx/nginx.conf:ro'
    ],
    ports: {
      '8080': '80',
      '8443': '443'
    },
    command: 'nginx -g "daemon off;"'
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// Shell Tool Example - System commands
export const shellExample: NodeData = {
  id: 'shell-1',
  inputs: {
    command: 'ls -la /tmp && df -h && ps aux | head -10',
    workingDir: '/tmp',
    environment: {
      PATH: '/usr/local/bin:/usr/bin:/bin',
      NODE_ENV: 'development'
    },
    timeout: 10000,
    shell: 'bash'
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// Database Tool Example - PostgreSQL operations
export const postgresExample: NodeData = {
  id: 'postgres-1',
  inputs: {
    connectionString: 'postgresql://username:password@localhost:5432/development_db',
    query: `
      SELECT 
        u.id,
        u.username,
        u.email,
        COUNT(p.id) as post_count,
        MAX(p.created_at) as last_post_date
      FROM users u
      LEFT JOIN posts p ON u.id = p.user_id
      WHERE u.active = true
      GROUP BY u.id, u.username, u.email
      ORDER BY post_count DESC
      LIMIT $1
    `,
    parameters: { limit: 10 },
    operation: 'select',
    database: 'postgresql'
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// MongoDB Tool Example - NoSQL operations
export const mongoExample: NodeData = {
  id: 'mongo-1',
  inputs: {
    connectionString: 'mongodb://localhost:27017/development_db',
    query: JSON.stringify({
      active: true,
      created_at: {
        $gte: new Date('2024-01-01'),
        $lt: new Date('2024-12-31')
      }
    }),
    parameters: {},
    operation: 'select',
    database: 'mongodb'
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// JavaScript Code Interpreter Example
export const jsCodeExample: NodeData = {
  id: 'js-code-1',
  inputs: {
    code: `
// Data processing example
const data = [
  { id: 1, name: 'Product A', price: 29.99, category: 'Electronics' },
  { id: 2, name: 'Product B', price: 49.99, category: 'Books' },
  { id: 3, name: 'Product C', price: 19.99, category: 'Electronics' },
  { id: 4, name: 'Product D', price: 39.99, category: 'Clothing' }
];

// Calculate analytics
const analytics = {
  totalProducts: data.length,
  averagePrice: data.reduce((sum, p) => sum + p.price, 0) / data.length,
  categories: [...new Set(data.map(p => p.category))],
  priceRange: {
    min: Math.min(...data.map(p => p.price)),
    max: Math.max(...data.map(p => p.price))
  },
  categoryStats: data.reduce((stats, product) => {
    if (!stats[product.category]) {
      stats[product.category] = { count: 0, totalValue: 0 };
    }
    stats[product.category].count++;
    stats[product.category].totalValue += product.price;
    return stats;
  }, {})
};

console.log('Product Analytics:', JSON.stringify(analytics, null, 2));
return analytics;
`,
    language: 'javascript',
    timeout: 15000,
    environment: {
      NODE_ENV: 'development'
    }
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// Advanced GitHub Example - Pull Request Management
export const githubPRExample: NodeData = {
  id: 'github-pr-1',
  inputs: {
    token: process.env.GITHUB_TOKEN,
    owner: 'your-org',
    repo: 'your-project',
    operation: 'create_pr',
    data: {
      title: 'feat: Add development tools integration',
      body: `
## Summary
This PR adds comprehensive development tools integration including:

- ✅ Code Interpreter for Python/JavaScript execution
- ✅ OpenAPI Tool for REST API integration  
- ✅ Docker Tool for container management
- ✅ Shell Tool for system commands
- ✅ Database Tools for SQL/NoSQL operations
- ✅ Enhanced GitHub integration

## Changes Made
- Created \`development-tools.ts\` converter
- Added security validation for code execution
- Implemented proper error handling
- Added comprehensive test coverage
- Updated registry with new tools

## Testing
- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Security validation works
- [ ] All tools properly integrated

## Breaking Changes
None - all changes are additive.

## Migration Guide
No migration needed. New tools are opt-in.

## Related Issues
Closes #123, #124, #125
      `,
      head: 'feature/development-tools',
      base: 'main'
    }
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// Docker Build Example
export const dockerBuildExample: NodeData = {
  id: 'docker-build-1',
  inputs: {
    operation: 'build',
    image: 'my-app:v1.0.0',
    dockerfile: `
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]
    `,
    buildContext: './docker',
    environment: {
      NODE_ENV: 'production',
      PORT: '3000'
    }
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// Complex Shell Script Example
export const complexShellExample: NodeData = {
  id: 'shell-complex-1',
  inputs: {
    command: `
#!/bin/bash
set -euo pipefail

echo "Starting deployment process..."

# Create deployment directory
mkdir -p /tmp/deployment

# Check system resources
echo "=== System Resources ==="
echo "Memory usage:"
free -h
echo "Disk usage:"
df -h
echo "CPU info:"
nproc

# Environment setup
export NODE_ENV=production
export PORT=3000

# Check if required services are running
if ! systemctl is-active --quiet nginx; then
  echo "Warning: Nginx is not running"
fi

if ! systemctl is-active --quiet postgresql; then
  echo "Warning: PostgreSQL is not running"
fi

# Generate deployment report
cat > /tmp/deployment/report.txt << EOF
Deployment Report
Generated: $(date)
Environment: $NODE_ENV
Port: $PORT
Host: $(hostname)
User: $(whoami)
EOF

echo "Deployment preparation complete!"
cat /tmp/deployment/report.txt
`,
    workingDir: '/tmp',
    environment: {
      PATH: '/usr/local/bin:/usr/bin:/bin:/sbin',
      NODE_ENV: 'production',
      PORT: '3000'
    },
    timeout: 30000,
    shell: 'bash'
  },
  outputs: {},
  outputAnchors: [],
  selected: false
};

// Example usage and testing
export async function testDevelopmentTools() {
  console.log('🔧 Testing Development Tools Converters...\n');

  // Test Code Interpreter
  console.log('📝 Testing Code Interpreter...');
  const codeResult = CodeInterpreterConverter.convert(codeInterpreterExample);
  console.log('✅ Code Interpreter:', codeResult.success ? 'PASS' : 'FAIL');
  if (!codeResult.success) {
    console.error('❌ Error:', codeResult.error);
  }

  // Test OpenAPI Tool
  console.log('\n🌐 Testing OpenAPI Tool...');
  const apiResult = OpenAPIConverter.convert(openAPIExample);
  console.log('✅ OpenAPI Tool:', apiResult.success ? 'PASS' : 'FAIL');
  if (!apiResult.success) {
    console.error('❌ Error:', apiResult.error);
  }

  // Test GitHub Tool
  console.log('\n🐙 Testing GitHub Tool...');
  const githubResult = GitHubConverter.convert(githubExample);
  console.log('✅ GitHub Tool:', githubResult.success ? 'PASS' : 'FAIL');
  if (!githubResult.success) {
    console.error('❌ Error:', githubResult.error);
  }

  // Test Docker Tool
  console.log('\n🐳 Testing Docker Tool...');
  const dockerResult = DockerConverter.convert(dockerExample);
  console.log('✅ Docker Tool:', dockerResult.success ? 'PASS' : 'FAIL');
  if (!dockerResult.success) {
    console.error('❌ Error:', dockerResult.error);
  }

  // Test Shell Tool
  console.log('\n💻 Testing Shell Tool...');
  const shellResult = ShellConverter.convert(shellExample);
  console.log('✅ Shell Tool:', shellResult.success ? 'PASS' : 'FAIL');
  if (!shellResult.success) {
    console.error('❌ Error:', shellResult.error);
  }

  // Test Database Tool
  console.log('\n🗄️ Testing Database Tool...');
  const dbResult = DatabaseConverter.convert(postgresExample);
  console.log('✅ Database Tool:', dbResult.success ? 'PASS' : 'FAIL');
  if (!dbResult.success) {
    console.error('❌ Error:', dbResult.error);
  }

  console.log('\n🎉 Development Tools testing complete!');
}

// Export all examples for easy testing
export const developmentToolExamples = {
  codeInterpreter: codeInterpreterExample,
  openAPI: openAPIExample,
  github: githubExample,
  docker: dockerExample,
  shell: shellExample,
  postgres: postgresExample,
  mongo: mongoExample,
  jsCode: jsCodeExample,
  githubPR: githubPRExample,
  dockerBuild: dockerBuildExample,
  complexShell: complexShellExample
};

export default developmentToolExamples;