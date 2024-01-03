import i18n from 'i18next';
import translationDA from './locales/da/translation.json';

i18n.init({
    resources: {
        da: {
            translation: translationDA,
        },
    },
    fallbackLng: 'en',
    interpolation: {
        escapeValue: false, // React already escapes variables
    },
});

export default i18n;
