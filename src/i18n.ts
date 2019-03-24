import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import * as en from './locale/en.json';
import * as ja from './locale/ja.json';

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