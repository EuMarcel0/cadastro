import { Box, Button, CardMedia, CircularProgress, Divider, IconButton, Paper, Typography, useMediaQuery, useTheme } from '@mui/material';
import * as yup from 'yup';

import { UnformInputText, useVForm } from '../../shared/components/form';
import { useAppThemeContext, useAuthContex } from '../../shared/contexts';
import Banner from '../../assets/images/login.svg';
import Logo from '../../assets/images/logo.png';
import Facebook from '../../assets/images/facebook.png';
import Google from '../../assets/images/google.png';
import Linkedin from '../../assets/images/linkedin.png';
import { Form } from '@unform/web';
import { Brightness4, LockOpen } from '@mui/icons-material';
import { useState } from 'react';

interface ILoginProps {
	children: React.ReactNode;
}

interface ILoginValidationProps {
	email: string;
	password: string;
}

interface IValidationErrors {
	[key: string]: string;
}

const loginSchemaValidation: yup.SchemaOf<ILoginValidationProps> = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required().min(5),
});

export const Login: React.FC<ILoginProps> = ({ children }) => {
	const theme = useTheme();
	const personMediaQuery = useMediaQuery(theme.breakpoints.down(1000));
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const mdDown = useMediaQuery(theme.breakpoints.down('md'));

	const { isAuthenticated, onLogin } = useAuthContex();
	const [loading, setLoading] = useState(false);
	const { toggleTheme } = useAppThemeContext();
	const { unformRef } = useVForm();

	//Caso o usuário esteja autenticado, será redenrizado para ele toda a aplicação.
	if (isAuthenticated) {
		return <>{children}</>;
	}

	const handleSubmit = (data: ILoginValidationProps) => {
		setLoading(true);
		loginSchemaValidation.validate(data, { abortEarly: false })
			.then((dataValidated) => {
				setLoading(true);
				onLogin(dataValidated.email, dataValidated.password)
					.then(() => {
						setLoading(false);
					});
			})
			.catch((errors: yup.ValidationError) => {
				const validationErrors: IValidationErrors = {};
				errors.inner.map(error => {
					if (!error.path) return;
					validationErrors[error.path] = error.message;
					unformRef.current?.setErrors(validationErrors);
					setLoading(false);
				});
			});
	};

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
					<Box display='flex' flexDirection='column' alignItems='center'>
						<Form
							ref={unformRef}
							onSubmit={handleSubmit}
							style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
						>
							<UnformInputText name='email' label='e-mail' size='medium' disabled={loading} />
							<UnformInputText name='password' label='senha' type='password' disabled={loading} />
						</Form>
						<Button
							variant='contained'
							sx={{ width: '80%' }}
							type='submit'
							onClick={() => unformRef.current?.submitForm()}
							disabled={loading}
							startIcon={loading ? <CircularProgress size={20} /> : <LockOpen />}
						>
							Entrar
						</Button>
						<Box
							display='flex'
							justifyContent='center'
							alignItems='center'
							marginTop={2}
						>
							<Typography variant='caption' fontSize='14px' color='GrayText'>
								Novo por aqui?
							</Typography>
							<a href="#" style={{ display: 'inline-block', fontSize: '14px', textDecoration: 'none' }}>cadastre-se</a>
						</Box>
						<Typography variant='caption' fontSize='14px' color='GrayText' textAlign='center' marginTop={3}>ou</Typography>
						<Box display='flex' justifyContent='center' alignItems='center' gap={1} marginTop={4} >
							<Button>
								<CardMedia
									component='img'
									src={Facebook}
									alt='facebook-icon'
									sx={{ width: '35px' }} />
							</Button>
							<Button>
								<CardMedia
									component='img'
									src={Google}
									alt='google-icon'
									sx={{ width: '35px' }} />
							</Button>
							<Button>
								<CardMedia
									component='img'
									src={Linkedin}
									alt='linkedin-icon'
									sx={{ width: '35px' }} />
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
			<Typography variant='caption' fontSize='14px' color='GrayText' textAlign='center'>© Copyright 2022 My System</Typography>
		</Box >
	);
};
