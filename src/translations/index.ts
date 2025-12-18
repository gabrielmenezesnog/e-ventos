import en from './en.json';
import ptBR from './pt-BR.json';

export const translations = {
  en,
  'pt-BR': ptBR,
};

export type TranslationKey = keyof typeof translations;
