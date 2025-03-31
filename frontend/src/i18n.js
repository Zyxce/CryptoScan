import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import en from './locales/en.json'
import ru from './locales/ru.json'

i18n
  .use(initReactI18next)
  .use(LanguageDetector) // Автоопределение языка
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    fallbackLng: 'en', // Язык по умолчанию
    interpolation: { escapeValue: false },
  })

export default i18n
