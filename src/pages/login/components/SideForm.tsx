import { useState } from 'react';

import { Box, Button, CardMedia, Checkbox, CircularProgress, Typography, useTheme } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import { Form } from '@unform/web';
import * as yup from 'yup';

import { UnformInputText, useVForm } from '../../../shared/components/form';
import Linkedin from '../../../assets/images/linkedin.png';
import Facebook from '../../../assets/images/facebook.png';
import { useAuthContex } from '../../../shared/contexts';
import Google from '../../../assets/images/google.png';
import { ILoginValidationProps } from '../Login';

interface ISideFormProps {
	showPassword: boolean;
	toggleShowPassword: () => void;
}

const loginSchemaValidation: yup.SchemaOf<ILoginValidationProps> = yup.object().shape({
	email: yup.string().required().email(),
	password: yup.string().required().min(5),
});

interface IValidationErrors {
	[key: string]: string;
}

export const SideForm = ({ showPassword, toggleShowPassword }: ISideFormProps) => {
	const { unformRef } = useVForm();
	const theme = useTheme();
	const { isAuthenticated, onLogin } = useAuthContex();
	const [loading, setLoading] = useState(false);

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

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Form
				ref={unformRef}
				onSubmit={handleSubmit}
				style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
			>
				<UnformInputText name='email' label='e-mail' size='medium' disabled={loading} />
				<UnformInputText name='password' label='senha' type={showPassword ? 'text' : 'password'} disabled={loading} />
			</Form>
			<Box width='80%' display='flex' alignItems='center' justifyContent='flex-start' marginBottom={theme.spacing(3)}>
				<Checkbox onClick={toggleShowPassword} />
				<Typography variant='caption' fontSize='12px' color='textSecondary'>Mostrar senha</Typography>
			</Box>
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
				gap={.5}
			>
				<Typography variant='caption' fontSize='14px' color='textSecondary'>
					Novo por aqui?
				</Typography>
				<a href="#" style={{ display: 'inline-block', fontSize: '14px', textDecoration: 'none', color: '#0288d1' }}>cadastre-se</a>
			</Box>
			<Typography variant='caption' fontSize='14px' color='textSecondary' textAlign='center' marginTop={3}>ou</Typography>
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
	);
};
