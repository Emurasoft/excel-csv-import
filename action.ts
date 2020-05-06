import {CsvStringAndName, ExportOptions, ImportOptions, Parser} from './parser';
import {AppState, OutputType} from './state';
import {AbortFlag} from './AbortFlag';
import {ThunkDispatch} from 'redux-thunk';

export type Action =
	SetInitialized
	| SetPlatform
	| SetOutput
	| SetProgress;

export const SET_INITIALIZED = 'SET_INITIALIZED';

export interface SetInitialized {
	type: typeof SET_INITIALIZED;
	initialized: AppState['initialized'];
}

export const SET_PLATFORM = 'SET_PLATFORM';

export interface SetPlatform {
	type: typeof SET_PLATFORM;
	platform: AppState['platform'];
}

export const SET_OUTPUT = 'SET_OUTPUT';

export interface SetOutput {
	type: typeof SET_OUTPUT;
	output: AppState['output'];
}

function textOutput(text: string): AppState['output'] {
	return {type: OutputType.text, text, error: null};
}

export function errorOutput(error: Error): AppState['output'] {
	return {type: OutputType.error, text: '', error};
}

export const SET_PROGRESS = 'SET_PROGRESS';

export interface SetProgress {
	type: typeof SET_PROGRESS;
	progress: AppState['progress'];
}

export interface ExtraArg {
	parser: Parser;
}

export type Dispatch = ThunkDispatch<AppState, ExtraArg, Action>;

type GetState = () => AppState;

export const init = () => async (dispatch: Dispatch, _, {parser}: ExtraArg): Promise<void> => {
	const environmentInfo = await parser.init();
	dispatch({
		type: SET_PLATFORM,
		platform: environmentInfo.platform,
	});

	dispatch({
		type: SET_INITIALIZED,
		initialized: true,
	});
}

let abortFlag = new AbortFlag(); // TODO move into Parser

function setProgressCallback(dispatch: Dispatch): (percent: number) => void {
	return (percent) => {
		dispatch({
			type: SET_PROGRESS,
			progress: {show: true, aborting: false, percent},
		});
	}
}

export const importCSV = (options: ImportOptions) =>
	async (dispatch: Dispatch, _, {parser}: ExtraArg): Promise<void> => {
		dispatch({
			type: SET_PROGRESS,
			progress: {show: true, aborting: false, percent: 0.0},
		});

		abortFlag.abort();
		abortFlag = new AbortFlag();

		const parseErrors = await parser.importCSV(
			options,
			setProgressCallback(dispatch),
			abortFlag,
		);
		if (parseErrors.length > 0) {
			dispatch({
				type: SET_OUTPUT,
				output: textOutput(JSON.stringify(parseErrors)),
			});
		}

		dispatch({
			type: SET_PROGRESS,
			progress: {show: false, aborting: false, percent: 1.0},
		});
	}

export const exportCSV = (options: ExportOptions) =>
	async (dispatch: Dispatch, _, {parser}: ExtraArg): Promise<CsvStringAndName|null> => {
		dispatch({
			type: SET_PROGRESS,
			progress: {show: true, aborting: false, percent: 0.0},
		});

		abortFlag.abort();
		abortFlag = new AbortFlag();

		const result = await parser.csvStringAndName(
			options,
			setProgressCallback(dispatch),
			abortFlag,
		);

		dispatch({
			type: SET_PROGRESS,
			progress: {show: false, aborting: false, percent: 1.0},
		});
		return result;
	}

export const abort = () =>
	async (dispatch: Dispatch, getState: GetState): Promise<void> => {
		abortFlag.abort();
		const {progress} = getState();
		dispatch({
			type: SET_PROGRESS,
			progress: {show: progress.show, aborting: true, percent: progress.percent},
		});
	}