/**
 * ============================================================
 *  مولّد تدرج الألوان التلقائي
 * ============================================================
 * يوخذ لون واحد (يختاره المستخدم من لوحة Sanity) ويولّد منه تدرج
 * كامل متوافق مع متغيرات CSS الموجودة في globals.css (من 50 الفاتح
 * جدًا إلى 950 الغامق جدًا)، بنفس الطريقة اللي مصممة فيها ألوان
 * "brand" الحالية للموقع.
 */

type RGB = { r: number; g: number; b: number };
type HSL = { h: number; s: number; l: number };

function hexToRgb(hex: string): RGB | null {
  const clean = hex.trim().replace(/^#/, "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  if (!/^[0-9a-fA-F]{6}$/.test(full)) return null;
  return {
    r: parseInt(full.slice(0, 2), 16),
    g: parseInt(full.slice(2, 4), 16),
    b: parseInt(full.slice(4, 6), 16),
  };
}

function rgbToHsl({ r, g, b }: RGB): HSL {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;
  const d = max - min;

  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1));
    switch (max) {
      case rn:
        h = ((gn - bn) / d) % 6;
        break;
      case gn:
        h = (bn - rn) / d + 2;
        break;
      default:
        h = (rn - gn) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }

  return { h, s: s * 100, l: l * 100 };
}

function hslToHex({ h, s, l }: HSL): string {
  const sn = s / 100;
  const ln = l / 100;
  const c = (1 - Math.abs(2 * ln - 1)) * sn;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = ln - c / 2;
  let r = 0;
  let g = 0;
  let b = 0;

  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];

  const toHex = (v: number) =>
    Math.round((v + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

/** درجات الإضاءة المستهدفة لكل وقفة في التدرج (0 غامق تمامًا، 100 فاتح تمامًا) */
const LIGHTNESS_STOPS: Record<string, number> = {
  "50": 95,
  "100": 89,
  "200": 78,
  "300": 65,
  "400": 52,
  "500": 42,
  "600": 34,
  "700": 27,
  "800": 21,
  "900": 15,
  "950": 9,
};

/** تعديل التشبّع حتى لا تصير الدرجات الفاتحة جدًا أو الغامقة جدًا صارخة */
const SATURATION_FACTOR: Record<string, number> = {
  "50": 0.45,
  "100": 0.55,
  "200": 0.7,
  "300": 0.82,
  "400": 0.92,
  "500": 1,
  "600": 1,
  "700": 0.96,
  "800": 0.92,
  "900": 0.88,
  "950": 0.82,
};

export const BRAND_SHADES = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
] as const;

/**
 * يولّد تدرج ألوان (خرائط hex) من لون واحد.
 * لو اللون غير صالح يرجع null، وتُستخدم القيم الافتراضية بدلًا منه.
 */
export function generateBrandScale(
  inputHex: string
): Record<(typeof BRAND_SHADES)[number], string> | null {
  const rgb = hexToRgb(inputHex);
  if (!rgb) return null;
  const { h, s } = rgbToHsl(rgb);

  const scale = {} as Record<(typeof BRAND_SHADES)[number], string>;
  for (const shade of BRAND_SHADES) {
    const l = LIGHTNESS_STOPS[shade];
    const satFactor = SATURATION_FACTOR[shade];
    scale[shade] = hslToHex({ h, s: Math.min(100, s * satFactor), l });
  }
  return scale;
}
