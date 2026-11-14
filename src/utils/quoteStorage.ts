export interface SavedQuoteRecord {
  reference: string;
  submittedAt: string;
  products: string[];
  industry: string;
  quantityOrArea: string;
  timeline: string;
  scopeOptions: string[];
  requirements: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  cityPostal: string;
}

const COMPARE_KEY = 'apexrack_compare_slugs';
const QUOTE_ITEMS_KEY = 'apexrack_quote_items';
const LAST_QUOTE_KEY = 'apexrack_last_quote';

export function loadCompareSlugs(): string[] {
  try {
    const raw = localStorage.getItem(COMPARE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

export function saveCompareSlugs(slugs: string[]): void {
  try {
    localStorage.setItem(COMPARE_KEY, JSON.stringify(slugs));
  } catch {
    // ignore storage quota errors
  }
}

export function loadQuoteItems(): string[] {
  try {
    const raw = localStorage.getItem(QUOTE_ITEMS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((s) => typeof s === 'string') : [];
  } catch {
    return [];
  }
}

export function saveQuoteItems(items: string[]): void {
  try {
    localStorage.setItem(QUOTE_ITEMS_KEY, JSON.stringify(items));
  } catch {
    // ignore
  }
}

export function loadLastQuote(): SavedQuoteRecord | null {
  try {
    const raw = localStorage.getItem(LAST_QUOTE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SavedQuoteRecord;
  } catch {
    return null;
  }
}

export function saveLastQuote(record: SavedQuoteRecord): void {
  try {
    localStorage.setItem(LAST_QUOTE_KEY, JSON.stringify(record));
  } catch {
    // ignore
  }
}

export function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
