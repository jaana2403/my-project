import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#3b82f6', '#6366f1', '#8b5cf6', '#ec4899', '#f97316', '#10b981'];

const SourceDonutChart = ({ sourceCounts }) => {
  const pieData = Object.entries(sourceCounts).map(([key, value]) => ({
    name: key,
    value
  }));

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h3 className="text-white mb-4 text-lg font-semibold">IOC Feed Source Distribution</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie data={pieData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SourceDonutChart;