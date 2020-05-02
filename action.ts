/* global Office */

import * as parser from './Parser';
import {AppState, OutputType} from './state';
import * as Redux from 'redux';

export type Action =
	SetInitialized
	| SetPlatform
	| SetOutput;

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

function errorOutput(error: Error): AppState['output'] {
	return {type: OutputType.error, text: '', error};
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