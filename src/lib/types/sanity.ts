export interface SanityDocument {
  _id: string;
  _type: string;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

export interface SanityReference {
  _ref: string;
  _type: "reference";
  _weak?: boolean;
}

export interface SanityImage {
  _type: "image";
  asset: SanityReference;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}

interface SanityColorRgba {
  _type: "rgbaColor";
  r: number;
  g: number;
  b: number;
  a: number;
}

interface SanityColorHsla {
  _type: "hslaColor";
  h: number;
  s: number;
  l: number;
  a: number;
}

interface SanityColorHsva {
  _type: "hsvaColor";
  h: number;
  s: number;
  v: number;
  a: number;
}

export interface SanityColor {
  _type: "color";
  hex: string;
  alpha: number;
  rgb: SanityColorRgba;
  hsl: SanityColorHsla;
  hsv: SanityColorHsva;
}
