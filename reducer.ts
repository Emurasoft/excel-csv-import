import {AppState, initial} from './state';
import {Action} from './action';

export function reducer(state: AppState = initial, action: Action): Partial<AppState> {
	switch (action.type) {
	case 'SET_INITIALIZED':
		return {...state, initialized: action.initialized};
	case 'SET_PLATFORM':
		return {...state, platform: action.platform};
	case 'SET_OUTPUT':
		return {...state, output: action.output};
	case 'SET_PROGRESS':
		return {...state, progress:  action.progress};
	}
	return state;
}