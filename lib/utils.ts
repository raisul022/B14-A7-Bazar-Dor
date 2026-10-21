export { cn } from "cn";

// ---------- BazarDor বাংলা utility functions ----------

const bengaliDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

// ইংরেজি সংখ্যা → বাংলা (যেমন: "123" → "১২৩")
export function toBengaliNumber(value: number | string): string {
  return String(value).replace(/[0-9]/g, (digit) => bengaliDigits[Number(digit)]);
}

// দাম কমা দিয়ে format + বাংলায় (যেমন: 1850 → "১,৮৫০")
export function formatPrice(value: number): string {
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
  }).format(value);
  return toBengaliNumber(formatted);
}

// unit বাংলায় (যেমন: "kg" → "প্রতি কেজি")
const unitMap: Record<string, string> = {
  kg: "কেজি",
  কেজি: "কেজি",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  লিটার: "লিটার",
  dozen: "ডজন",
  ডজন: "ডজন",
  piece: "পিস",
  pc: "পিস",
  পিস: "পিস",
  gram: "গ্রাম",
  g: "গ্রাম",
  গ্রাম: "গ্রাম",
  mon: "মণ",
  মণ: "মণ",
};

export function getUnitBn(unit?: string): string {
  if (!unit) return "প্রতি একক";
  const mapped = unitMap[unit.trim().toLowerCase()];
  return `প্রতি ${mapped ?? unit}`;
}

// আজকের তারিখ বাংলায় (যেমন: "বুধবার, ২১ অক্টোবর, ২০২৬")
const banglaDays = [
  "রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার",
  "বৃহস্পতিবার", "শুক্রবার", "শনিবার",
];

const banglaMonths = [
  "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
  "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
];

export function getBanglaDate(date: Date = new Date()): string {
  const dayName = banglaDays[date.getDay()];
  const day = toBengaliNumber(date.getDate());
  const month = banglaMonths[date.getMonth()];
  const year = toBengaliNumber(date.getFullYear());
  return `${dayName}, ${day} ${month}, ${year}`;
}