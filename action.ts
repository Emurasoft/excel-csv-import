/* global Office */

import * as parser from './Parser';
import * as Parser from './Parser';
import {AppState, OutputType} from './state';
import * as Redux from 'redux';
import {AbortFlag} from './AbortFlag';

export type Action =
	SetInitialized
	| SetPlatform
	| SetOutput
	| SetProgress;

type Dispatch = Redux.Dispatch<Action>;

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

function errorOutput(error: Error): AppState['output'] {
	return {type: OutputType.error, text: '', error};
}

export const SET_PROGRESS = 'SET_PROGRESS';

export interface SetProgress {
	type: typeof SET_PROGRESS;
	progress: AppState['progress'];
}

export interface ExtraArg {
}

// function errorMessage(err: Error): string {
// 	return err.toString() + '\n' + err.stack
// }

export const init = () => async (dispatch: Dispatch, _, {}: ExtraArg): Promise<void> => {
	try {
		const environmentInfo = await parser.init();
		dispatch({type: SET_PLATFORM, platform: environmentInfo.platform});
	} catch (e) {
		dispatch({type: SET_OUTPUT, output: errorOutput(e)});
	}

	dispatch({type: SET_INITIALIZED, initialized: true});
}

let abortFlag = new AbortFlag(); // TODO move into Parser

function setProgressCallback(dispatch: Dispatch): (percent: number) => void {
	return (percent) => {
		dispatch({type: SET_PROGRESS, progress: {show: true, aborting: false, percent}});
	}
}

export const importCSV = (options: Parser.ImportOptions) =>
	async (dispatch: Dispatch, _, {}: ExtraArg): Promise<void> => {
		dispatch({type: SET_PROGRESS, progress: {show: true, aborting: false, percent: 0.0}});

		abortFlag.abort();
		abortFlag = new AbortFlag();

		try { // TODO Error handler middleware
			const parseErrors = await Parser.importCSV(
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
		} catch(e) {
			dispatch({type: SET_OUTPUT, output: errorOutput(e)});
		}

		dispatch({type: SET_PROGRESS, progress: {show: false, aborting: false, percent: 1.0}});
	}