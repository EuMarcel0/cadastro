import { Box, Button, CardMedia, Divider, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';

import { UnformInputText } from '../../shared/components/form';
import { useAuthContex } from '../../shared/contexts';
import Banner from '../../assets/images/login.svg';
import Logo from '../../assets/images/logo.png';
import { Form } from '@unform/web';

interface ILoginProps {
	children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
	const { isAuthenticated, onLogin } = useAuthContex();
	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));

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
			bgcolor='#f5f5f5'
		>
			<Box
				component='header'
				display='flex'
				alignItems='center'
				width='100%'
				height='40px'
				paddingY='30px'
				paddingX='30px'
			>
				<Box display='flex' justifyContent='left' alignItems='center' flex='2'>
					<CardMedia component="img" src={Logo} alt='logo_img' sx={{ width: '75px' }} />
					<Typography variant='caption' color='#1670c6' fontWeight='bold' >My System<Divider /></Typography>
				</Box>
			</Box>
			<Box
				display='flex'
				flex='1'
				width='100%'
				padding='10px'
			>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					flex='2'
				>
					<img src={Banner} alt='banner_image' style={{ width: '70%' }} />
				</Box>
				<Divider orientation="vertical" flexItem />
				<Box display='flex' flexDirection='column' justifyContent='center' flex='1' padding={2}>
					<Box display='flex' flexDirection='column' marginBottom={2}>
						<Typography variant='caption' fontSize='14px'>Bem-vindo ao My System👋</Typography>
						<Typography variant='caption' fontSize='12px' color='GrayText'>Por favor, informe seus dados para ter acesso ao sistema</Typography>
					</Box>
					<Box display='flex' flexDirection='column'>
						<Form onSubmit={console.log}>
							<UnformInputText name='email' fullWidth label='e-mail' />
							<UnformInputText name='password' fullWidth label='senha' />
						</Form>
						<Button variant='contained'>Entrar</Button>
						<Box>
							<Typography>Novo por aqui? </Typography>
						</Box>
					</Box>

				</Box>
			</Box>
		</Box>
	);
};
