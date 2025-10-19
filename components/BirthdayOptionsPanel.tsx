import React from 'react';
import { BirthdayScene } from '../types';

interface BirthdayOptionsPanelProps {
  age: string;
  onAgeChange: (age: string) => void;
  customText: string;
  onCustomTextChange: (text: string) => void;
  optionType: 'age' | 'text';
  onOptionTypeChange: (type: 'age' | 'text') => void;
  birthdayScene: BirthdayScene;
  onBirthdaySceneChange: (scene: BirthdayScene) => void;
}

const BirthdayOptionsPanel: React.FC<BirthdayOptionsPanelProps> = ({
  age,
  onAgeChange,
  customText,
  onCustomTextChange,
  optionType,
  onOptionTypeChange,
  birthdayScene,
  onBirthdaySceneChange
}) => {
  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-100">Options d'Anniversaire</h2>
      
      {/* Scene Selection */}
      <div className="mb-6">
        <label className="font-medium text-gray-300 block text-center mb-3">Choisissez la mise en scène :</label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {(['balloons', 'candle', 'studio', 'hall'] as BirthdayScene[]).map((scene) => (
            <button
              key={scene}
              onClick={() => onBirthdaySceneChange(scene)}
              className={`p-3 rounded-lg text-sm font-semibold transition-colors duration-200 ${birthdayScene === scene ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-300'}`}
            >
              {scene.charAt(0).toUpperCase() + scene.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Conditional options for balloons */}
      {birthdayScene === 'balloons' && (
        <div className="border-t border-gray-700 pt-6">
          <p className="text-center text-gray-400 mb-4">Personnalisez les ballons :</p>
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex gap-6 mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="optionType"
                  value="age"
                  checked={optionType === 'age'}
                  onChange={() => onOptionTypeChange('age')}
                  className="form-radio h-5 w-5 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                />
                <span className="text-gray-300 font-medium">Âge</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="optionType"
                  value="text"
                  checked={optionType === 'text'}
                  onChange={() => onOptionTypeChange('text')}
                  className="form-radio h-5 w-5 text-indigo-600 bg-gray-700 border-gray-600 focus:ring-indigo-500"
                />
                <span className="text-gray-300 font-medium">Texte</span>
              </label>
            </div>

            {optionType === 'age' ? (
              <div className="flex flex-col items-center gap-2">
                <label htmlFor="age" className="font-medium text-gray-400">Âge :</label>
                <input
                  id="age"
                  type="number"
                  value={age}
                  onChange={(e) => onAgeChange(e.target.value)}
                  min="1"
                  max="120"
                  className="bg-gray-700 border border-gray-600 text-white text-center rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-24 p-2.5"
                />
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <label htmlFor="customText" className="font-medium text-gray-400">Texte Personnalisé :</label>
                <input
                  id="customText"
                  type="text"
                  value={customText}
                  onChange={(e) => onCustomTextChange(e.target.value)}
                  maxLength={100}
                  placeholder="Ex: HAPPY B-DAY"
                  className="bg-gray-700 border border-gray-600 text-white text-center rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5"
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthdayOptionsPanel;
