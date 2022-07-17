import { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Dashboard, DetalhesCidades, DetalhesPessoas, ListagemCidades, ListagemPessoas } from '../pages';
import { useDrawerContext } from '../shared/contexts';

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
				label: 'Cidades',
				icon: 'location_city',
				path: '/cidades'
			},
			{
				label: 'Pessoas',
				icon: 'person',
				path: '/pessoas'
			},
		]);
	}, []);

	return (
		<Routes>
			<Route path="/pagina-inicial" element={<Dashboard />} />

			<Route path="/pessoas" element={<ListagemPessoas />} />
			<Route path="/pessoas/detalhe/:id" element={<DetalhesPessoas />} />

			<Route path="/cidades" element={<ListagemCidades />} />
			<Route path="/cidades/detalhe/:id" element={<DetalhesCidades />} />




			<Route path="*" element={<Navigate to="/pagina-inicial" />} />
		</Routes>
	);
};
