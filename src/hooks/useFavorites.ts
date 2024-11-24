import { useState, useEffect } from 'react';

const STORAGE_KEY = 'palette-favorites';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[][]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setFavorites(JSON.parse(stored));
    }
  }, []);

  const toggleFavorite = (palette: string[]) => {
    setFavorites(prev => {
      const paletteStr = JSON.stringify(palette);
      const exists = prev.some(p => JSON.stringify(p) === paletteStr);
      
      let newFavorites;
      if (exists) {
        newFavorites = prev.filter(p => JSON.stringify(p) !== paletteStr);
      } else {
        newFavorites = [...prev, palette];
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (palette: string[]) => {
    return favorites.some(p => JSON.stringify(p) === JSON.stringify(palette));
  };

  return { favorites, toggleFavorite, isFavorite };
}