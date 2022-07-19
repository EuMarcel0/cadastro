import { Box, Grid, Icon, IconButton, Paper, useMediaQuery, useTheme } from '@mui/material';
import { GitHub, LinkedIn, WhatsApp } from '@mui/icons-material';

import { CardDashboard } from './components/CardDashboard';
import { useDrawerContext } from '../../shared/contexts';
import Logo from '../../assets/images/logo.png';
import PeopleIllustration from '../../assets/images/people2.svg';
import CityIllustration from '../../assets/images/city.svg';

export const Dashboard = () => {
	const { toggleDrawerOpen } = useDrawerContext();
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	return (
		<Box
			display='flex'
			flexDirection='column'
			height='100%'
		>
			<Box
				padding={5}
				display='flex'
				justifyContent='space-between'
				alignItems='center'
				component={Paper}
				borderRadius='0'
				height='140px'
			>
				{smDown &&
					<IconButton onClick={toggleDrawerOpen}>
						<Icon>menu</Icon>
					</IconButton>
				}
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					width={smDown ? '40px' : '60px'}
					height='auto'
				>
					<img src={Logo} alt="logo_img" width='100%' />
				</Box>
				<Box
					width='100%'
					maxWidth='300px'
					display='flex'
					justifyContent='right'
				>
					<a href='https://github.com/EuMarcel0/' target='_blank' rel="noreferrer" >
						<IconButton>
							<GitHub fontSize='small' />
						</IconButton>
					</a>
					<a href='https://www.linkedin.com/in/marcelo-ribeiro-da-silva-aa444921b/' target='_blank' rel="noreferrer">
						<IconButton>
							<LinkedIn fontSize='small' />
						</IconButton>
					</a>
					<a href='https://api.whatsapp.com/send/?phone=5577991776299&text=Ol%C3%A1%2C+tudo+bem%3F&app_absent=0' target='_blank' rel="noreferrer">
						<IconButton>
							<WhatsApp fontSize='small' />
						</IconButton>
					</a>
				</Box>
			</Box>
			<Box
				width='100%'
				height='100%'
				display='flex'
				flexDirection={mdDown ? 'column' : 'row'}
				justifyContent='center'
				alignItems='center'
				padding={1}
				gap={4}
			>
				<CardDashboard
					title='Total de pessoas'
					description='Este é o numero total de pessoas que se encontram cadastradas no sistema'
					image={PeopleIllustration}
					alt='pessoa_img'
					totalCount={20}
				/>
				<CardDashboard
					title='Total de cidades'
					description='Este é o numero total de cidades que se encontram cadastradas no sistema'
					image={CityIllustration}
					alt='city_img'
					totalCount={30}
				/>
			</Box>
		</Box>
	);
};
