import { useEffect, useState } from 'react';
import { Box, TextField, TextFieldProps, useMediaQuery, useTheme } from '@mui/material';
import { useField } from '@unform/core';

type IUnformInputTextProps = TextFieldProps & {
	name: string;
}

export const UnformInputText: React.FC<IUnformInputTextProps> = ({ name, ...rest }) => {

	const { defaultValue, error, fieldName, registerField, clearError } = useField(name);
	const [value, setValue] = useState(defaultValue || '');
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
				sx={{ my: '10px', width: smDown ? '100%' : '80%' }}
			/>
		</Box>
	);
};
