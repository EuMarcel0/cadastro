import { useEffect, useState } from 'react';
import { Box, TextField, TextFieldProps } from '@mui/material';
import { useField } from '@unform/core';

type IUnformInputTextProps = TextFieldProps & {
	name: string;
}

export const UnformInputText: React.FC<IUnformInputTextProps> = ({ name, ...rest }) => {

	const { defaultValue, error, fieldName, registerField, clearError } = useField(name);
	const [value, setValue] = useState(defaultValue || '');

	useEffect(() => {
		registerField({
			name: fieldName,
			getValue: () => value,
			setValue: (_, newValue) => setValue(newValue),
		});
	}, [fieldName, value, registerField]);

	return (
		<Box sx={{ width: '100%' }} display='flex' justifyContent='center'>
			<TextField
				{...rest}
				value={value}
				onChange={(e) => { setValue(e.target.value); rest.onChange?.(e); }}
				onKeyDown={(e) => { error && clearError(); rest.onKeyDown?.(e); }}
				helperText={error}
				defaultValue={defaultValue}
				error={!!error}
				variant='outlined'
				sx={{ my: '10px', width: '80%' }}
			/>
		</Box>
	);
};
