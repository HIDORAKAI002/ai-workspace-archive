'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Play,
  Code,
  BarChart3,
  Settings,
  Upload,
  TestTube,
  Zap,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react'

export function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const stats = {
    totalTests: 156,
    passedTests: 142,
    failedTests: 14,
    totalFlows: 23,
    conversionRate: 91.0,
    avgDuration: 2.3,
  }

  const recentTests = [
    {
      id: '1',
      name: 'ChatBot Flow Test',
      status: 'passed',
      duration: '2.1s',
      timestamp: '2 minutes ago',
    },
    {
      id: '2',
      name: 'Document QA Test',
      status: 'failed',
      duration: '5.2s',
      timestamp: '5 minutes ago',
    },
    {
      id: '3',
      name: 'RAG Pipeline Test',
      status: 'passed',
      duration: '1.8s',
      timestamp: '8 minutes ago',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-bold text-gray-900">
            Flowise Converter Dashboard
          </h1>
          <p className="text-gray-600">
            Convert your Flowise flows to LangChain applications
          </p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-4">
          <Button className="h-20 flex-col bg-blue-600 hover:bg-blue-700">
            <Upload className="mb-2 h-6 w-6" />
            Upload Flow
          </Button>
          <Button className="h-20 flex-col bg-green-600 hover:bg-green-700">
            <Play className="mb-2 h-6 w-6" />
            Run Test
          </Button>
          <Button className="h-20 flex-col bg-purple-600 hover:bg-purple-700">
            <Code className="mb-2 h-6 w-6" />
            Convert Flow
          </Button>
          <Button className="h-20 flex-col bg-orange-600 hover:bg-orange-700">
            <BarChart3 className="mb-2 h-6 w-6" />
            View Analytics
          </Button>
        </div>

        {/* Stats Overview */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Total Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {stats.totalTests}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">Passed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.passedTests}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">Failed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-600">
                {stats.failedTests}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Total Flows
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stats.totalFlows}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Success Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {stats.conversionRate}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm text-gray-600">
                Avg Duration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {stats.avgDuration}s
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Tests */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Recent Tests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-4"
                  >
                    <div className="flex items-center gap-3">
                      {test.status === 'passed' ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                      <div>
                        <div className="font-medium">{test.name}</div>
                        <div className="text-sm text-gray-500">
                          {test.timestamp}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={
                          test.status === 'passed' ? 'default' : 'destructive'
                        }
                      >
                        {test.status}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {test.duration}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Tests</span>
                  <span className="font-medium">3</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Queued</span>
                  <span className="font-medium">0</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    Avg Response Time
                  </span>
                  <span className="font-medium">1.2s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Health</span>
                  <Badge
                    variant="default"
                    className="bg-green-100 text-green-800"
                  >
                    Healthy
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
