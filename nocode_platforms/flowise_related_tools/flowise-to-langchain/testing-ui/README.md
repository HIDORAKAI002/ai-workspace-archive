# Testing UI

A Next.js 14 frontend application for converting Flowise flows to LangChain applications.

## Features

- 🔄 **Flow Testing**: Test Flowise flows with comprehensive test suites
- 🔀 **Flow Conversion**: Convert Flowise flows to LangChain code
- 📊 **Analytics Dashboard**: Track test results and performance metrics
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion
- 🌙 **Dark Mode**: Toggle between light and dark themes
- 📱 **Responsive**: Works on desktop and mobile devices
- 🧪 **Testing**: Comprehensive test coverage with Jest and React Testing Library

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React Query (TanStack Query)
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Code Highlighting**: React Syntax Highlighter
- **Animation**: Framer Motion
- **Icons**: Lucide React
- **Testing**: Jest, React Testing Library

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm 8+
- Docker (optional, for containerized deployment)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd testing-ui

# Install dependencies
npm install

# Copy environment configuration
cp .env.example .env.local

# Start development server (frontend + backend)
npm run dev
```

**Note**: The `npm run dev` command now starts both the Next.js frontend (port 3000) and Express backend (port 3001) concurrently.

### Environment Configuration

Create a `.env.local` file based on `.env.example`:

```bash
# Copy and customize environment variables
cp .env.example .env.local
```

Key environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NODE_ENV`: Environment (development/production)
- Feature flags for enabling/disabling features

### Development Scripts

```bash
# Development
npm run dev          # Start both frontend and backend servers
npm run dev:next     # Start only Next.js frontend
npm run dev:server   # Start only Express backend
npm run build        # Build for production
npm run start        # Start production server
npm run start:all    # Start both frontend and backend in production

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run type-check   # Run TypeScript checks

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage
npm run test:ci      # Run tests in CI mode

# Build & Deployment
npm run prebuild     # Pre-build checks (lint + type-check)
npm run postbuild    # Post-build tests
npm run clean        # Clean build artifacts
npm run analyze      # Analyze bundle size
npm run deploy:build # Full deployment build
npm run health-check # Check application health

# Docker
npm run deploy:docker     # Build Docker image
npm run deploy:docker:run # Run Docker container
```

## Project Structure

```
src/
├── app/                 # Next.js 14 app directory
│   ├── dashboard/       # Dashboard pages
│   ├── results/         # Test results pages
│   ├── settings/        # Settings pages
│   ├── api/            # API routes
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # Reusable components
│   ├── ui/             # Basic UI components
│   ├── layout/         # Layout components
│   ├── forms/          # Form components
│   ├── charts/         # Chart components
│   ├── testing/        # Testing components
│   ├── conversion/     # Conversion components
│   └── results/        # Results components
├── lib/                # Utility libraries
├── types/              # TypeScript type definitions
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
└── styles/             # Additional styles
```

## Key Components

### Dashboard Components
- **Dashboard**: Main dashboard view
- **StatsOverview**: Key metrics display
- **RecentTests**: Recent test results
- **QuickActions**: Common actions

### Testing Components
- **TestRunner**: Execute tests
- **TestResults**: Display test results
- **TestSuiteManager**: Manage test suites
- **TestForm**: Create/edit tests

### Conversion Components
- **FlowConverter**: Convert flows to LangChain
- **CodeViewer**: Display generated code
- **ConversionHistory**: Track conversions

### UI Components
- **Button**: Customizable button component
- **Input**: Form input components
- **Card**: Content container
- **Modal**: Modal dialogs
- **Toast**: Notification system

## Deployment

### Quick Deployment Options

#### Option 1: Docker (Recommended)

```bash
# Build and run with Docker
npm run deploy:docker
npm run deploy:docker:run

# Or use Docker Compose
docker-compose up -d
```

#### Option 2: Traditional Build

```bash
# Build for production
npm run deploy:build

# Start production server
npm start
```

#### Option 3: Using Deployment Scripts

```bash
# Development deployment
./scripts/deploy.sh development

# Production deployment
./scripts/deploy.sh production
```

### Environment-Specific Deployment

The application supports multiple environments:

#### Development
```bash
# Start development server
npm run dev

# Or with Docker
docker-compose -f docker-compose.dev.yml up
```

#### Production
```bash
# Build production image
docker build -t testing-ui .

# Run production container
docker run -p 3000:3000 testing-ui
```

### Health Checks

The application includes health check endpoints:

```bash
# Check application health
curl http://localhost:3000/api/health

# Or use the npm script
npm run health-check
```

### Build Analysis

Analyze bundle size and performance:

```bash
# Generate bundle analysis
npm run analyze

# View bundle report
open bundle-analyzer-report.html
```

## Configuration

### Environment Variables

The application uses environment variables for configuration. See `.env.example` for all available options.

Key variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXT_PUBLIC_APP_NAME`: Application name
- `NODE_ENV`: Environment mode
- Feature flags for enabling/disabling features

### Tailwind CSS

The application uses a custom Tailwind configuration with:
- Extended color palette
- Custom animations
- Typography plugin
- Forms plugin

### TypeScript

Configured with strict mode and path aliases:
- `@/*` maps to `src/*`
- `@/components/*` maps to `src/components/*`
- `@/lib/*` maps to `src/lib/*`

## API Integration

The frontend connects to the backend API for:
- Flow management
- Test execution
- Result retrieval
- Analytics data

API endpoints are defined in `src/types/index.ts`.

## Testing

### Unit Tests
```bash
npm run test
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Run the test suite
6. Submit a pull request

## License

MIT License - see LICENSE file for details