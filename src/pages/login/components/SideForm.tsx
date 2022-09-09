import { LockOpen } from '@mui/icons-material';
import { Box, Button, CardMedia, Checkbox, CircularProgress, Typography, useTheme } from '@mui/material';
import { Form } from '@unform/web';
import { UnformInputText, useVForm } from '../../../shared/components/form';
import Linkedin from '../../../assets/images/linkedin.png';
import Facebook from '../../../assets/images/facebook.png';
import Google from '../../../assets/images/google.png';
import { ILoginValidationProps } from '../Login';

interface ISideFormProps {
	loading: boolean;
	showPassword: boolean;
	onSubmitForm: (data: ILoginValidationProps) => void;
	toggleShowPassword: () => void;
}

export const SideForm = ({ loading, showPassword, onSubmitForm, toggleShowPassword }: ISideFormProps) => {
	const { unformRef } = useVForm();
	const theme = useTheme();

	return (
		<Box display='flex' flexDirection='column' alignItems='center'>
			<Form
				ref={unformRef}
				onSubmit={onSubmitForm}
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
