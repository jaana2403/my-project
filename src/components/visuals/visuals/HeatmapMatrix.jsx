import React from 'react';

const HeatmapMatrix = ({ matrixData }) => {
  const severities = ['low', 'medium', 'high', 'critical'];
  const types = [...new Set(matrixData.map(d => d.type))];

  const getColor = (count) => {
    if (count === 0) return 'bg-slate-700';
    if (count < 3) return 'bg-green-500/60';
    if (count < 6) return 'bg-yellow-500/60';
    if (count < 10) return 'bg-orange-500/60';
    return 'bg-red-500/70';
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 text-white">
      <h3 className="text-lg font-semibold mb-4">Threat Type vs Severity Matrix</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-fixed text-sm text-center">
          <thead>
            <tr>
              <th className="p-2 border-b border-slate-600">Type \ Severity</th>
              {severities.map(sev => (
                <th key={sev} className="p-2 border-b border-slate-600 capitalize">{sev}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {types.map(type => (
              <tr key={type}>
                <td className="p-2 border-b border-slate-600 capitalize text-left">{type}</td>
                {severities.map(sev => {
                  const cell = matrixData.find(d => d.type === type && d.severity === sev);
                  return (
                    <td key={sev} className={`p-2 border-b border-slate-600 ${getColor(cell?.count || 0)}`}>
                      {cell?.count || 0}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HeatmapMatrix;