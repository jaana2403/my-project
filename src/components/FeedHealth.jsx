import React, { useState, useEffect } from 'react';

const FeedHealth = () => {
  const [feedStatus, setFeedStatus] = useState({
    lastUpdate: new Date().toLocaleTimeString(),
    totalFeeds: 23,
    operational: 21,
    degraded: 1,
    failed: 1
  });

  const [feeds, setFeeds] = useState([
    {
      id: 1,
      name: 'RSS Feed 1',
      url: 'https://feed1.example.com/rss',
      type: 'RSS',
      status: 'operational',
      lastCheck: '2024-01-20 14:30:25',
      responseTime: 245,
      uptime: 99.8,
      lastError: null,
      totalItems: 1247,
      itemsToday: 45
    },
    {
      id: 2,
      name: 'Atom Feed 1',
      url: 'https://feed2.example.com/atom',
      type: 'Atom',
      status: 'operational',
      lastCheck: '2024-01-20 14:30:20',
      responseTime: 189,
      uptime: 99.9,
      lastError: null,
      totalItems: 892,
      itemsToday: 32
    },
    {
      id: 3,
      name: 'YAML Feed 1',
      url: 'https://feed3.example.com/threats.yaml',
      type: 'YAML',
      status: 'operational',
      lastCheck: '2024-01-20 14:30:15',
      responseTime: 156,
      uptime: 99.7,
      lastError: null,
      totalItems: 567,
      itemsToday: 18
    },
    {
      id: 4,
      name: 'RSS Feed 2',
      url: 'https://feed4.example.com/rss',
      type: 'RSS',
      status: 'degraded',
      lastCheck: '2024-01-20 14:30:10',
      responseTime: 1245,
      uptime: 95.2,
      lastError: 'Timeout after 10 seconds',
      totalItems: 2341,
      itemsToday: 67
    },
    {
      id: 5,
      name: 'Atom Feed 2',
      url: 'https://feed5.example.com/atom',
      type: 'Atom',
      status: 'failed',
      lastCheck: '2024-01-20 14:25:30',
      responseTime: 0,
      uptime: 87.3,
      lastError: 'Connection refused',
      totalItems: 1567,
      itemsToday: 0
    },
    {
      id: 6,
      name: 'RSS Feed 3',
      url: 'https://feed6.example.com/rss',
      type: 'RSS',
      status: 'operational',
      lastCheck: '2024-01-20 14:30:05',
      responseTime: 203,
      uptime: 99.6,
      lastError: null,
      totalItems: 987,
      itemsToday: 28
    }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState({
    avgResponseTime: 340,
    totalUptime: 98.7,
    totalItemsProcessed: 7601,
    itemsToday: 190,
    errorRate: 2.3
  });

  const [recentLogs, setRecentLogs] = useState([
    {
      id: 1,
      timestamp: '2024-01-20 14:30:25',
      level: 'INFO',
      feed: 'RSS Feed 1',
      message: 'Feed check completed successfully',
      details: 'Retrieved 45 new items in 245ms'
    },
    {
      id: 2,
      timestamp: '2024-01-20 14:30:20',
      level: 'INFO',
      feed: 'Atom Feed 1',
      message: 'Feed check completed successfully',
      details: 'Retrieved 32 new items in 189ms'
    },
    {
      id: 3,
      timestamp: '2024-01-20 14:30:15',
      level: 'INFO',
      feed: 'YAML Feed 1',
      message: 'Feed check completed successfully',
      details: 'Retrieved 18 new items in 156ms'
    },
    {
      id: 4,
      timestamp: '2024-01-20 14:30:10',
      level: 'WARNING',
      feed: 'RSS Feed 2',
      message: 'Feed check completed with timeout',
      details: 'Retrieved 67 items in 1245ms (timeout after 10s)'
    },
    {
      id: 5,
      timestamp: '2024-01-20 14:25:30',
      level: 'ERROR',
      feed: 'Atom Feed 2',
      message: 'Feed check failed',
      details: 'Connection refused - server unavailable'
    },
    {
      id: 6,
      timestamp: '2024-01-20 14:25:25',
      level: 'INFO',
      feed: 'RSS Feed 3',
      message: 'Feed check completed successfully',
      details: 'Retrieved 28 new items in 203ms'
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFeedStatus(prev => ({
        ...prev,
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'text-green-400';
      case 'degraded': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusBgColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-500/20 border-green-500/30';
      case 'degraded': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'failed': return 'bg-red-500/20 border-red-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'operational': return '●';
      case 'degraded': return '⚠';
      case 'failed': return '✗';
      default: return '?';
    }
  };

  const getLogLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'text-red-400';
      case 'WARNING': return 'text-yellow-400';
      case 'INFO': return 'text-blue-400';
      default: return 'text-gray-400';
    }
  };

  const getLogLevelBgColor = (level) => {
    switch (level) {
      case 'ERROR': return 'bg-red-500/20';
      case 'WARNING': return 'bg-yellow-500/20';
      case 'INFO': return 'bg-blue-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Feed Health Monitoring</h1>
        <p className="text-gray-400">Real-time status tracking and performance metrics for all integrated feeds</p>
        <div className="flex items-center mt-4 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Last updated: {feedStatus.lastUpdate}
        </div>
      </div>

      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Feeds</p>
              <p className="text-3xl font-bold text-white">{feedStatus.totalFeeds}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Operational</p>
              <p className="text-3xl font-bold text-green-400">{feedStatus.operational}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Degraded</p>
              <p className="text-3xl font-bold text-yellow-400">{feedStatus.degraded}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Failed</p>
              <p className="text-3xl font-bold text-red-400">{feedStatus.failed}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Performance Overview */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-6">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-300">Average Response Time</span>
              <span className="text-white font-semibold">{performanceMetrics.avgResponseTime}ms</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${Math.min((performanceMetrics.avgResponseTime / 1000) * 100, 100)}%` }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">Total Uptime</span>
              <span className="text-white font-semibold">{performanceMetrics.totalUptime}%</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: `${performanceMetrics.totalUptime}%` }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">Error Rate</span>
              <span className="text-white font-semibold">{performanceMetrics.errorRate}%</span>
            </div>
            <div className="w-full bg-slate-600 rounded-full h-2">
              <div className="bg-red-400 h-2 rounded-full" style={{ width: `${performanceMetrics.errorRate}%` }}></div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-300">Items Processed Today</span>
              <span className="text-white font-semibold">{performanceMetrics.itemsToday}</span>
            </div>
          </div>
        </div>

        {/* Feed Status Chart */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-6">Feed Status Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">Operational</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-600 rounded-full h-2 mr-3">
                  <div className="bg-green-400 h-2 rounded-full" style={{ width: `${(feedStatus.operational / feedStatus.totalFeeds) * 100}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{feedStatus.operational}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">Degraded</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-600 rounded-full h-2 mr-3">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(feedStatus.degraded / feedStatus.totalFeeds) * 100}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{feedStatus.degraded}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">Failed</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-600 rounded-full h-2 mr-3">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: `${(feedStatus.failed / feedStatus.totalFeeds) * 100}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{feedStatus.failed}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Feed Status Table */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Feed Status Details</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-600/50">
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Feed</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Type</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Response Time</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Uptime</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Last Check</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Items Today</th>
              </tr>
            </thead>
            <tbody>
              {feeds.map((feed) => (
                <tr key={feed.id} className="border-b border-slate-600/30 hover:bg-slate-700/30 transition-colors">
                  <td className="py-3 px-4">
                    <div>
                      <p className="text-sm text-white font-medium">{feed.name}</p>
                      <p className="text-xs text-gray-400 font-mono">{feed.url}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-600/50 text-gray-300">
                      {feed.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg ${getStatusColor(feed.status)}`}>{getStatusIcon(feed.status)}</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBgColor(feed.status)} ${getStatusColor(feed.status)}`}>
                        {feed.status}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm ${feed.responseTime > 1000 ? 'text-yellow-400' : 'text-white'}`}>
                      {feed.responseTime}ms
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-sm ${feed.uptime < 95 ? 'text-yellow-400' : 'text-white'}`}>
                      {feed.uptime}%
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-400">{feed.lastCheck}</td>
                  <td className="py-3 px-4 text-sm text-white">{feed.itemsToday}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Recent Logs */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Recent Activity Logs</h3>
        <div className="space-y-3">
          {recentLogs.map((log) => (
            <div key={log.id} className="flex items-start space-x-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <div className={`flex-shrink-0 w-16 text-xs font-medium ${getLogLevelColor(log.level)} ${getLogLevelBgColor(log.level)} px-2 py-1 rounded`}>
                {log.level}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm text-white font-medium">{log.message}</p>
                  <span className="text-xs text-gray-400">{log.timestamp}</span>
                </div>
                <p className="text-xs text-gray-300 mb-1">Feed: {log.feed}</p>
                <p className="text-xs text-gray-400">{log.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { FeedHealth };
