import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GitHub, LinkedIn, WhatsApp } from '@mui/icons-material';
import { Box, CardMedia, Divider, Icon, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';

import { PersonService } from '../../shared/services/person/PersonService';
import { CityService } from '../../shared/services/city/CityService';
import PeopleIllustration from '../../assets/images/people2.svg';
import CityIllustration from '../../assets/images/city.svg';
import { CardDashboard } from './components/CardDashboard';
import { useDrawerContext } from '../../shared/contexts';
import BgWave from '../../assets/images/wave.svg';
import Logo from '../../assets/images/logo.png';

export const Dashboard = () => {
	const { toggleDrawerOpen } = useDrawerContext();
	const theme = useTheme();
	const xsDown = useMediaQuery(theme.breakpoints.down('xs'));
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	const navigate = useNavigate();

	const [cityTotalCount, setCityTotalCount] = useState(0);
	const [peopleTotalCount, setPeopleTotalCount] = useState(0);

	useEffect(() => {
		CityService.getAll(1, '')
			.then((response) => {
				if (response instanceof Error) {
					alert(response.message);
				} else {
					console.log(response.totalCount);
					setCityTotalCount(response.totalCount);
				}
			});

		PersonService.getAll(1, '')
			.then((response) => {
				if (response instanceof Error) {
					alert(response.message);
				} else {
					setPeopleTotalCount(response.totalCount);
				}
			});
	}, [cityTotalCount, peopleTotalCount]);

	return (
		<Box
			display='flex'
			flexDirection='column'
			height='100%'
			position='relative'
			sx={{
				backgroundImage: `url(${BgWave})`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: 'cover',
				backgroundPosition: 'center'
			}}
		>
			<Box
				padding={1}
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
					width={smDown ? '200px' : 'auto'}
					height='auto'
				>

					<CardMedia component="img" src={Logo} alt='logo_img' sx={{ width: '30px' }} />

					<Typography variant='caption'>My<Divider /></Typography>
					<Typography variant='caption'>- System<Divider /></Typography>
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
					handleClick={() => navigate('/pessoas')}
					title='Total de pessoas'
					description='Este é o numero total de pessoas que se encontram cadastradas no sistema'
					image={PeopleIllustration}
					alt='pessoa_img'
					totalCount={peopleTotalCount}
				/>
				<CardDashboard
					handleClick={() => navigate('/cidades')}
					title='Total de cidades'
					description='Este é o numero total de cidades que se encontram cadastradas no sistema'
					image={CityIllustration}
					alt='city_img'
					totalCount={cityTotalCount}
				/>
			</Box>
		</Box >
	);
};
