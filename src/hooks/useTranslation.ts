"use client";

import { useState, useEffect } from 'react';
import { translations, TranslationKey } from '@/translations';

export const useTranslation = () => {
  const [language, setLanguage] = useState<TranslationKey>('en');

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language.split('-')[0] as TranslationKey;

    // Check if the detected language is supported, otherwise fallback to English
    const supportedLanguages = Object.keys(translations) as TranslationKey[];
    const detectedLang = supportedLanguages.includes(browserLang) ? browserLang : 'en';

    setLanguage(detectedLang);
  }, []);

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return { t, language };
};
