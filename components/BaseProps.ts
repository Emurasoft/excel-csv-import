export interface BaseProps<T> {
	value: T;
	onChange: (value: T) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}