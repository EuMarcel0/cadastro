import { Box, Icon, IconButton, Typography, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

import { useDrawerContext } from '../contexts';
import BgWave from '../../assets/images/wave.svg';

interface ILayoutBaseDePaginaProps {
	icon: ReactNode;
	title: string;
	toolbar: ReactNode | undefined;
	children: ReactNode;
	totalCount?: string;
	illustration?: React.ReactNode;
}

export const LayoutBaseDePagina: React.FC<ILayoutBaseDePaginaProps> = ({ children, icon, title, totalCount, toolbar, illustration }) => {
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	const { toggleDrawerOpen } = useDrawerContext();

	return (
		<Box
			height='100%'
			display='flex'
			flexDirection='column'
			gap={1}
			marginX={1}
		>
			<Box
				display='flex'
				alignItems='center'
				justifyContent='space-between'
				padding={1}
				height={theme.spacing(smDown ? 6 : mdDown ? 8 : 10)}
				gap={1}
			>
				<Box
					display='flex'
					alignItems='center'
					overflow='hidden'
					whiteSpace='nowrap'
					textOverflow='ellipsis'
				>
					{smDown &&
						<IconButton onClick={toggleDrawerOpen}>
							<Icon>menu</Icon>
						</IconButton>
					}
					<Icon>{icon}</Icon>
					<Typography
						overflow='hidden'
						whiteSpace='nowrap'
						textOverflow='ellipsis'
						variant={smDown ? 'h6' : mdDown ? 'h5' : 'h4'}
					>
						{title}
					</Typography>
				</Box>
				<Box
					height='100%'
					display='flex'
					alignItems='center'
				>
					<Typography>{totalCount}</Typography>
				</Box>
			</Box>
			{toolbar &&
				<Box>
					{toolbar}
				</Box>
			}
			<Box flex={1}>
				{children}
			</Box>
			<Box>
				{illustration}
			</Box>
		</Box>
	);
};
