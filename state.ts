export type AppState = typeof initial;

export const enum OutputType {hidden, text, error}

export const initial = {
	initialized: false,
	platform: Office.PlatformType.OfficeOnline,
	output: {
		type: OutputType.hidden,
		text: '',
		error: null as Error,
	},
	progress: {show: false, aborting: false, percent: 0.0},
};