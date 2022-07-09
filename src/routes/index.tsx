import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ListagemPessoas } from '../pages/pessoas/ListagemPessoas';
import { useDrawerContext } from '../shared/contexts';
import { Dashboard, DetalhesPessoas } from '../pages';

export const AppRoutes = () => {
	const { setDrawerOptions } = useDrawerContext();

	useEffect(() => {
		setDrawerOptions([
			{
				label: 'Página inicial',
				icon: 'home',
				path: '/pagina-inicial'
			},
			{
				label: 'Pessoas',
				icon: 'person',
				path: '/pessoas'
			}
		]);
	}, []);

	return (
		<Routes>
			<Route path="/pagina-inicial" element={<Dashboard />} />
			<Route path="/pessoas" element={<ListagemPessoas />} />
			<Route path="/pessoas/detalhe/:id" element={<DetalhesPessoas />} />



			{/* <Route path="/clientes" element={<Button variant="contained" color='primary' onClick={toggleDrawerOpen}>Clientes</Button>} /> */}
			{/* <Route path="*" element={<Navigate to="/pagina-inicial"/>}/> */}
		</Routes>
	);
};
