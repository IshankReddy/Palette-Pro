import React from 'react';
import { X } from 'lucide-react';

interface FavoritePalettesProps {
  favorites: string[][];
  onClose: () => void;
}

const FavoritePalettes: React.FC<FavoritePalettesProps> = ({ favorites, onClose }) => {
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Saved Palettes</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500">No saved palettes yet.</p>
          <p className="text-gray-400 text-sm mt-2">
            Generate some palettes and click the heart icon to save them!
          </p>
        </div>
      ) : (
        <div className="grid gap-8">
          {favorites.map((palette, index) => (
            <div key={index} className="grid grid-cols-5 gap-2 h-20 rounded-lg overflow-hidden">
              {palette.map((color, colorIndex) => (
                <div
                  key={colorIndex}
                  className="h-full"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritePalettes;