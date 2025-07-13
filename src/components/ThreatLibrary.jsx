import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const ThreatLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [threatLibrary, setThreatLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchThreatLibrary();
  }, []);

  const fetchThreatLibrary = async () => {
    try {
      setLoading(true);
      const threats = await apiService.fetchThreats();
      
      // Transform the data to match the expected format
      const transformedThreats = threats.map(threat => ({
        id: threat._id,
        type: extractThreatType(threat.input),
        value: threat.input,
        severity: threat.severity || 'Medium',
        source: 'AI Analysis',
        firstSeen: formatDate(threat.timestamp),
        lastSeen: formatDate(threat.timestamp),
        description: threat.summary ? threat.summary.substring(0, 200) + '...' : 'No description available',
        tags: extractTags(threat.input, threat.summary),
        metadata: {
          timestamp: formatDate(threat.timestamp),
          severity: threat.severity || 'Medium',
          source: 'AI Analysis',
          summary: threat.summary ? threat.summary.substring(0, 100) + '...' : 'No summary available'
        }
      }));

      setThreatLibrary(transformedThreats);
      setError(null);
    } catch (err) {
      console.error('Error fetching threat library:', err);
      setError('Failed to load threat library');
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
    if (inputLower.includes('ip') || /\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/.test(input)) return 'IP Address';
    if (inputLower.includes('domain') || inputLower.includes('.com') || inputLower.includes('.net')) return 'Domain';
    if (inputLower.includes('url') || inputLower.includes('http')) return 'URL';
    if (inputLower.includes('hash') || /[a-fA-F0-9]{32,64}/.test(input)) return 'Hash';
    if (inputLower.includes('@') && inputLower.includes('.')) return 'Email';
    
    return 'Threat';
  };

  const extractTags = (input, summary) => {
    const tags = [];
    const text = (input + ' ' + (summary || '')).toLowerCase();
    
    if (text.includes('ddos') || text.includes('dos')) tags.push('ddos');
    if (text.includes('phishing')) tags.push('phishing');
    if (text.includes('malware')) tags.push('malware');
    if (text.includes('ransomware')) tags.push('ransomware');
    if (text.includes('trojan')) tags.push('trojan');
    if (text.includes('apt')) tags.push('apt');
    if (text.includes('spam')) tags.push('spam');
    if (text.includes('botnet')) tags.push('botnet');
    if (text.includes('credential')) tags.push('credential-theft');
    if (text.includes('financial')) tags.push('financial');
    if (text.includes('corporate')) tags.push('corporate');
    if (text.includes('government')) tags.push('government');
    if (text.includes('healthcare')) tags.push('healthcare');
    
    return tags.slice(0, 5); // Limit to 5 tags
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown';
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
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

  const getTypeIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'ip address': return '🌐';
      case 'domain': return '🔗';
      case 'hash': return '🔒';
      case 'url': return '📡';
      case 'email': return '📧';
      case 'ddos': return '⚡';
      case 'phishing': return '🎣';
      case 'malware': return '🦠';
      case 'apt': return '👥';
      default: return '⚠️';
    }
  };

  const filteredThreats = threatLibrary.filter(threat => {
    const matchesSearch = threat.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         threat.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         threat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = selectedType === 'all' || threat.type.toLowerCase().includes(selectedType.toLowerCase());
    const matchesSeverity = selectedSeverity === 'all' || threat.severity.toLowerCase() === selectedSeverity.toLowerCase();
    const matchesSource = selectedSource === 'all' || threat.source.toLowerCase().includes(selectedSource.toLowerCase());
    
    return matchesSearch && matchesType && matchesSeverity && matchesSource;
  });

  const stats = {
    total: threatLibrary.length,
    critical: threatLibrary.filter(t => t.severity.toLowerCase() === 'critical').length,
    high: threatLibrary.filter(t => t.severity.toLowerCase() === 'high').length,
    medium: threatLibrary.filter(t => t.severity.toLowerCase() === 'medium').length,
    low: threatLibrary.filter(t => t.severity.toLowerCase() === 'low').length
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
          <p className="text-gray-400">Loading threat library...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-6xl mb-4">⚠️</div>
          <p className="text-red-400 mb-2">Error loading threat library</p>
          <p className="text-gray-400 text-sm">{error}</p>
          <button 
            onClick={fetchThreatLibrary}
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
        <h1 className="text-3xl font-bold text-blue-400 mb-2">Threat Library</h1>
        <p className="text-gray-400">Searchable collection of IOCs with detailed metadata and source attribution</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-white">{stats.total}</p>
          <p className="text-gray-400 text-sm">Total IOCs</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-red-400">{stats.critical}</p>
          <p className="text-gray-400 text-sm">Critical</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-orange-400">{stats.high}</p>
          <p className="text-gray-400 text-sm">High</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-yellow-400">{stats.medium}</p>
          <p className="text-gray-400 text-sm">Medium</p>
        </div>
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 text-center">
          <p className="text-3xl font-bold text-green-400">{stats.low}</p>
          <p className="text-gray-400 text-sm">Low</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-400 mb-2">Search IOCs</label>
            <input
              type="text"
              placeholder="Search by IOC value, description, or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="ip">IP Address</option>
              <option value="domain">Domain</option>
              <option value="hash">Hash</option>
              <option value="url">URL</option>
              <option value="email">Email</option>
              <option value="ddos">DDoS</option>
              <option value="phishing">Phishing</option>
              <option value="malware">Malware</option>
              <option value="apt">APT</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Severity</label>
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
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Source</label>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="w-full bg-slate-700/50 border border-slate-600/50 rounded-lg px-4 py-2 text-white focus:border-blue-400 focus:outline-none"
            >
              <option value="all">All Sources</option>
              <option value="ai">AI Analysis</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className="mb-6">
        <p className="text-gray-400">
          Showing {filteredThreats.length} of {threatLibrary.length} IOCs
        </p>
      </div>

      {/* IOC Cards */}
      <div className="space-y-6">
        {filteredThreats.map((threat) => (
          <div key={threat.id} className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-sm border border-slate-600/50 rounded-xl p-6 hover:border-blue-400/50 transition-all duration-300">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getTypeIcon(threat.type)}</div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{threat.type}</h3>
                  <p className="text-blue-400 font-mono text-sm break-all">{threat.value}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getSeverityBgColor(threat.severity)} ${getSeverityColor(threat.severity)}`}>
                  {threat.severity}
                </span>
                <span className="text-gray-400 text-sm">{threat.source}</span>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{threat.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {threat.tags.map((tag, index) => (
                <span key={index} className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-slate-600/50 text-gray-300">
                  {tag}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-3">Timeline</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">First Seen:</span>
                    <span className="text-white">{threat.firstSeen}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Seen:</span>
                    <span className="text-white">{threat.lastSeen}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-blue-400 mb-3">Metadata</h4>
                <div className="space-y-2 text-sm">
                  {Object.entries(threat.metadata).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}:</span>
                      <span className="text-white font-mono text-xs">{String(value)}</span>
                    </div>
                  ))}
                  {Object.keys(threat.metadata).length > 3 && (
                    <div className="text-gray-400 text-xs">
                      +{Object.keys(threat.metadata).length - 3} more fields
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span>Source: {threat.source}</span>
                  <span>•</span>
                  <span>ID: {threat.id}</span>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                  View Details →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredThreats.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">No IOCs Found</h3>
          <p className="text-gray-400">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
};

export { ThreatLibrary };
