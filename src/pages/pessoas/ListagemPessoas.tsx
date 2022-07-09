import { useEffect, useMemo, useState } from 'react';

import { useSearchParams } from 'react-router-dom';
import { Box, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

import { IlistingPeopleProps, PersonService } from '../../shared/services/person/PersonService';
import { FerramentasListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';


export const ListagemPessoas: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams('');
	const [people, setPeople] = useState<IlistingPeopleProps[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const { debounce } = useDebounce(1000);

	const search = useMemo(() => {
		return searchParams.get('busca') || '';
	}, [searchParams]);

	useEffect(() => {
		debounce(() => {
			PersonService.getAll(1, search)
				.then((response) => {
					if (response instanceof Error) {
						alert(response.message);
					} else {
						console.log(response);
						setPeople(response.data);
						setTotalCount(response.totalCount);
					}
				});
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
			<Box component={Paper} elevation={6} width='auto'>
				<TableContainer>
					<Table>
						<TableHead>
							<TableRow>
								<TableCell>Nome completo</TableCell>
								<TableCell>E-mail</TableCell>
								<TableCell>Cód Cidade</TableCell>
								<TableCell>Ações</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{people.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.fullName}</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell>{item.cityId}</TableCell>
									<TableCell padding='none'>
										<Box display='flex'>
											<IconButton>
												<Icon>edit</Icon>
											</IconButton>
											<IconButton>
												<Icon>delete</Icon>
											</IconButton>
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</TableContainer>
			</Box>
		</LayoutBaseDePagina>
	);
};
