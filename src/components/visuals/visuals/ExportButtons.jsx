import React from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const ExportButtons = ({ data }) => {
  const exportToCSV = () => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Threats');
    const buf = XLSX.write(wb, { bookType: 'csv', type: 'array' });
    const blob = new Blob([buf], { type: 'text/csv;charset=utf-8;' });
    saveAs(blob, 'threats.csv');
  };

  const exportToJSON = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    saveAs(blob, 'threats.json');
  };

  return (
    <div className="flex space-x-4 mt-4">
      <button
        onClick={exportToCSV}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Export CSV
      </button>
      <button
        onClick={exportToJSON}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        Export JSON
      </button>
    </div>
  );
};

export default ExportButtons;