import { useEffect, useMemo, useState } from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Icon, IconButton, LinearProgress, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow, Typography } from '@mui/material';

import { IlistingCityProps, CityService } from '../../shared/services/city/CityService';
import { ConfirmModalDelete, FerramentasListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { useDebounce } from '../../shared/hooks';
import { Environment } from '../../shared/environment';


export const ListagemCidades: React.FC = () => {
	const [searchParams, setSearchParams] = useSearchParams('');
	const [people, setCity] = useState<IlistingCityProps[]>([]);
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
			CityService.getAll(page, search)
				.then((response) => {
					setLoading(false);
					if (response instanceof Error) {
						alert(response.message);
					} else {
						console.log(response.totalCount);
						console.log(response.data);
						setCity(response.data);
						setTotalCount(response.totalCount);
					}
				});
		});
	}, [search, page]);

	const handleDeleteCity = (id: number) => {
		CityService.deleteById(id)
			.then((response) => {
				if (response instanceof Error) {
					alert(response.message);
					return response;
				} else {
					setCity(oldCitys => [
						...oldCitys.filter(oldCity => oldCity.id !== id)
					]);
				}
			});
	};


	return (
		<LayoutBaseDePagina
			icon={<Typography><Icon>location_city</Icon></Typography>}
			title='Listagem de cidades'
			toolbar={<FerramentasListagem
				showInputSearch
				textButtonNew='Nova'
				textOfSearch={search}
				handleTextOfSearch={text => setSearchParams({ busca: text, pagina: '1' }, { replace: true })}
				handleInputClear={() => setSearchParams('')}
				onClickButtonNew={() => navigate('/cidades/detalhe/nova')}

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
								<TableRow >
									<TableCell>Nome completo</TableCell>
									<TableCell align='right'>Ações</TableCell>
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
									<TableCell>{item.name}</TableCell>
									<TableCell padding='none' align='right'>
										<Box display='flex' justifyContent='right'>
											<IconButton onClick={() => navigate(`/cidades/detalhe/${item.id}`)}>
												<Icon>edit</Icon>
											</IconButton>
											<ConfirmModalDelete onDelete={() => handleDeleteCity(item.id)} />
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
