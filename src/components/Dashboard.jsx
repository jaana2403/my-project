import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [liveData, setLiveData] = useState({
    totalThreats: 1247,
    activeFeeds: 23,
    criticalAlerts: 8,
    lastUpdate: new Date().toLocaleTimeString()
  });

  const [threatTrends, setThreatTrends] = useState([
    { day: 'Mon', threats: 45, severity: 'high' },
    { day: 'Tue', threats: 67, severity: 'critical' },
    { day: 'Wed', threats: 34, severity: 'medium' },
    { day: 'Thu', threats: 89, severity: 'high' },
    { day: 'Fri', threats: 56, severity: 'medium' },
    { day: 'Sat', threats: 23, severity: 'low' },
    { day: 'Sun', threats: 12, severity: 'low' }
  ]);

  const [recentThreats, setRecentThreats] = useState([
    { id: 1, type: 'Malware', severity: 'Critical', source: 'RSS Feed 1', timestamp: '2 min ago', description: 'New ransomware variant detected' },
    { id: 2, type: 'Phishing', severity: 'High', source: 'Atom Feed 3', timestamp: '5 min ago', description: 'Sophisticated phishing campaign targeting financial sector' },
    { id: 3, type: 'DDoS', severity: 'Medium', source: 'YAML Feed 2', timestamp: '8 min ago', description: 'DDoS attack patterns observed' },
    { id: 4, type: 'APT', severity: 'Critical', source: 'RSS Feed 5', timestamp: '12 min ago', description: 'Advanced persistent threat activity detected' },
    { id: 5, type: 'Malware', severity: 'High', source: 'Atom Feed 1', timestamp: '15 min ago', description: 'Trojan horse variant spreading rapidly' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        ...prev,
        totalThreats: prev.totalThreats + Math.floor(Math.random() * 3),
        lastUpdate: new Date().toLocaleTimeString()
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
            <span className="text-gray-400">+12% from yesterday</span>
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
          <div className="h-64 flex items-end justify-between space-x-2">
            {threatTrends.map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500/60 to-blue-400/40 rounded-t-lg transition-all duration-300 hover:from-blue-400/80 hover:to-blue-300/60"
                  style={{ height: `${(day.threats / 100) * 200}px` }}
                ></div>
                <div className="mt-2 text-xs text-gray-400">{day.day}</div>
                <div className="text-xs font-medium text-white">{day.threats}</div>
              </div>
            ))}
          </div>
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
      </div>
    </div>
  );
};

export { Dashboard };
