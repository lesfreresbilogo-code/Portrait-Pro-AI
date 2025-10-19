import React, { useState, useCallback } from 'react';
import { Style, BirthdayScene } from './types';
import { STYLES } from './constants';
import { generatePortrait } from './services/geminiService';
import Header from './components/Header';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import AdvancedOptionsPanel from './components/AdvancedOptionsPanel';
import BirthdayOptionsPanel from './components/BirthdayOptionsPanel';
import ResultDisplay from './components/ResultDisplay';
import HistoryPanel from './components/HistoryPanel';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<{ file: File; base64: string } | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<Style | null>(null);
  
  // New state for advanced options
  const [clothingStyle, setClothingStyle] = useState<string>('');
  const [clothingColor, setClothingColor] = useState<string>('');
  
  // State for birthday-specific options
  const [age, setAge] = useState<string>('25');
  const [customText, setCustomText] = useState<string>('B-DAY');
  const [optionType, setOptionType] = useState<'age' | 'text'>('age');
  const [birthdayScene, setBirthdayScene] = useState<BirthdayScene>('balloons');

  // Generation result and history
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File, base64: string) => {
    setUploadedImage({ file, base64 });
    handleResetFlow();
  };

  const handleStyleSelect = (style: Style) => {
    setSelectedStyle(style);
    setGeneratedImage(null);
    setError(null);
  };
  
  const handleResetFlow = () => {
    setSelectedStyle(null);
    setGeneratedImage(null);
    setError(null);
    setIsLoading(false);
    setClothingStyle('');
    setClothingColor('');
  };

  const handleStartOver = () => {
    setUploadedImage(null);
    setHistory([]);
    handleResetFlow();
  };


  const handleGenerateClick = useCallback(async () => {
    if (!uploadedImage || !selectedStyle) {
      setError('Please upload an image and select a style.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const options = {
        clothingStyle,
        clothingColor,
        birthdayScene,
        ...(selectedStyle.id === 'birthday' && optionType === 'age' && { age }),
        ...(selectedStyle.id === 'birthday' && optionType === 'text' && { text: customText }),
      };
      
      const resultBase64 = await generatePortrait(uploadedImage.file, selectedStyle, options);
      const fullImageSrc = `data:image/png;base64,${resultBase64}`;
      setGeneratedImage(fullImageSrc);
      setHistory(prev => [fullImageSrc, ...prev]);

    } catch (err) {
      console.error(err);
      setError('Failed to generate portrait. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [uploadedImage, selectedStyle, age, customText, optionType, clothingStyle, clothingColor, birthdayScene]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto flex flex-col gap-10 md:gap-12">
          
          {!generatedImage && !isLoading && (
            <>
              <ImageUploader onImageUpload={handleImageUpload} uploadedImage={uploadedImage?.base64 || null} />

              {uploadedImage && (
                <StyleSelector 
                  styles={STYLES} 
                  selectedStyle={selectedStyle} 
                  onStyleSelect={handleStyleSelect} 
                />
              )}

              {selectedStyle && (
                <AdvancedOptionsPanel
                  clothingStyle={clothingStyle}
                  onClothingStyleChange={setClothingStyle}
                  clothingColor={clothingColor}
                  onClothingColorChange={setClothingColor}
                />
              )}

              {selectedStyle?.id === 'birthday' && (
                <BirthdayOptionsPanel
                  age={age} 
                  onAgeChange={setAge}
                  customText={customText}
                  onCustomTextChange={setCustomText}
                  optionType={optionType}
                  onOptionTypeChange={setOptionType}
                  birthdayScene={birthdayScene}
                  onBirthdaySceneChange={setBirthdayScene}
                />
              )}

              {uploadedImage && selectedStyle && (
                <div className="text-center">
                  <button
                    onClick={handleGenerateClick}
                    disabled={isLoading}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    Generate Portrait
                  </button>
                </div>
              )}
            </>
          )}

          <ResultDisplay
            isLoading={isLoading}
            generatedImage={generatedImage}
            error={error}
            onReset={handleResetFlow}
          />
          
          {history.length > 0 && (
             <HistoryPanel history={history} onStartOver={handleStartOver} />
          )}

        </div>
      </main>
      <Footer />
    </div>
  );
};

export default App;