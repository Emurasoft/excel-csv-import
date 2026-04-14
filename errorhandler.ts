import {errorOutput, SET_OUTPUT} from './action';

// @ts-expect-error
export const errorHandler = ({dispatch}) => next => async (action) => {
	try {
		return await next(action);
	} catch (error) {
		// @ts-expect-error
		dispatch({type: SET_OUTPUT, output: errorOutput(error)});
		throw error;
	}
};
