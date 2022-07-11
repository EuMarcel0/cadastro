import { useEffect, useState } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
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
		console.log(value);
	}, [fieldName, value, registerField]);

	return (
		<Box>
			<TextField
				{...rest}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				defaultValue={defaultValue}
				error={!!error}
				variant='outlined'
				sx={{ my: '10px' }}
			/>
		</Box>
	);
};
