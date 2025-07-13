import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

// Example: import data from a local file or fetch from API
// import threatData from '../data/threats.json';

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const ThreatDashboard = ({ data }) => {
  // data: array of threat objects

  // 1. Cards: total, by severity
  const totalThreats = data.length;
  const severityCounts = data.reduce((acc, curr) => {
    const sev = (curr.severity || 'Unknown').toLowerCase().trim();
    acc[sev] = (acc[sev] || 0) + 1;
    return acc;
  }, {});

  // 2. Pie chart data
  const pieData = Object.entries(severityCounts).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value,
  }));

  // 3. Line chart: threats per day
  const threatsByDate = {};
  data.forEach(item => {
    const date = new Date(item.timestamp).toISOString().slice(0, 10);
    threatsByDate[date] = (threatsByDate[date] || 0) + 1;
  });
  const lineData = Object.entries(threatsByDate).map(([date, count]) => ({
    date,
    count,
  })).sort((a, b) => a.date.localeCompare(b.date));

  // 4. Recent threats (table)
  const recentThreats = [...data].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);

  return (
    <div className="p-6">
      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-800 rounded-lg p-4 text-white">
          <div className="text-2xl font-bold">{totalThreats}</div>
          <div>Total Threats</div>
        </div>
        {Object.entries(severityCounts).map(([sev, count], idx) => (
          <div key={sev} className="bg-slate-800 rounded-lg p-4 text-white">
            <div className="text-2xl font-bold">{count}</div>
            <div>{sev.charAt(0).toUpperCase() + sev.slice(1)} Severity</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Pie Chart */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-white mb-4">Threats by Severity</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Line Chart */}
        <div className="bg-slate-800 rounded-lg p-4">
          <h3 className="text-white mb-4">Threats Over Time</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#00C49F" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Threats Table */}
      <div className="bg-slate-800 rounded-lg p-4">
        <h3 className="text-white mb-4">Recent Threats</h3>
        <table className="w-full text-white">
          <thead>
            <tr>
              <th className="text-left">Timestamp</th>
              <th className="text-left">Input</th>
              <th className="text-left">Severity</th>
              <th className="text-left">Summary</th>
            </tr>
          </thead>
          <tbody>
            {recentThreats.map((threat, idx) => (
              <tr key={idx} className="border-t border-slate-700">
                <td>{new Date(threat.timestamp).toLocaleString()}</td>
                <td>{threat.input}</td>
                <td>{threat.severity}</td>
                <td>{threat.summary.slice(0, 60)}...</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ThreatDashboard;
