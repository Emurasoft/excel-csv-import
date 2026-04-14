import {errorOutput, SET_OUTPUT} from './action';

// @ts-expect-ignore
export const errorHandler = ({dispatch}) => next => async (action) => {
	try {
		return await next(action);
	} catch (error) {
		// @ts-expect-ignore
		dispatch({type: SET_OUTPUT, output: errorOutput(error)});
		throw error;
	}
};
