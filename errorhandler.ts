import {Dispatch, errorOutput, SET_OUTPUT} from './action';

// @ts-ignore
export const errorHandler = ({dispatch}) => next => async (action) => {
	try {
		return await next(action);
	} catch (error) {
// @ts-ignore
		dispatch({type: SET_OUTPUT, output: errorOutput(error)});
		throw error;
	}
};
