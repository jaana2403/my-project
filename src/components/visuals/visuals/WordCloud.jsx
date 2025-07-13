import React from 'react';
import ReactWordcloud from 'react-wordcloud';

const WordCloud = ({ keywords }) => {
  const words = keywords.map(word => ({
    text: word.text,
    value: word.value
  }));

  const options = {
    rotations: 2,
    rotationAngles: [0, 90],
    fontSizes: [14, 50]
  };

  return (
    <div className="bg-slate-800 rounded-lg p-4 text-white">
      <h3 className="text-lg font-semibold mb-4">Keyword Cloud</h3>
      <div style={{ height: 300 }}>
        <ReactWordcloud words={words} options={options} />
      </div>
    </div>
  );
};

export default WordCloud;