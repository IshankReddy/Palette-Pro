import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface ColorCardProps {
  color: string;
}

const ColorCard: React.FC<ColorCardProps> = ({ color }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(color);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const textColor = isLightColor(color) ? 'text-gray-900' : 'text-white';

  return (
    <div
      className="relative group aspect-square rounded-xl shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform"
      style={{ backgroundColor: color }}
      onClick={copyToClipboard}
    >
      <div className={`absolute inset-0 flex flex-col items-center justify-center ${textColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
        {copied ? (
          <Check className="w-6 h-6 mb-2" />
        ) : (
          <Copy className="w-6 h-6 mb-2" />
        )}
        <span className="font-mono text-sm">{color.toUpperCase()}</span>
      </div>
    </div>
  );
};

function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 128;
}

export default ColorCard;