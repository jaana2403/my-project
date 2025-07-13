import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const IocTypeBarChart = ({ typeCounts }) => {
  const barData = Object.entries(typeCounts).map(([key, value]) => ({
    type: key,
    count: value
  }));

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h3 className="text-white mb-4 text-lg font-semibold">IOC Type Count</h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IocTypeBarChart;