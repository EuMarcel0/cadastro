import { useState } from 'react';

import { Box, CardMedia, Divider, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Brightness4 } from '@mui/icons-material';

import { useAppThemeContext, useAuthContex } from '../../shared/contexts';
import Banner from '../../assets/images/login.svg';
import { SideForm } from './components/SideForm';
import Logo from '../../assets/images/logo.png';

interface ILoginProps {
	children: React.ReactNode;
}
export interface ILoginValidationProps {
	email: string;
	password: string;
}
export const Login: React.FC<ILoginProps> = ({ children }) => {
	const theme = useTheme();
	const personMediaQuery = useMediaQuery(theme.breakpoints.down(1000));
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	const { isAuthenticated } = useAuthContex();
	const [showPassword, setShowPassword] = useState(false);
	const { toggleTheme } = useAppThemeContext();

	//Caso o usuário esteja autenticado, será redenrizado para ele toda a aplicação.
	if (isAuthenticated) {
		return <>{children}</>;
	}

	//Caso o usuário não esteja autenticado, será renderizado a tela de login.
	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			alignItems='center'
			width='100vw'
			height='100vh'

			component={Paper}
			elevation={0}
		>
			<Box
				display='flex'
				alignItems='center'
				width='100%'
				height='40px'
				paddingY='30px'
				paddingX='30px'
				marginBottom={1}
				gap={2}
				component={Paper}
				elevation={0}
			>
				<Box display='flex' justifyContent='left' alignItems='center' flex='2'>
					<CardMedia component="img" src={Logo} alt='logo_img' sx={{ width: '75px' }} />
					<Typography variant='caption' color='#1670c6' fontWeight='bold' >My System<Divider /></Typography>
				</Box>
				<IconButton onClick={toggleTheme} size='small'>
					<Brightness4 sx={smDown ? { width: '1.5rem', height: '1rem' } : { width: '1rem', height: '1rem' }} />
				</IconButton>
			</Box>
			<Box
				display='flex'
				flex='1'
				width='100%'
			>
				<Box
					display={smDown ? 'none' : 'flex'}
					justifyContent='center'
					alignItems='center'
					flex='2'
					padding='10px'
					component={Paper}
					elevation={0}
				>
					<CardMedia component="img" src={Banner} alt='banner_image' style={{ width: '70%' }} />
				</Box>
				<Box display='flex'
					flexDirection='column'
					justifyContent='center'
					alignItems='left'
					flex={mdDown ? '3' : smDown ? '2' : personMediaQuery ? '2' : '1'}
					padding='10px'
					component={Paper}
					elevation={8}
					textAlign='center'
					height='93%'
				>
					<Box display='flex' flexDirection='column' marginBottom={2}>
						<Typography variant='caption' fontSize='14px'>
							Bem-vindo ao My System👋
						</Typography>
						<Typography variant='caption' fontSize='12px' color='GrayText'>
							Por favor, informe seus dados para ter acesso ao sistema
						</Typography>
					</Box>
					<SideForm
						showPassword={showPassword}
						toggleShowPassword={() => setShowPassword(!showPassword)}
					/>
				</Box>
			</Box>
			<Typography variant='caption' fontSize='14px' color='GrayText' textAlign='center'>© Copyright 2022 My System</Typography>
		</Box >
	);
};
