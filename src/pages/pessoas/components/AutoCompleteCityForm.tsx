import { Autocomplete, Box, CircularProgress, TextField, useMediaQuery, useTheme } from '@mui/material';
import { useField } from '@unform/core';
import { useEffect, useMemo, useState } from 'react';
import { useDebounce } from '../../../shared/hooks';
import { CityService } from '../../../shared/services/city/CityService';

interface IAutoCompleteCityFormOptionsProps {
	id: number;
	label: string;
}

interface IAutoCompleteProps {
	externalLoading: boolean;
}

export const AutoCompleteCityForm: React.FC<IAutoCompleteProps> = ({ externalLoading = false }) => {

	const { clearError, defaultValue, error, fieldName, registerField } = useField('cityId');

	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

	const [options, setOptions] = useState<IAutoCompleteCityFormOptionsProps[]>([]);
	const [selectedId, setSelectedId] = useState<number | undefined>(defaultValue);
	const [isLoading, setIsLoading] = useState(false);
	const [search, setSearch] = useState('');
	const { debounce } = useDebounce();


	useEffect(() => {
		registerField({
			name: fieldName,
			getValue: () => selectedId,
			setValue: (_, newCitySelectedId) => setSelectedId(newCitySelectedId),
		});
	}, [registerField, fieldName, selectedId]);


	useEffect(() => {
		setIsLoading(true);
		debounce(() => {
			CityService.getAll(1, search)
				.then((response) => {
					setIsLoading(false);
					if (response instanceof Error) {
						alert(response.message);
					} else {
						setOptions(response.data.map(city => ({ id: city.id, label: city.name })));
					}
				});
		});
	}, [search]);

	const AutocompleteOption = useMemo(() => {
		if (!selectedId) return null;

		const selectedOption = options.find(option => option.id === selectedId);
		if (!selectedOption) return null;

		return selectedOption;
	}, [selectedId, options]);

	return (
		<Box sx={{ width: '100%' }} display='flex' justifyContent='center'>
			<Autocomplete
				options={options}

				openText='Abrir'
				closeText='Fechar'
				loadingText='Carregando...'
				noOptionsText='Sem opção'

				loading={isLoading}
				popupIcon={isLoading ? <CircularProgress size={20} /> : undefined}
				onInputChange={(_, newValue) => setSearch(newValue)}
				onChange={(_, newValue) => { setSelectedId(newValue?.id); setSearch(''); clearError(); }}
				value={AutocompleteOption}
				disabled={externalLoading}

				renderInput={(params) => <TextField
					{...params}
					label='Cidade'
					error={!!error}
					helperText={error}
				/>}
				sx={{ my: '10px', width: smDown ? '100%' : '80%', alignContent: 'center' }}
			/>
		</Box>
	);
};
