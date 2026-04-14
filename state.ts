import {useSelector, TypedUseSelectorHook} from 'react-redux';

export type AppState = typeof initial;

export const enum OutputType {hidden, text, error}

export const initial = {
	initialized: false,
	platform: null as Office.PlatformType | null,
	output: {
		type: OutputType.hidden as OutputType,
		text: '',
		error: null as Error | null,
	},
	progress: {show: false, aborting: false, percent: 0.0},
};

export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
