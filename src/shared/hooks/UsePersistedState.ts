import { SetStateAction } from 'react';
import { Dispatch, useEffect, useState } from 'react';

// type TProps<T>= [
// 	T,
// 	Dispatch<SetStateAction<T>>,
// ]

export const usePersistedState = (key: string, initialValue: any) => {
	const [ state, setState ] = useState(() => {
		const storageValueTheme =  localStorage.getItem(key);
		if(storageValueTheme){
			return JSON.parse(storageValueTheme);
		}
		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(state));
	}, [key, state]);

	return{state, setState};
};
