import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';

import { IlistingPeopleProps, PersonService } from '../../shared/services/person/PersonService';
import { ConfirmModal, FerramentasListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';


export const ListagemPessoas: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams('');
	const [people, setPeople] = useState<IlistingPeopleProps[]>([]);
	const [totalCount, setTotalCount] = useState(0);
	const { debounce } = useDebounce(1000);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	const search = useMemo(() => {
		return searchParams.get('busca') || '';
	}, [searchParams]);

	const page = useMemo(() => {
		return Number(searchParams.get('pagina') || '1');
	}, [searchParams]);

	useEffect(() => {
		setLoading(true);
		debounce(() => {
			PersonService.getAll(page, search)
				.then((response) => {
					setLoading(false);
					if (response instanceof Error) {
						alert(response.message);
					} else {
						console.log(response.totalCount);
						console.log(response.data);
						setPeople(response.data);
						setTotalCount(response.totalCount);
					}
				});
		});
	}, [search, page]);

	const handleDeletePeople = (id: number) => {
		PersonService.deleteById(id)
			.then((response) => {
				if (response instanceof Error) {
					alert(response.message);
				}
			});
		window.location.reload();
	};


	return (
		<LayoutBaseDePagina
			icon={<Typography><Icon>people</Icon></Typography>}
			title='Listagem de pessoas'
			totalCount={`Total de registros encontrados: ${totalCount}`}
			toolbar={<FerramentasListagem
				showInputSearch
				textButtonNew='Nova'
				textOfSearch={search}
				handleTextOfSearch={text => setSearchParams({ busca: text, pagina: '1' }, { replace: true })}
				handleInputClear={() => setSearchParams('')}
				onClickButtonNew={() => navigate('/pessoas/detalhe/nova')}

			/>
			}

		>
			<Box component={Paper} elevation={6} width='auto'>
				<TableContainer>
					{loading &&
						<LinearProgress />
					}
					<Table>
						{people.length > 0 &&
							<TableHead>
								<TableRow>
									<TableCell>Nome completo</TableCell>
									<TableCell>E-mail</TableCell>
									<TableCell>Ações</TableCell>
								</TableRow>
							</TableHead>
						}
						{!loading && totalCount === 0 &&
							<TableRow>
								<TableCell>{Environment.LISTING_EMPTY}</TableCell>
							</TableRow>
						}
						<TableBody>
							{people.map((item) => (
								<TableRow key={item.id}>
									<TableCell>{item.fullName}</TableCell>
									<TableCell>{item.email}</TableCell>
									<TableCell padding='none'>
										<Box display='flex'>
											<IconButton onClick={() => navigate(`/pessoas/detalhe/${item.id}`)}>
												<Icon>edit</Icon>
											</IconButton>
											<ConfirmModal handleDelete={() => handleDeletePeople(item.id)} />
										</Box>
									</TableCell>
								</TableRow>
							))}
						</TableBody>
						<TableFooter>
							{totalCount > 0 && totalCount > Environment.LIMIT_OF_ROWS_PER_PAGE &&
								<TableRow>
									<TableCell colSpan={3}>
										<Pagination
											page={page}
											count={Math.ceil(totalCount / Environment.LIMIT_OF_ROWS_PER_PAGE)}
											onChange={(_, newPage) => setSearchParams({ pagina: newPage.toString() }, { replace: true })}
										/>
									</TableCell>
								</TableRow>
							}
						</TableFooter>
					</Table>
				</TableContainer>
			</Box>
		</LayoutBaseDePagina>
	);
};
