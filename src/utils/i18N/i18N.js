import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import translations from "./translation"

i18n
    .use(initReactI18next)
    .init({
        resources: translations,

        lng: "en",
        fallbackLng: "fa",

        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;