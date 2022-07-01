import { useEffect, useMemo } from 'react';

import { useSearchParams } from 'react-router-dom';
import { Icon, Typography } from '@mui/material';

import { PersonService } from '../../shared/services/person/PersonService';
import { FerramentasListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const ListagemPessoas: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams('');

	const search = useMemo(() => {
		return searchParams.get('busca') || '';
	}, [searchParams]);

	useEffect(() => {
		PersonService.getAll(1, search)
			.then((response) => {
				if (response instanceof Error) {
					alert(response.message);
				} else {
					console.log(response);
				}
			});
	}, [search]);

	return (
		<LayoutBaseDePagina
			icon={<Typography><Icon>people</Icon></Typography>}
			title='Listagem de pessoas'
			toolbar={<FerramentasListagem
				showInputSearch
				textButtonNew='Nova'
				textOfSearch={search}
				handleTextOfSearch={text => setSearchParams({ busca: text }, { replace: true })}
				handleInputClear={() => setSearchParams('')}
			/>
			}

		>
		</LayoutBaseDePagina>
	);
};
