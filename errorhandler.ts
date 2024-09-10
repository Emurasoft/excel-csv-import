import {errorOutput, SET_OUTPUT} from './action';

export const errorHandler = ({dispatch}) => next => async (action) => {
	try {
		return await next(action);
	} catch (error) {
		dispatch({type: SET_OUTPUT, output: errorOutput(error)});
		throw error;
	}
};
