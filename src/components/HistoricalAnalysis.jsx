import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const HistoricalAnalysis = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState('30d');
  const [selectedThreatType, setSelectedThreatType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [historicalData, setHistoricalData] = useState([]);
  const [incidentTimeline, setIncidentTimeline] = useState([]);
  const [trendAnalysis, setTrendAnalysis] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchHistoricalData();
  }, [selectedTimeRange, selectedThreatType, selectedSeverity]);

  const fetchHistoricalData = async () => {
    try {
      setLoading(true);
      
      // Calculate date range based on selection
      const endDate = new Date();
      const startDate = new Date();
      
      switch (selectedTimeRange) {
        case '7d':
          startDate.setDate(endDate.getDate() - 7);
          break;
        case '30d':
          startDate.setDate(endDate.getDate() - 30);
          break;
        case '90d':
          startDate.setDate(endDate.getDate() - 90);
          break;
        case '1y':
          startDate.setFullYear(endDate.getFullYear() - 1);
          break;
        default:
          startDate.setDate(endDate.getDate() - 30);
      }

      // Fetch threats for the selected date range
      const threats = await apiService.fetchThreatsByDateRange(
        startDate.toISOString(),
        endDate.toISOString()
      );

      // Process historical data for charts
      const processedData = processHistoricalData(threats, selectedTimeRange);
      setHistoricalData(processedData);

      // Process incident timeline
      const processedTimeline = processIncidentTimeline(threats);
      setIncidentTimeline(processedTimeline);

      // Calculate trend analysis
      const analysis = calculateTrendAnalysis(threats);
      setTrendAnalysis(analysis);

      setError(null);
    } catch (err) {
      console.error('Error fetching historical data:', err);
      setError('Failed to load historical data');
    } finally {
      setLoading(false);
    }
  };

  const processHistoricalData = (threats, timeRange) => {
    const data = [];
    const days = timeRange === '7d' ? 7 : timeRange === '30d' ? 30 : timeRange === '90d' ? 90 : 365;
    
    for (let i = days - 1; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      
      const dayThreats = threats.filter(threat => {
        const threatDate = new Date(threat.timestamp).toISOString().split('T')[0];
        return threatDate === dateStr;
      });

      const malware = dayThreats.filter(t => extractThreatType(t.input).toLowerCase() === 'malware').length;
      const phishing = dayThreats.filter(t => extractThreatType(t.input).toLowerCase() === 'phishing').length;
      const ddos = dayThreats.filter(t => extractThreatType(t.input).toLowerCase() === 'ddos').length;
      const apt = dayThreats.filter(t => extractThreatType(t.input).toLowerCase() === 'apt').length;

      data.push({
        date: dateStr,
        malware,
        phishing,
        ddos,
        apt,
        total: dayThreats.length
      });
    }

    return data;
  };

  const processIncidentTimeline = (threats) => {
    // Get critical and high severity threats for timeline
    const criticalThreats = threats
      .filter(threat => threat.severity?.toLowerCase() === 'critical' || threat.severity?.toLowerCase() === 'high')
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 10);

    return criticalThreats.map((threat, index) => ({
      id: threat._id,
      date: new Date(threat.timestamp).toLocaleDateString('en-US'),
      time: new Date(threat.timestamp).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      type: threat.severity || 'Medium',
      title: `${extractThreatType(threat.input)} Threat Detected`,
      description: threat.summary ? threat.summary.substring(0, 150) + '...' : 'No description available',
      impact: threat.severity?.toLowerCase() === 'critical' ? 'High' : 'Medium',
      status: 'Resolved'
    }));
  };

  const calculateTrendAnalysis = (threats) => {
    const total = threats.length;
    const avgDaily = total / 30; // Assuming 30 days for calculation
    
    const critical = threats.filter(t => t.severity?.toLowerCase() === 'critical').length;
    const high = threats.filter(t => t.severity?.toLowerCase() === 'high').length;
    const medium = threats.filter(t => t.severity?.toLowerCase() === 'medium').length;
    const low = threats.filter(t => t.severity?.toLowerCase() === 'low').length;

    // Find peak day
    const dailyCounts = {};
    threats.forEach(threat => {
      const date = new Date(threat.timestamp).toISOString().split('T')[0];
      dailyCounts[date] = (dailyCounts[date] || 0) + 1;
    });

    const peakDay = Object.entries(dailyCounts).reduce((a, b) => dailyCounts[a[0]] > dailyCounts[b[0]] ? a : b);
    
    return {
      totalThreats: total,
      avgDailyThreats: Math.round(avgDaily * 10) / 10,
      peakDay: peakDay[0],
      peakThreats: peakDay[1],
      trendDirection: 'increasing',
      trendPercentage: 12.5,
      critical,
      high,
      medium,
      low
    };
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

  if (loading && historicalData.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading historical data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-red-400 mb-2">Error loading historical data</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button 
            onClick={fetchHistoricalData}
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
              <p className="text-3xl font-bold text-white">{trendAnalysis.totalThreats?.toLocaleString() || 0}</p>
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
              <p className="text-3xl font-bold text-white">{trendAnalysis.avgDailyThreats || 0}</p>
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
              <p className="text-3xl font-bold text-orange-400">{trendAnalysis.peakThreats || 0}</p>
            </div>
            <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">{trendAnalysis.peakDay || 'N/A'}</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm font-medium">Critical Threats</p>
              <p className="text-3xl font-bold text-red-400">{trendAnalysis.critical || 0}</p>
            </div>
            <div className="w-12 h-12 bg-red-500/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2">High priority alerts</p>
        </div>
      </div>

      {/* Historical Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Threat Trends Over Time */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
          <h3 className="text-xl font-semibold text-blue-400 mb-6">Threat Trends Over Time</h3>
          {historicalData.length > 0 ? (
            <div className="h-64 flex items-end justify-between space-x-2">
              {historicalData.map((day, index) => (
                <div key={index} className="flex flex-col items-center flex-1">
                  <div className="w-full flex flex-col space-y-1">
                    <div 
                      className="w-full bg-gradient-to-t from-red-500/60 to-red-400/40 rounded-t-sm"
                      style={{ height: `${Math.max((day.malware / Math.max(...historicalData.map(d => d.total))) * 120, 2)}px` }}
                      title={`Malware: ${day.malware}`}
                    ></div>
                    <div 
                      className="w-full bg-gradient-to-t from-orange-500/60 to-orange-400/40 rounded-t-sm"
                      style={{ height: `${Math.max((day.phishing / Math.max(...historicalData.map(d => d.total))) * 120, 2)}px` }}
                      title={`Phishing: ${day.phishing}`}
                    ></div>
                    <div 
                      className="w-full bg-gradient-to-t from-yellow-500/60 to-yellow-400/40 rounded-t-sm"
                      style={{ height: `${Math.max((day.ddos / Math.max(...historicalData.map(d => d.total))) * 120, 2)}px` }}
                      title={`DDoS: ${day.ddos}`}
                    ></div>
                    <div 
                      className="w-full bg-gradient-to-t from-purple-500/60 to-purple-400/40 rounded-t-sm"
                      style={{ height: `${Math.max((day.apt / Math.max(...historicalData.map(d => d.total))) * 120, 2)}px` }}
                      title={`APT: ${day.apt}`}
                    ></div>
                  </div>
                  <div className="mt-2 text-xs text-gray-400">{day.date.split('-')[2]}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-400">
              No historical data available
            </div>
          )}
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
                  <div className="bg-red-400 h-3 rounded-full" style={{ width: `${trendAnalysis.totalThreats ? Math.round((trendAnalysis.critical / trendAnalysis.totalThreats) * 100) : 0}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{trendAnalysis.critical || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-orange-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">Phishing</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-slate-600 rounded-full h-3 mr-3">
                  <div className="bg-orange-400 h-3 rounded-full" style={{ width: `${trendAnalysis.totalThreats ? Math.round((trendAnalysis.high / trendAnalysis.totalThreats) * 100) : 0}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{trendAnalysis.high || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-yellow-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">DDoS</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-slate-600 rounded-full h-3 mr-3">
                  <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${trendAnalysis.totalThreats ? Math.round((trendAnalysis.medium / trendAnalysis.totalThreats) * 100) : 0}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{trendAnalysis.medium || 0}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-purple-400 rounded-full mr-3"></div>
                <span className="text-sm text-gray-300">APT</span>
              </div>
              <div className="flex items-center">
                <div className="w-32 bg-slate-600 rounded-full h-3 mr-3">
                  <div className="bg-purple-400 h-3 rounded-full" style={{ width: `${trendAnalysis.totalThreats ? Math.round((trendAnalysis.low / trendAnalysis.totalThreats) * 100) : 0}%` }}></div>
                </div>
                <span className="text-sm text-white font-medium">{trendAnalysis.low || 0}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Incident Timeline */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-6">Incident Timeline</h3>
        {incidentTimeline.length > 0 ? (
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
        ) : (
          <div className="text-center py-8 text-gray-400">
            No incidents found in the selected time range
          </div>
        )}
      </div>
    </div>
  );
};

export { HistoricalAnalysis };
