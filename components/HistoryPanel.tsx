import React from 'react';

interface HistoryPanelProps {
  history: string[];
  onStartOver: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onStartOver }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-100">Vos Créations Récentes</h2>
        <button
            onClick={onStartOver}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-full text-sm transition-colors duration-300"
        >
            Tout recommencer
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {history.map((imageSrc, index) => (
          <div key={index} className="aspect-w-1 aspect-h-1">
            <img 
              src={imageSrc} 
              alt={`Generated portrait ${index + 1}`}
              className="object-cover rounded-lg shadow-md border-2 border-gray-700 hover:border-indigo-500 transition-colors"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryPanel;