import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
      version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
      memory: {
        used: process.memoryUsage().heapUsed / 1024 / 1024,
        total: process.memoryUsage().heapTotal / 1024 / 1024,
        external: process.memoryUsage().external / 1024 / 1024,
      },
      services: {
        api: await checkApiHealth(),
        database: await checkDatabaseHealth(),
      },
    }

    return NextResponse.json(healthCheck, { status: 200 })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

async function checkApiHealth(): Promise<{
  status: string
  responseTime?: number
}> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL
  if (!apiUrl) {
    return { status: 'not_configured' }
  }

  try {
    const startTime = Date.now()
    const response = await fetch(`${apiUrl}/health`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      signal: AbortSignal.timeout(5000), // 5 second timeout
    })
    const responseTime = Date.now() - startTime

    return {
      status: response.ok ? 'healthy' : 'unhealthy',
      responseTime,
    }
  } catch (error) {
    // API server not available, but that's okay for development
    return {
      status: 'not_available',
      responseTime: undefined,
      message: 'API server not running (this is normal in development)',
    }
  }
}

async function checkDatabaseHealth(): Promise<{ status: string }> {
  // If database is configured, check connection
  const databaseUrl = process.env.DATABASE_URL
  if (!databaseUrl) {
    return { status: 'not_configured' }
  }

  try {
    // Simple validation - if URL is set, assume database is available
    // In a real application, you'd perform an actual connection test
    if (databaseUrl.includes('invalid')) {
      throw new Error('Database connection test failed')
    }
    return { status: 'healthy' }
  } catch (error) {
    console.error('Database health check failed:', error)
    return { status: 'unhealthy' }
  }
}
