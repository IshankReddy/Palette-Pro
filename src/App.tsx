import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Heart, Github } from 'lucide-react';
import { generatePalette } from './utils/colors';
import ColorCard from './components/ColorCard';
import { useFavorites } from './hooks/useFavorites';
import FavoritePalettes from './components/FavoritePalettes';

function App() {
  const [currentPalette, setCurrentPalette] = useState<string[]>([]);
  const [showFavorites, setShowFavorites] = useState(false);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const generateNewPalette = () => {
    setCurrentPalette(generatePalette());
  };

  useEffect(() => {
    generateNewPalette();

    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.code === 'Space' && !showFavorites) {
        event.preventDefault();
        generateNewPalette();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showFavorites]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Palette Pro
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFavorites(!showFavorites)}
                className="flex items-center space-x-1 text-gray-600 hover:text-pink-600 transition-colors"
              >
                <Heart className={`w-5 h-5 ${showFavorites ? 'fill-pink-600 text-pink-600' : ''}`} />
                <span className="hidden sm:inline">Favorites</span>
              </button>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showFavorites ? (
          <FavoritePalettes favorites={favorites} onClose={() => setShowFavorites(false)} />
        ) : (
          <>
            <div className="flex justify-center mb-8 space-x-4">
              <button
                onClick={generateNewPalette}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Generate New Palette</span>
              </button>
              <button
                onClick={() => toggleFavorite(currentPalette)}
                className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors"
              >
                <Heart
                  className={`w-4 h-4 ${
                    isFavorite(currentPalette) ? 'fill-pink-600 text-pink-600' : ''
                  }`}
                />
                <span>{isFavorite(currentPalette) ? 'Saved' : 'Save Palette'}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {currentPalette.map((color, index) => (
                <ColorCard key={index} color={color} />
              ))}
            </div>

            <div className="mt-8 text-center text-gray-600">
              <p className="flex items-center justify-center space-x-2">
                <span>Press</span>
                <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-sm">
                  Space
                </kbd>
                <span>to generate a new palette</span>
              </p>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default App;