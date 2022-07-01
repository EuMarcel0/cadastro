import { Icon, Typography } from '@mui/material';

import { FerramentasDetalhes } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
	return (
		<LayoutBaseDePagina
			icon={<Typography><Icon>home</Icon></Typography>}
			title='Página inicial'
			toolbar={<FerramentasDetalhes
				showButtonSaveAndBack />}
		>
			Testando
		</LayoutBaseDePagina>
	);
};
