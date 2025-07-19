import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { getPublicPath } from "./utils/paths";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)

  .init({
    supportedLngs: ["en", "es"],
    fallbackLng: "en",
    debug: process.env.NODE_ENV === "development",
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: (lng: string, ns: string) => {
        return getPublicPath(`/locales/${lng}/${ns}.json`)
      },
    },
  });

export default i18n;
