import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// @ts-ignore
import en from './locale/en.json';
// @ts-ignore
import ja from './locale/ja.json';

const languageList = Object.freeze(['en', 'ja']);
const resources = {en, ja};

// noinspection JSIgnoredPromiseFromCall
i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: true,
        interpolation: {
            escapeValue: false,
        },
        resources,
        defaultNS: 'default',
    });

export {i18n, languageList};