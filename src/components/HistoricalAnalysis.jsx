import React, { useState } from 'react';

const HistoricalAnalysis = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedThreatType, setSelectedThreatType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');

  const historicalData = {
    '30d': [
      { date: '2024-01-01', malware: 45, phishing: 32, ddos: 18, apt: 12 },
      { date: '2024-01-02', malware: 52, phishing: 28, ddos: 22, apt: 15 },
      { date: '2024-01-03', malware: 38, phishing: 41, ddos: 16, apt: 8 },
      { date: '2024-01-04', malware: 67, phishing: 35, ddos: 25, apt: 19 },
      { date: '2024-01-05', malware: 43, phishing: 29, ddos: 14, apt: 11 },
      { date: '2024-01-06', malware: 58, phishing: 38, ddos: 21, apt: 13 },
      { date: '2024-01-07', malware: 49, phishing: 33, ddos: 17, apt: 9 },
    ],
    '90d': [
      { date: '2024-01-01', malware: 45, phishing: 32, ddos: 18, apt: 12 },
      { date: '2024-01-08', malware: 52, phishing: 28, ddos: 22, apt: 15 },
      { date: '2024-01-15', malware: 38, phishing: 41, ddos: 16, apt: 8 },
      { date: '2024-01-22', malware: 67, phishing: 35, ddos: 25, apt: 19 },
      { date: '2024-01-29', malware: 43, phishing: 29, ddos: 14, apt: 11 },
      { date: '2024-02-05', malware: 58, phishing: 38, ddos: 21, apt: 13 },
      { date: '2024-02-12', malware: 49, phishing: 33, ddos: 17, apt: 9 },
    ]
  };

  const incidentTimeline = [
    {
      id: 1,
      date: '2024-01-15',
      time: '14:30',
      type: 'Critical',
      title: 'Ransomware Attack Detected',
      description: 'Large-scale ransomware campaign targeting healthcare sector',
      impact: 'High',
      status: 'Resolved'
    },
    {
      id: 2,
      date: '2024-01-12',
      time: '09:15',
      type: 'High',
      title: 'Phishing Campaign Identified',
      description: 'Sophisticated phishing attack targeting financial institutions',
      impact: 'Medium',
      status: 'Resolved'
    },
    {
      id: 3,
      date: '2024-01-08',
      time: '16:45',
      type: 'Critical',
      title: 'DDoS Attack on Infrastructure',
      description: 'Massive DDoS attack affecting multiple data centers',
      impact: 'High',
      status: 'Resolved'
    },
    {
      id: 4,
      date: '2024-01-05',
      time: '11:20',
      type: 'Medium',
      title: 'Malware Variant Discovered',
      description: 'New trojan horse variant with advanced evasion techniques',
      impact: 'Medium',
      status: 'Resolved'
    },
    {
      id: 5,
      date: '2024-01-01',
      time: '13:10',
      type: 'High',
      title: 'APT Activity Detected',
      description: 'Advanced persistent threat group targeting government systems',
      impact: 'High',
      status: 'Ongoing'
    }
  ];

  const trendAnalysis = {
    totalThreats: 1247,
    avgDailyThreats: 41.6,
    peakDay: '2024-01-04',
    peakThreats: 146,
    trendDirection: 'increasing',
    trendPercentage: 12.5
  };

  const getTypeColor = (type) => {
    switch (type.toLowerCase()) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeBgColor = (type) => {
    switch (type.toLowerCase()) {
      case 'critical': return 'bg-red-500/20 border-red-500/30';
      case 'high': return 'bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 border-green-500/30';
      default: return 'bg-gray-500/20 border-gray-500/30';
    }
  };

  const getStatusColor = (status) => {
    return status === 'Resolved' ? 'text-green-400' : 'text-yellow-400';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Historical Analysis</h1>
        <p className="text-gray-400">Deep insights into threat patterns and historical trends</p>
      </div>

      {/* Filters */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-semibold text-blue-400 mb-4">Analysis Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Time Range</label>
            <select 
              value={selectedTimeRange} 
              onChange={(e) => setSelectedTimeRange(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
              <option value="90d">Last 90 Days</option>
              <option value="1y">Last Year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Threat Type</label>
            <select 
              value={selectedThreatType} 
              onChange={(e) => setSelectedThreatType(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="malware">Malware</option>
              <option value="phishing">Phishing</option>
              <option value="ddos">DDoS</option>
              <option value="apt">APT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Severity Level</label>
            <select 
              value={selectedSeverity} 
              onChange={(e) => setSelectedSeverity(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Severities</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Trend Analysis Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Total Threats</p>
              <p className="text-3xl font-bold text-white">{trendAnalysis.totalThreats.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Avg Daily Threats</p>
              <p className="text-3xl font-bold text-white">{trendAnalysis.avgDailyThreats}</p>
            </div>
            <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Peak Day</p>
              <p className="text-3xl font-bold text-orange-400">{trendAnalysis.peakThreats}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{trendAnalysis.peakDay}</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Trend</p>
              <p className="text-3xl font-bold text-red-400">+{trendAnalysis.trendPercentage}%</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">Threats {trendAnalysis.trendDirection}</p>
        </div>
      </div>

      {/* Historical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Threat Trends Over Time */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-6">Threat Trends Over Time</h3>
          <div className="h-64 flex items-end justify-between space-x-2">
            {historicalData[selectedTimeRange].map((day, index) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex flex-col space-y-1">
                  <div 
                    className="w-full bg-gradient-to-t from-red-500/60 to-red-400/40 rounded-t-sm"
                    style={{ height: `${(day.malware / 100) * 120}px` }}
                    title={`Malware: ${day.malware}`}
                  ></div>
                  <div 
                    className="w-full bg-gradient-to-t from-orange-500/60 to-orange-400/40 rounded-t-sm"
                    style={{ height: `${(day.phishing / 100) * 120}px` }}
                    title={`Phishing: ${day.phishing}`}
                  ></div>
                  <div 
                    className="w-full bg-gradient-to-t from-yellow-500/60 to-yellow-400/40 rounded-t-sm"
                    style={{ height: `${(day.ddos / 100) * 120}px` }}
                    title={`DDoS: ${day.ddos}`}
                  ></div>
                  <div 
                    className="w-full bg-gradient-to-t from-purple-500/60 to-purple-400/40 rounded-t-sm"
                    style={{ height: `${(day.apt / 100) * 120}px` }}
                    title={`APT: ${day.apt}`}
                  ></div>
                </div>
                <div className="mt-2 text-xs text-gray-400">{day.date.split('-')[2]}</div>
              </div>
            ))}
          </div>
          <div className="flex justify-center space-x-4 mt-4 text-xs">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-400 rounded mr-1"></div>
              <span className="text-gray-400">Malware</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded mr-1"></div>
              <span className="text-gray-400">Phishing</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded mr-1"></div>
              <span className="text-gray-400">DDoS</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-400 rounded mr-1"></div>
              <span className="text-gray-400">APT</span>
            </div>
          </div>
        </div>

        {/* Threat Type Distribution */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-6">Threat Type Distribution</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">Malware</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-slate-600 rounded-full h-3 mr-3">
                  <div className="bg-red-400 h-3 rounded-full" style={{ width: '45%' }}></div>
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
                <div className="w-32 bg-slate-600 rounded-full h-3 mr-3">
                  <div className="bg-orange-400 h-3 rounded-full" style={{ width: '30%' }}></div>
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
                <div className="w-32 bg-slate-600 rounded-full h-3 mr-3">
                  <div className="bg-yellow-400 h-3 rounded-full" style={{ width: '15%' }}></div>
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
                <div className="w-32 bg-slate-600 rounded-full h-3 mr-3">
                  <div className="bg-purple-400 h-3 rounded-full" style={{ width: '10%' }}></div>
                </div>
                <span className="text-sm text-white font-medium">10%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Incident Timeline</h3>
        <div className="space-y-4">
          {incidentTimeline.map((incident, index) => (
            <div key={incident.id} className="flex items-start space-x-4 p-4 bg-slate-700/30 rounded-lg border border-slate-600/30 hover:border-blue-400/30 transition-all duration-300">
              <div className="flex-shrink-0">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(incident.type).replace('text-', 'bg-')}`}></div>
                {index < incidentTimeline.length - 1 && (
                  <div className="w-0.5 h-16 bg-slate-600 mx-auto mt-2"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-semibold text-white">{incident.title}</h4>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeBgColor(incident.type)} ${getTypeColor(incident.type)}`}>
                    {incident.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-2">{incident.description}</p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span>{incident.date} at {incident.time}</span>
                  <span>Impact: {incident.impact}</span>
                  <span className={getStatusColor(incident.status)}>Status: {incident.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { HistoricalAnalysis };
