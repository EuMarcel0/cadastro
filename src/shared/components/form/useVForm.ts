import { FormHandles } from '@unform/core';
import { useRef } from 'react';

export const useVForm = () => {
	const unformRef = useRef<FormHandles>(null);

	return{unformRef};
};
