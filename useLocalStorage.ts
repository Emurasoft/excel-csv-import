import {Dispatch, useState} from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<T>] {
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (e) {
			console.warn(e);
			return initialValue;
		}
	});

	const setValue = value => {
		try {
			setStoredValue(value);
			window.localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			console.warn(e);
		}
	};

	return [storedValue, setValue];
}

export function namespacedUseLocalStorage(namespace: string): typeof useLocalStorage {
	return function (key: string, initialValue) {
		return useLocalStorage(namespace + '-' + key, initialValue);
	}
}