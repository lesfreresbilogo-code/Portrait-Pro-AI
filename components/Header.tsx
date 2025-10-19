
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-6 md:py-8 text-center bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10 border-b border-gray-700/50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
          Portrait Pro AI
        </h1>
        <p className="mt-3 text-lg text-gray-400 max-w-2xl mx-auto">
          Propulsé par Nano Banana. Transformez votre photo en un portrait de qualité professionnelle en quelques secondes.
        </p>
      </div>
    </header>
  );
};

export default Header;
