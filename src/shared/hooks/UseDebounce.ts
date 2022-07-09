import { useCallback, useRef, useState } from 'react';

export const useDebounce = (delay = 1500) => {

	const debouncing = useRef<number>();
	const isFirstTime = useRef(true);

	const debounce = useCallback((func: () => void) => {
		if(isFirstTime.current){
			isFirstTime.current = false;
			func();
		}else{
			if(debouncing.current){
				clearTimeout(debouncing.current);
			}
			debouncing.current = setTimeout( () => func(), delay);
		}
	}, [delay]);

	return {debounce};
};
