import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as en from './locale/en.json';

// noinspection JSIgnoredPromiseFromCall
i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources: {
            en: en,
        },
        defaultNS: 'default',
    });

export default i18n;