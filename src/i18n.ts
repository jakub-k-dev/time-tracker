import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-locize-backend";
import { initReactI18next } from "react-i18next";

import translationEN from "./translations/en.json";

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(Backend)
  .init({
    fallbackLng: "en",
    resources: { en: { translation: translationEN } },
    backend: {
      projectId: "8b6b8e0b-1892-4c06-8034-b9abffc1ba2e",
      apiKey: "42705d6b-5b6f-4a4b-b6e5-e4ba99f4b1b8",
    },
    saveMissing: true,
    interpolation: {
      escapeValue: false,
    },
  });
