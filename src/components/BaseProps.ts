import i18next from 'i18next';

export interface BaseProps<T> extends TranslateFunction {
    value: T;
    onChange: (value: T) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface TranslateFunction {
    t: i18next.TFunction;
}