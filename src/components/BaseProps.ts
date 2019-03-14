export interface BaseProps<T> {
    value: T;
    onChange: (value: T) => any;
}