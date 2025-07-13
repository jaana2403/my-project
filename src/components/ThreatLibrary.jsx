import React, { useState } from 'react';

const ThreatLibrary = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedSeverity, setSelectedSeverity] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');

  const threatLibrary = [
    {
      id: 1,
      type: 'IP Address',
      value: '192.168.1.100',
      severity: 'Critical',
      source: 'RSS Feed 1',
      firstSeen: '2024-01-15',
      lastSeen: '2024-01-20',
      description: 'Malicious IP address associated with ransomware distribution',
      tags: ['ransomware', 'malware', 'c2'],
      metadata: {
        country: 'Russia',
        asn: 'AS12345',
        isp: 'Malicious ISP',
        reputation: 'Malicious',
        relatedDomains: ['evil.com', 'malware.net'],
        relatedHashes: ['abc123...', 'def456...']
      }
    },
    {
      id: 2,
      type: 'Domain',
      value: 'malware.example.com',
      severity: 'High',
      source: 'Atom Feed 3',
      firstSeen: '2024-01-12',
      lastSeen: '2024-01-18',
      description: 'Phishing domain targeting financial institutions',
      tags: ['phishing', 'financial', 'credential-theft'],
      metadata: {
        registrar: 'Evil Registrar',
        creationDate: '2024-01-01',
        expirationDate: '2025-01-01',
        nameservers: ['ns1.evil.com', 'ns2.evil.com'],
        relatedIPs: ['192.168.1.100', '10.0.0.1'],
        sslCertificate: 'Valid'
      }
    },
    {
      id: 3,
      type: 'Hash (MD5)',
      value: 'd41d8cd98f00b204e9800998ecf8427e',
      severity: 'Medium',
      source: 'YAML Feed 2',
      firstSeen: '2024-01-10',
      lastSeen: '2024-01-15',
      description: 'Trojan horse variant with advanced evasion techniques',
      tags: ['trojan', 'evasion', 'persistence'],
      metadata: {
        fileType: 'PE32',
        fileSize: '2.5MB',
        compilationDate: '2024-01-05',
        entropy: '7.8',
        relatedIPs: ['192.168.1.100'],
        relatedDomains: ['malware.example.com'],
        antivirusDetection: '15/70'
      }
    },
    {
      id: 4,
      type: 'URL',
      value: 'https://evil.com/payload.exe',
      severity: 'Critical',
      source: 'RSS Feed 5',
      firstSeen: '2024-01-08',
      lastSeen: '2024-01-14',
      description: 'Malicious URL serving ransomware payload',
      tags: ['ransomware', 'payload', 'download'],
      metadata: {
        protocol: 'HTTPS',
        port: '443',
        path: '/payload.exe',
        responseCode: '200',
        contentType: 'application/octet-stream',
        relatedIPs: ['192.168.1.100'],
        relatedDomains: ['evil.com']
      }
    },
    {
      id: 5,
      type: 'Email',
      value: 'phish@evil.com',
      severity: 'High',
      source: 'Atom Feed 1',
      firstSeen: '2024-01-05',
      lastSeen: '2024-01-12',
      description: 'Phishing email address used in credential theft campaigns',
      tags: ['phishing', 'email', 'credential-theft'],
      metadata: {
        emailProvider: 'Evil Mail',
        firstSeen: '2024-01-05',
        lastSeen: '2024-01-12',
        relatedDomains: ['evil.com'],
        relatedIPs: ['192.168.1.100'],
        campaign: 'Financial Phishing 2024'
      }
    },
    {
      id: 6,
      type: 'Hash (SHA256)',
      value: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
      severity: 'Medium',
      source: 'RSS Feed 3',
      firstSeen: '2024-01-03',
      lastSeen: '2024-01-10',
      description: 'Spyware variant targeting corporate networks',
      tags: ['spyware', 'corporate', 'data-exfiltration'],
      metadata: {
        fileType: 'PE32+',
        fileSize: '1.8MB',
        compilationDate: '2024-01-01',
        entropy: '7.2',
        relatedIPs: ['10.0.0.1'],
        relatedDomains: ['spyware.net'],
        antivirusDetection: '8/70'
      }
    }
  ];

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
      case 'hash (md5)': return '🔒';
      case 'hash (sha256)': return '🔐';
      case 'url': return '📡';
      case 'email': return '📧';
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
    critical: threatLibrary.filter(t => t.severity === 'Critical').length,
    high: threatLibrary.filter(t => t.severity === 'High').length,
    medium: threatLibrary.filter(t => t.severity === 'Medium').length,
    low: threatLibrary.filter(t => t.severity === 'Low').length
  };

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
              <option value="rss">RSS Feeds</option>
              <option value="atom">Atom Feeds</option>
              <option value="yaml">YAML Feeds</option>
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
