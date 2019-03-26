import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
// @ts-ignore
import en from './locale/en.json';
// @ts-ignore
import blank from './locale/blank.json';
// @ts-ignore
import ja from './locale/ja.json';

const languageList = Object.freeze(['en', 'blank', 'ja']);
const resources = {en, blank, ja};

// noinspection JSIgnoredPromiseFromCall
i18n
    .use(initReactI18next)
    .init({
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        resources,
        nsSeparator: '::',
        keySeparator: '..',
        react: {
            // @ts-ignore
            transSupportBasicHtmlNodes: true,
            // @ts-ignore
            transKeepBasicHtmlNodesFor: ['br'],
        },
    });

export {i18n, languageList};