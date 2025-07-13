import React from 'react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white">


      {/* Hero Section */}
      <section className="relative flex justify-between items-center px-12 py-16 bg-gradient-radial from-slate-800 to-slate-900 min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{backgroundImage: "url('/src/assets/artificial intelligence and data privacy (1)-1.webp')"}}></div>
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-4xl font-bold mb-4 text-shadow-lg">
            Comprehensive <span className="text-blue-400">Threat Intelligence</span> Platform
          </h2>
          <p className="text-lg leading-relaxed mb-8 opacity-95 text-shadow">
            Harness the power of automated threat aggregation, real-time analysis, and deep historical insights to stay ahead of cyber threats. Advanced threat intelligence aggregation platform providing real-time IOC monitoring, AI-powered analysis, and comprehensive historical insights for cybersecurity professionals.
          </p>
          <div className="space-x-4">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              Request a Demo
            </button>
            <button className="bg-gradient-to-r from-gray-200 to-gray-300 text-black px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:from-gray-300 hover:to-gray-400 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
              View Dashboard
            </button>
          </div>
        </div>
        <div className="relative z-10 flex-1 text-center">
          <img 
            src="/src/assets/public.avif" 
            alt="Threat Intelligence Platform" 
            className="max-w-full h-auto rounded-2xl shadow-2xl border-2 border-blue-400/30"
          />
        </div>
      </section>

      {/* Platform Overview */}
      <section className="relative px-12 py-16 bg-slate-800 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{backgroundImage: "url('/src/assets/artificial intelligence and data privacy (1)-1.webp')"}}></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-4">Comprehensive Threat Intelligence Platform</h2>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed opacity-95">
            Harness the power of automated threat aggregation, real-time analysis, and deep historical insights to stay ahead of cyber threats.
          </p>
        </div>
      </section>

      {/* Real-time Monitoring */}
      <section className="px-12 py-16 bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Real-time Monitoring</h2>
            <h3 className="text-2xl text-blue-400 mb-4">Live Threat Intelligence Dashboard</h3>
            <p className="text-lg leading-relaxed mb-8 opacity-95">
              Monitor threat indicators as they emerge with our real-time dashboard. WebSocket-powered updates ensure you never miss critical IOCs from RSS, Atom, and YAML feeds.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                WebSocket-powered real-time updates
              </li>
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Multi-format feed integration
              </li>
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Automated alerting mechanisms
              </li>
            </ul>
          </div>
          <div className="text-center">
            <img 
              src="/src/assets/publicContain.webp" 
              alt="Real-time Monitoring Dashboard" 
              className="max-w-full h-auto rounded-2xl shadow-2xl border-2 border-blue-400/30"
            />
          </div>
        </div>
      </section>

      {/* Historical Analysis */}
      <section className="px-12 py-16 bg-slate-800">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:order-2">
            <img 
              src="/src/assets/publicContain (1).webp" 
              alt="Historical Analysis Visualization" 
              className="max-w-full h-auto rounded-2xl shadow-2xl border-2 border-blue-400/30"
            />
          </div>
          <div className="lg:order-1">
            <h2 className="text-4xl font-bold mb-4">Historical Analysis</h2>
            <h3 className="text-2xl text-blue-400 mb-4">Deep Historical Visibility</h3>
            <p className="text-lg leading-relaxed mb-8 opacity-95">
              Explore past threat data through interactive visualizations, timeline-based incident graphs, and comprehensive trend analysis. Make informed decisions based on historical patterns.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Advanced filtering with keyword search, date ranges, threat-type selectors
              </li>
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Timeline analysis with interactive incident timelines and graphs
              </li>
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Comprehensive trend analysis and pattern recognition
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* AI Insights */}
      <section className="relative px-12 py-16 bg-slate-700 text-center">
        <div className="absolute inset-0 bg-cover bg-center opacity-5" style={{backgroundImage: "url('/src/assets/artificial intelligence and data privacy (1)-1.webp')"}}></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-8">AI-Generated Insights</h2>
          <p className="text-lg max-w-4xl mx-auto leading-relaxed opacity-95 mb-12">
            Automated threat summaries and severity classifications powered by advanced AI algorithms.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-xl text-blue-400 mb-4">Threat Severity Scoring</h3>
              <p className="text-sm leading-relaxed">Advanced algorithms automatically assess and score threat severity levels</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-xl text-blue-400 mb-4">Automated Summaries</h3>
              <p className="text-sm leading-relaxed">AI-powered threat summaries provide quick insights into complex security events</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
              <h3 className="text-xl text-blue-400 mb-4">Pattern Recognition</h3>
              <p className="text-sm leading-relaxed">Machine learning identifies patterns and correlations across threat data</p>
            </div>
          </div>
        </div>
      </section>

      {/* Feed Health */}
      <section className="px-12 py-16 bg-slate-900">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-4">Feed Health Monitoring</h2>
            <p className="text-lg leading-relaxed mb-8 opacity-95">
              Monitor the operational status and performance of all integrated IOC feeds with detailed logging.
            </p>
            <ul className="space-y-2">
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Real-time status tracking
              </li>
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Failure detection & comprehensive logs
              </li>
              <li className="flex items-center text-sm">
                <span className="text-blue-400 font-bold mr-3">✓</span>
                Performance metrics and analytics
              </li>
            </ul>
          </div>
          <div className="text-center">
            <img 
              src="/src/assets/public.avif" 
              alt="Feed Health Monitoring" 
              className="max-w-full h-auto rounded-2xl shadow-2xl border-2 border-blue-400/30"
            />
          </div>
        </div>
      </section>

      {/* Threat Library */}
      <section className="px-12 py-16 bg-slate-800 text-center">
        <h2 className="text-4xl font-bold mb-8">Comprehensive Threat Library</h2>
        <p className="text-lg max-w-4xl mx-auto leading-relaxed opacity-95 mb-12">
          Searchable collection of IOCs with detailed metadata including IPs, URLs, hashes, and source attribution.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl text-blue-400 mb-4">Searchable IOC Database</h3>
            <p className="text-sm leading-relaxed">Advanced search capabilities across all threat indicators</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl text-blue-400 mb-4">Detailed Metadata</h3>
            <p className="text-sm leading-relaxed">Comprehensive metadata for each IOC including context and analysis</p>
          </div>
          <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h3 className="text-xl text-blue-400 mb-4">Source Attribution</h3>
            <p className="text-sm leading-relaxed">Complete tracking of threat sources and attribution data</p>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="relative px-12 py-16 bg-slate-700">
        <div className="absolute inset-0 bg-cover bg-center opacity-3" style={{backgroundImage: "url('/src/assets/artificial intelligence and data privacy (1)-1.webp')"}}></div>
        <div className="relative z-10">
          <h2 className="text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <h3 className="text-xl text-blue-400 mb-4 relative">Live IOC Monitoring</h3>
              <p className="text-sm leading-relaxed opacity-95 relative">Real-time indicators from RSS, Atom, YAML feeds with WebSocket-powered updates</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <h3 className="text-xl text-blue-400 mb-4 relative">AI-Powered Analysis</h3>
              <p className="text-sm leading-relaxed opacity-95 relative">Automated summaries and severity tagging with advanced pattern recognition</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <h3 className="text-xl text-blue-400 mb-4 relative">Historical Analytics</h3>
              <p className="text-sm leading-relaxed opacity-95 relative">Deep insights into threat patterns and past activity with interactive visualizations</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <h3 className="text-xl text-blue-400 mb-4 relative">Advanced Filtering</h3>
              <p className="text-sm leading-relaxed opacity-95 relative">Filter by type, feed source, date, severity with keyword search capabilities</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <h3 className="text-xl text-blue-400 mb-4 relative">Feed Health Monitoring</h3>
              <p className="text-sm leading-relaxed opacity-95 relative">Real-time status tracking and performance metrics for all integrated feeds</p>
            </div>
            <div className="bg-gradient-to-br from-slate-800 to-slate-700 p-8 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
              <h3 className="text-xl text-blue-400 mb-4 relative">Threat Library</h3>
              <p className="text-sm leading-relaxed opacity-95 relative">Searchable IOC database with detailed metadata and source attribution</p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="px-12 py-12 bg-slate-900">
        <div className="flex flex-wrap justify-around items-center">
          <div className="text-center m-4 p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-2">24/7</h2>
            <p className="text-lg opacity-95">Continuous Monitoring</p>
          </div>
          <div className="text-center m-4 p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-2">1000+</h2>
            <p className="text-lg opacity-95">IOCs Processed Daily</p>
          </div>
          <div className="text-center m-4 p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-2">&lt;30s</h2>
            <p className="text-lg opacity-95">Avg Alert Time</p>
          </div>
          <div className="text-center m-4 p-8 bg-gradient-to-br from-slate-800 to-slate-700 rounded-2xl border border-slate-600 hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <h2 className="text-4xl font-bold text-blue-400 mb-2">99.9%</h2>
            <p className="text-lg opacity-95">Uptime Guarantee</p>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-12 py-16 bg-slate-800 text-center">
        <h2 className="text-4xl font-bold mb-8">Ready to Transform Your <span className="text-blue-400">Cybersecurity Strategy?</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto mb-8">
          <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl border border-slate-500 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 text-sm">
            ✅ Real-time monitoring with WebSocket updates
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl border border-slate-500 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 text-sm">
            ✅ AI-driven threat summaries and analysis
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl border border-slate-500 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 text-sm">
            ✅ Historical trend analysis and visualizations
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl border border-slate-500 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 text-sm">
            ✅ Advanced filtering and search capabilities
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl border border-slate-500 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 text-sm">
            ✅ Feed health monitoring and performance metrics
          </div>
          <div className="p-4 bg-gradient-to-br from-slate-700 to-slate-600 rounded-xl border border-slate-500 hover:border-blue-400 transition-all duration-300 hover:-translate-y-1 text-sm">
            ✅ Comprehensive threat library with metadata
          </div>
        </div>
        <div className="space-x-4">
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            Request a Demo
          </button>
          <button className="bg-gradient-to-r from-gray-200 to-gray-300 text-black px-8 py-3 rounded-lg font-semibold text-sm uppercase tracking-wide hover:from-gray-300 hover:to-gray-400 transform hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore Dashboard
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 px-12 py-12 border-t border-slate-700">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="text-2xl font-bold text-blue-400 mb-4">THREAT INTELLIGENCE</div>
            <p className="text-sm leading-relaxed opacity-80 mb-6">
              Advanced threat intelligence aggregation platform providing real-time IOC monitoring, AI-powered analysis, and comprehensive historical insights for cybersecurity professionals.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 hover:bg-blue-500 hover:border-blue-400 transform hover:-translate-y-1 transition-all duration-300">
                <img src="/src/assets/github-icon-filled-256.png" alt="GitHub" className="w-5 h-5 filter invert" />
              </a>
              <a href="#" className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-600 hover:bg-blue-500 hover:border-blue-400 transform hover:-translate-y-1 transition-all duration-300">
                <img src="/src/assets/png-clipart-twitter-twitter-thumbnail.png" alt="Twitter" className="w-5 h-5 filter invert" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg text-blue-400 font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Dashboard</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Historical Analysis</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Feed Health</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Library of Threats</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg text-blue-400 font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Help and Documentation</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-sm text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg text-blue-400 font-semibold mb-4">Stay Updated</h3>
            <p className="text-sm leading-relaxed opacity-80 mb-4">
              Get the latest threat intelligence insights and platform updates.
            </p>
            <form className="flex gap-2 mb-4">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required 
                className="flex-1 px-3 py-2 border border-slate-600 rounded bg-slate-800 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <button 
                type="submit" 
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded font-semibold text-sm hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-1 transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
            <div className="space-y-2 mb-4">
              <p className="text-sm opacity-80">📧 contact@threatintelligence.com</p>
              <p className="text-sm opacity-80">📞 +1 (555) 123-4567</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              System Operational
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-700 pt-6 text-center">
          <p className="text-xs opacity-70 mb-2">© 2025 Threat Intelligence Platform. All rights reserved.</p>
          <p className="text-xs opacity-70">Powered by advanced AI & real-time analytics</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage; 