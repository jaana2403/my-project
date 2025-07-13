import React from 'react';
import GaugeChart from 'react-gauge-chart';

const SeverityGauge = ({ severityCounts }) => {
  const scoreMap = { low: 1, medium: 2, high: 3, critical: 4 };
  const total = Object.values(severityCounts).reduce((a, b) => a + b, 0);

  const weightedScore =
    Object.entries(severityCounts).reduce((sum, [key, val]) => {
      return sum + (scoreMap[key.toLowerCase()] || 0) * val;
    }, 0) / total;

  const normalized = Math.min(weightedScore / 4, 1);

  return (
    <div className="bg-slate-800 rounded-lg p-4">
      <h3 className="text-white mb-2 text-lg font-semibold">Threat Severity Gauge</h3>
      <GaugeChart
        id="threat-severity-gauge"
        nrOfLevels={4}
        percent={normalized}
        textColor="#fff"
        colors={['#16a34a', '#facc15', '#f97316', '#ef4444']}
        arcWidth={0.3}
        animate={true}
      />
      <p className="text-white mt-2 text-sm text-center">Weighted severity score</p>
    </div>
  );
};

export default SeverityGauge;