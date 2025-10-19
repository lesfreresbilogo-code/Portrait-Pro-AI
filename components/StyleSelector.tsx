
import React from 'react';
import { Style } from '../types';

interface StyleSelectorProps {
  styles: Style[];
  selectedStyle: Style | null;
  onStyleSelect: (style: Style) => void;
}

const StyleCard: React.FC<{ style: Style; isSelected: boolean; onSelect: () => void; }> = ({ style, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`bg-gray-800 rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform hover:-translate-y-2 border-2 ${isSelected ? 'border-indigo-500 scale-105 shadow-2xl shadow-indigo-500/20' : 'border-gray-700 hover:border-indigo-600'}`}
    >
      <img src={style.imageUrl} alt={style.name} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="font-bold text-lg text-gray-100">{style.name}</h3>
        <p className="text-sm text-gray-400 mt-1">{style.description}</p>
      </div>
    </div>
  );
};

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyle, onStyleSelect }) => {
  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Étape 2: Choisissez un Style</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {styles.map(style => (
          <StyleCard
            key={style.id}
            style={style}
            isSelected={selectedStyle?.id === style.id}
            onSelect={() => onStyleSelect(style)}
          />
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;
