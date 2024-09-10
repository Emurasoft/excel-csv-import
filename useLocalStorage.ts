import { Dispatch, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<T>] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		let value: T = initialValue;
		try {
			const item = window.localStorage.getItem(key);
			if (item) {
				value = JSON.parse(item);
			}
		}
		catch (e) {
			console.warn(e);
		}
		return value;
	});

	const setValue = (value) => {
		setStoredValue(value);
		try {
			window.localStorage.setItem(key, JSON.stringify(value));
		}
		catch (e) {
			console.warn(e);
		}
	};

	return [storedValue, setValue];
}

export function namespacedUseLocalStorage(namespace: string): typeof useLocalStorage {
	return function (key: string, initialValue) {
		return useLocalStorage(namespace + '-' + key, initialValue);
	};
}
