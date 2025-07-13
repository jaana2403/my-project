import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const Dashboard = () => {
  const [liveData, setLiveData] = useState({
    totalThreats: 0,
    activeFeeds: 0,
    criticalAlerts: 0,
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [threatTrends, setThreatTrends] = useState([]);
  const [recentThreats, setRecentThreats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel
      const [stats, trends, recent] = await Promise.all([
        apiService.fetchThreatStats(),
        apiService.fetchThreatTrends(7),
        apiService.fetchRecentThreats(5)
      ]);

      // Update live data
      setLiveData({
        totalThreats: stats.total || 0,
        activeFeeds: 23, // This would come from feed health API
        criticalAlerts: stats.critical || 0,
        lastUpdate: new Date().toLocaleTimeString()
      });

      // Process threat trends
      const processedTrends = trends.map((trend, index) => ({
        day: new Date(trend.date).toLocaleDateString('en-US', { weekday: 'short' }),
        threats: trend.count || 0,
        severity: trend.avgSeverity || 'medium'
      }));

      setThreatTrends(processedTrends);

      // Process recent threats
      const processedRecentThreats = recent.map(threat => ({
        id: threat._id,
        type: extractThreatType(threat.input),
        severity: threat.severity || 'Medium',
        source: 'AI Analysis',
        timestamp: formatTimeAgo(threat.timestamp),
        description: threat.summary ? threat.summary.substring(0, 100) + '...' : 'No description available'
      }));

      setRecentThreats(processedRecentThreats);
      setError(null);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const extractThreatType = (input) => {
    if (!input) return 'Unknown';
    
    const inputLower = input.toLowerCase();
    if (inputLower.includes('ddos') || inputLower.includes('dos')) return 'DDoS';
    if (inputLower.includes('phishing')) return 'Phishing';
    if (inputLower.includes('malware') || inputLower.includes('ransomware') || inputLower.includes('trojan')) return 'Malware';
    if (inputLower.includes('apt')) return 'APT';
    if (inputLower.includes('spam')) return 'Spam';
    if (inputLower.includes('botnet')) return 'Botnet';
    
    return 'Threat';
  };

  const formatTimeAgo = (timestamp) => {
    if (!timestamp) return 'Unknown';
    
    const now = new Date();
    const threatTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - threatTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getSeverityBgColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 border-red-500/30';
      case 'high': return 'bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 border-green-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  if (loading && recentThreats.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-red-400 mb-2">Error loading dashboard</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button 
            onClick={fetchDashboardData}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Live Threat Intelligence Dashboard</h1>
        <p className="text-gray-400">Real-time monitoring and analysis of security threats</p>
        <div className="flex items-center mt-4 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
          Last updated: {liveData.lastUpdate}
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Threats</p>
              <p className="text-3xl font-bold text-white">{liveData.totalThreats.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 mr-1">↑</span>
            <span className="text-gray-400">Live from MongoDB</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:border-green-400/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Active Feeds</p>
              <p className="text-3xl font-bold text-white">{liveData.activeFeeds}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 mr-1">●</span>
            <span className="text-gray-400">All feeds operational</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:border-red-400/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Critical Alerts</p>
              <p className="text-3xl font-bold text-red-400">{liveData.criticalAlerts}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-red-400 mr-1">⚠</span>
            <span className="text-gray-400">Requires immediate attention</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:border-purple-400/50 transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Response Time</p>
              <p className="text-3xl font-bold text-white">2.3s</p>
            </div>
            <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-green-400 mr-1">↓</span>
            <span className="text-gray-400">-0.5s from last week</span>
          </div>
        </div>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Threat Trends Chart */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-6">Threat Trends (Last 7 Days)</h3>
          {threatTrends.length > 0 ? (
            <div className="h-64 flex items-end justify-between space-x-2">
              {threatTrends.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500/60 to-blue-400/40 rounded-t-lg transition-all duration-300 hover:from-blue-400/80 hover:to-blue-300/60"
                    style={{ height: `${Math.max((day.threats / Math.max(...threatTrends.map(d => d.threats))) * 200, 10)}px` }}
                  ></div>
                  <div className="mt-2 text-xs text-gray-400">{day.day}</div>
                  <div className="text-xs font-medium text-white">{day.threats}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No trend data available
            </div>
          )}
        </div>

        {/* Threat Distribution */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-6">Threat Type Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">Malware</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-600 rounded-full h-2 mr-3">
                  <div className="bg-red-400 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">Phishing</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-600 rounded-full h-2 mr-3">
                  <div className="bg-orange-400 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">30%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">DDoS</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-600 rounded-full h-2 mr-3">
                  <div className="bg-yellow-400 h-2 rounded-full" style={{ width: '15%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">15%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">APT</span>
              </div>
              <div className="flex items-center">
                <div className="w-24 bg-slate-600 rounded-full h-2 mr-3">
                  <div className="bg-purple-400 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Threats Table */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Recent Threats</h3>
        {recentThreats.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-600/50">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Type</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Severity</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Source</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Time</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Description</th>
                </tr>
              </thead>
              <tbody>
                {recentThreats.map((threat) => (
                  <tr key={threat.id} className="border-b border-slate-600/30 hover:bg-slate-700/30 transition-colors">
                    <td className="py-3 px-4 text-sm text-white">{threat.type}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityBgColor(threat.severity)} ${getSeverityColor(threat.severity)}`}>
                        {threat.severity}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-300">{threat.source}</td>
                    <td className="py-3 px-4 text-sm text-gray-400">{threat.timestamp}</td>
                    <td className="py-3 px-4 text-sm text-gray-300">{threat.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            No recent threats found
          </div>
        )}
      </div>
    </div>
  );
};

export { Dashboard };
