import { useEffect, useState } from 'react';

interface IUsePersistedStateProps{
	key: string;
	initialValue: 'light' | 'dark';
}

export const usePersistedState = ({key, initialValue} : IUsePersistedStateProps) => {
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
