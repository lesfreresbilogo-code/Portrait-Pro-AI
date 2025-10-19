import React from 'react';

interface ResultDisplayProps {
  isLoading: boolean;
  generatedImage: string | null;
  error: string | null;
  onReset: () => void;
}

const LoadingSpinner: React.FC = () => (
  <div className="flex flex-col items-center justify-center space-y-4">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
    <p className="text-lg text-gray-300">Génération de votre portrait...</p>
    <p className="text-sm text-gray-500">Cela peut prendre un moment. L'IA travaille sa magie !</p>
  </div>
);

const ResultDisplay: React.FC<ResultDisplayProps> = ({ isLoading, generatedImage, error, onReset }) => {
  if (!isLoading && !generatedImage && !error) {
    return null;
  }
  
  const downloadImage = () => {
    if(!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'portrait-pro-ai.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700 min-h-[300px] flex items-center justify-center">
      {isLoading && <LoadingSpinner />}
      {error && !isLoading && (
        <div className="text-center text-red-400">
          <p className="font-bold text-lg">Oops! Une erreur est survenue.</p>
          <p>{error}</p>
          <button
            onClick={onReset}
            className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition-colors"
          >
            Réessayer
          </button>
        </div>
      )}
      {generatedImage && !isLoading && (
        <div className="text-center w-full">
          <h2 className="text-3xl font-bold mb-6 text-gray-100">Votre Portrait est Prêt !</h2>
          <img 
            src={generatedImage} 
            alt="Generated Portrait" 
            className="max-w-full max-h-[512px] h-auto object-contain rounded-lg mx-auto shadow-2xl shadow-black/50"
          />
          <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={downloadImage}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
            >
              Télécharger
            </button>
            <button
              onClick={onReset}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-colors duration-300"
            >
              Continuer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;