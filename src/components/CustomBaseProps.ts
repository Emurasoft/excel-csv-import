export interface CustomBaseProps<T> {
    value: T;
    onChange: (value: T) => any;
}