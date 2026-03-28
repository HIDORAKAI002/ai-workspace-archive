/**
 * Stats Service
 * 
 * Provides statistics and analytics for conversions
 */

export interface ConversionStats {
  totalConversions: number;
  successfulConversions: number;
  failedConversions: number;
  averageConversionTime: number;
  nodeTypeDistribution: Record<string, number>;
  errorDistribution: Record<string, number>;
  dailyConversions: Array<{
    date: string;
    count: number;
  }>;
}

export interface SystemStats {
  uptime: number;
  memoryUsage: NodeJS.MemoryUsage;
  cpuUsage: NodeJS.CpuUsage;
  activeJobs: number;
  queuedJobs: number;
  completedJobs: number;
}

export class StatsService {
  private conversionHistory: Array<{
    timestamp: Date;
    success: boolean;
    duration: number;
    nodeTypes: string[];
    error?: string;
  }> = [];

  recordConversion(
    success: boolean,
    duration: number,
    nodeTypes: string[],
    error?: string
  ): void {
    this.conversionHistory.push({
      timestamp: new Date(),
      success,
      duration,
      nodeTypes,
      error
    });
  }

  getConversionStats(): ConversionStats {
    const total = this.conversionHistory.length;
    const successful = this.conversionHistory.filter(c => c.success).length;
    const failed = total - successful;
    
    const totalDuration = this.conversionHistory.reduce((sum, c) => sum + c.duration, 0);
    const averageTime = total > 0 ? totalDuration / total : 0;
    
    const nodeTypeDistribution: Record<string, number> = {};
    const errorDistribution: Record<string, number> = {};
    
    this.conversionHistory.forEach(conversion => {
      conversion.nodeTypes.forEach(type => {
        nodeTypeDistribution[type] = (nodeTypeDistribution[type] || 0) + 1;
      });
      
      if (conversion.error) {
        errorDistribution[conversion.error] = (errorDistribution[conversion.error] || 0) + 1;
      }
    });
    
    // Calculate daily conversions for the last 7 days
    const dailyConversions: Array<{ date: string; count: number }> = [];
    const now = new Date();
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      
      const nextDate = new Date(date);
      nextDate.setDate(nextDate.getDate() + 1);
      
      const count = this.conversionHistory.filter(c => 
        c.timestamp >= date && c.timestamp < nextDate
      ).length;
      
      dailyConversions.push({
        date: date.toISOString().split('T')[0],
        count
      });
    }
    
    return {
      totalConversions: total,
      successfulConversions: successful,
      failedConversions: failed,
      averageConversionTime: averageTime,
      nodeTypeDistribution,
      errorDistribution,
      dailyConversions
    };
  }

  getSystemStats(activeJobs = 0, queuedJobs = 0, completedJobs = 0): SystemStats {
    return {
      uptime: process.uptime(),
      memoryUsage: process.memoryUsage(),
      cpuUsage: process.cpuUsage(),
      activeJobs,
      queuedJobs,
      completedJobs
    };
  }

  clearHistory(): void {
    this.conversionHistory = [];
  }
}