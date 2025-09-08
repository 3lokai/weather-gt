// lib/i18n/index.ts
import en from './en';

export type Locale = 'en';
export type TranslationKey = keyof typeof en;

const translations = {
  en,
} as const;

export function t(key: string, params?: Record<string, string | number>): string {
  const keys = key.split('.');
  let value: any = translations.en;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  if (typeof value !== 'string') {
    console.warn(`Translation key "${key}" not found`);
    return key;
  }
  
  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
      return params[param]?.toString() || match;
    });
  }
  
  return value;
}

export function getTranslations(locale: Locale = 'en') {
  return translations[locale];
}
