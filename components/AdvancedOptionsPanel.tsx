import React from 'react';

interface AdvancedOptionsPanelProps {
  clothingStyle: string;
  onClothingStyleChange: (style: string) => void;
  clothingColor: string;
  onClothingColorChange: (color: string) => void;
}

const AdvancedOptionsPanel: React.FC<AdvancedOptionsPanelProps> = ({
  clothingStyle,
  onClothingStyleChange,
  clothingColor,
  onClothingColorChange,
}) => {
  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Étape 3: Personnalisez Votre Style</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="clothingStyle" className="font-medium text-gray-400">Style Vestimentaire</label>
          <input
            id="clothingStyle"
            type="text"
            value={clothingStyle}
            onChange={(e) => onClothingStyleChange(e.target.value)}
            placeholder="Ex: costume élégant, robe d'été..."
            className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="clothingColor" className="font-medium text-gray-400">Couleur Principale du Vêtement</label>
          <input
            id="clothingColor"
            type="text"
            value={clothingColor}
            onChange={(e) => onClothingColorChange(e.target.value)}
            placeholder="Ex: bleu marine, rose poudré..."
            className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
          />
        </div>
      </div>
    </div>
  );
};

export default AdvancedOptionsPanel;