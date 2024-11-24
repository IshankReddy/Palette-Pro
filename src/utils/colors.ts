interface HSL {
  h: number;
  s: number;
  l: number;
}

function hslToHex({ h, s, l }: HSL): string {
  l /= 100;
  const a = s * Math.min(l, 1 - l) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color).toString(16).padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hexToHSL(hex: string): HSL {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) throw new Error('Invalid hex color');
  
  let r = parseInt(result[1], 16) / 255;
  let g = parseInt(result[2], 16) / 255;
  let b = parseInt(result[3], 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100)
  };
}

// Enhanced color palette generators
function generateAnalogousPalette(baseHue: number): string[] {
  const angles = [0, 30, 60, -30, -60];
  return angles.map(angle => hslToHex({
    h: (baseHue + angle + 360) % 360,
    s: 45 + Math.random() * 30,
    l: 40 + Math.random() * 30
  }));
}

function generateMonochromaticPalette(baseHue: number): string[] {
  return Array.from({ length: 5 }, (_, i) => hslToHex({
    h: baseHue,
    s: 65 + Math.random() * 20,
    l: 20 + (i * 15)
  }));
}

function generateComplementaryPalette(baseHue: number): string[] {
  const complementHue = (baseHue + 180) % 360;
  return [
    hslToHex({ h: baseHue, s: 70, l: 60 }),
    hslToHex({ h: baseHue, s: 60, l: 40 }),
    hslToHex({ h: baseHue, s: 80, l: 50 }),
    hslToHex({ h: complementHue, s: 70, l: 50 }),
    hslToHex({ h: complementHue, s: 60, l: 60 })
  ];
}

function generateTriadicPalette(baseHue: number): string[] {
  const hues = [baseHue, (baseHue + 120) % 360, (baseHue + 240) % 360];
  return [
    hslToHex({ h: hues[0], s: 70, l: 60 }),
    hslToHex({ h: hues[1], s: 70, l: 50 }),
    hslToHex({ h: hues[2], s: 70, l: 50 }),
    hslToHex({ h: hues[0], s: 60, l: 40 }),
    hslToHex({ h: hues[1], s: 60, l: 40 })
  ];
}

function generateSplitComplementaryPalette(baseHue: number): string[] {
  const hue2 = (baseHue + 150) % 360;
  const hue3 = (baseHue + 210) % 360;
  return [
    hslToHex({ h: baseHue, s: 70, l: 50 }),
    hslToHex({ h: baseHue, s: 60, l: 70 }),
    hslToHex({ h: hue2, s: 70, l: 50 }),
    hslToHex({ h: hue3, s: 70, l: 50 }),
    hslToHex({ h: baseHue, s: 80, l: 30 })
  ];
}

function generateTetradicPalette(baseHue: number): string[] {
  const hues = [
    baseHue,
    (baseHue + 90) % 360,
    (baseHue + 180) % 360,
    (baseHue + 270) % 360
  ];
  return [
    hslToHex({ h: hues[0], s: 70, l: 50 }),
    hslToHex({ h: hues[1], s: 70, l: 50 }),
    hslToHex({ h: hues[2], s: 70, l: 50 }),
    hslToHex({ h: hues[3], s: 70, l: 50 }),
    hslToHex({ h: hues[0], s: 70, l: 70 })
  ];
}

function generateSquarePalette(baseHue: number): string[] {
  const hues = [
    baseHue,
    (baseHue + 90) % 360,
    (baseHue + 180) % 360,
    (baseHue + 270) % 360
  ];
  return [
    hslToHex({ h: hues[0], s: 70, l: 50 }),
    hslToHex({ h: hues[1], s: 70, l: 50 }),
    hslToHex({ h: hues[2], s: 70, l: 50 }),
    hslToHex({ h: hues[3], s: 70, l: 50 }),
    hslToHex({ h: hues[0], s: 60, l: 70 })
  ];
}

function generateCompoundPalette(baseHue: number): string[] {
  const hue2 = (baseHue + 30) % 360;
  const complement = (baseHue + 180) % 360;
  const complementPlus = (complement + 30) % 360;
  return [
    hslToHex({ h: baseHue, s: 70, l: 50 }),
    hslToHex({ h: hue2, s: 70, l: 50 }),
    hslToHex({ h: complement, s: 70, l: 50 }),
    hslToHex({ h: complementPlus, s: 70, l: 50 }),
    hslToHex({ h: baseHue, s: 70, l: 70 })
  ];
}

function generateShadesPalette(baseHue: number): string[] {
  return Array.from({ length: 5 }, (_, i) => hslToHex({
    h: baseHue,
    s: 80,
    l: 20 + (i * 15)
  }));
}

function generatePastelPalette(baseHue: number): string[] {
  const hues = [
    baseHue,
    (baseHue + 72) % 360,
    (baseHue + 144) % 360,
    (baseHue + 216) % 360,
    (baseHue + 288) % 360
  ];
  return hues.map(h => hslToHex({
    h,
    s: 25 + Math.random() * 20,
    l: 80 + Math.random() * 10
  }));
}

function generateVibrantPalette(baseHue: number): string[] {
  const hues = [
    baseHue,
    (baseHue + 72) % 360,
    (baseHue + 144) % 360,
    (baseHue + 216) % 360,
    (baseHue + 288) % 360
  ];
  return hues.map(h => hslToHex({
    h,
    s: 85 + Math.random() * 15,
    l: 45 + Math.random() * 15
  }));
}

export function generatePalette(): string[] {
  const baseHue = Math.floor(Math.random() * 360);
  const paletteTypes = [
    generateAnalogousPalette,
    generateMonochromaticPalette,
    generateComplementaryPalette,
    generateTriadicPalette,
    generateSplitComplementaryPalette,
    generateTetradicPalette,
    generateSquarePalette,
    generateCompoundPalette,
    generateShadesPalette,
    generatePastelPalette,
    generateVibrantPalette
  ];
  
  const selectedType = paletteTypes[Math.floor(Math.random() * paletteTypes.length)];
  return selectedType(baseHue);
}