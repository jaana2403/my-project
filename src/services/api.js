const API_BASE_URL = 'http://localhost:8000/api'; // FastAPI server URL

class ApiService {
  async fetchThreats() {
    try {
      const response = await fetch(`${API_BASE_URL}/threats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching threats:', error);
      return [];
    }
  }

  async fetchThreatsByDateRange(startDate, endDate) {
    try {
      const response = await fetch(`${API_BASE_URL}/threats/search?start=${startDate}&end=${endDate}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching threats by date range:', error);
      return [];
    }
  }

  async fetchThreatsBySeverity(severity) {
    try {
      const response = await fetch(`${API_BASE_URL}/threats/search?severity=${severity}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching threats by severity:', error);
      return [];
    }
  }

  async fetchThreatStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/threats/stats`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching threat stats:', error);
      return {
        total: 0,
        critical: 0,
        high: 0,
        medium: 0,
        low: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0
      };
    }
  }

  async fetchRecentThreats(limit = 10) {
    try {
      const response = await fetch(`${API_BASE_URL}/threats/recent?limit=${limit}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching recent threats:', error);
      return [];
    }
  }

  async searchThreats(query, filters = {}) {
    try {
      const params = new URLSearchParams({ q: query, ...filters });
      const response = await fetch(`${API_BASE_URL}/threats/search?${params}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error searching threats:', error);
      return [];
    }
  }

  async fetchFeedHealth() {
    try {
      const response = await fetch(`${API_BASE_URL}/feeds/status`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching feed health:', error);
      return {
        feeds: [],
        status: {
          total: 0,
          operational: 0,
          degraded: 0,
          failed: 0
        },
        performance: {
          avgResponseTime: 0,
          totalUptime: 0,
          errorRate: 0
        }
      };
    }
  }

  async fetchThreatTrends(days = 7) {
    try {
      const response = await fetch(`${API_BASE_URL}/threats/trends?days=${days}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching threat trends:', error);
      return [];
    }
  }

  async fetchThreatDistribution() {
    try {
      const response = await fetch(`${API_BASE_URL}/threats/distribution`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching threat distribution:', error);
      return {
        byType: {},
        bySeverity: {},
        bySource: {}
      };
    }
  }

  async analyzeThreat(input, model = 'llama2') {
    try {
      const response = await fetch(`${API_BASE_URL}/threats/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, model })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error analyzing threat:', error);
      throw error;
    }
  }

  async triggerFeedCollection() {
    try {
      const response = await fetch(`${API_BASE_URL}/feeds/collect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ run_immediately: true })
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error triggering feed collection:', error);
      throw error;
    }
  }

  async getHealthStatus() {
    try {
      const response = await fetch('http://localhost:8000/health');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching health status:', error);
      return {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        uptime: '0:00:00',
        total_threats: 0,
        feeds_status: {}
      };
    }
  }
}

export default new ApiService(); 