import { errorOutput, SET_OUTPUT } from './action';

export const errorHandler =
	// @ts-expect-error
	({ dispatch }) =>
		// @ts-expect-error
		(next) =>
		// @ts-expect-error
		async (action) => {
			try {
				return await next(action);
			} catch (error) {
				// @ts-expect-error
				dispatch({ type: SET_OUTPUT, output: errorOutput(error) });
				throw error;
			}
		};
