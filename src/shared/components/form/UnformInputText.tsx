import { useEffect, useState } from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type IUnformInputTextProps = TextFieldProps & {
	name: string;
}

export const UnformInputText: React.FC<IUnformInputTextProps> = ({ name, ...rest }) => {

	const { defaultValue, error, fieldName, registerField } = useField(name);
	const [value, setValue] = useState(defaultValue || '');

	useEffect(() => {
		registerField({
			name: fieldName,
			getValue: () => value,
			setValue: (_, newValue) => setValue(newValue),
		});
	}, [fieldName, value, registerField]);

	return (
		<TextField
			{...rest}
			value={value}
			label='Digite...'
			onChange={(e) => setValue(e.target.value)}
			defaultValue={defaultValue}
			error={!!error}
		/>
	);
};
