import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { ConfirmModalDeleteInEdit, ConfirmModalSave, FerramentasDetalhes } from '../../shared/components';
import { PersonService } from '../../shared/services/person/PersonService';
import peopleIllustration from '../../assets/images/people.svg';
import { UnformInputText, useVForm, VForm, VFormErrors } from '../../shared/components/form';
import { LayoutBaseDePagina } from '../../shared/layouts';

interface IFormProps {
	email: string;
	fullName: string;
	cityId: number;
}

const validateYupFormSchema: yup.SchemaOf<IFormProps> = yup.object().shape({
	email: yup.string().required().email(),
	fullName: yup.string().required().min(5),
	cityId: yup.number().required(),
});

export const DetalhesPessoas: React.FC = () => {

	const [modalDeleteInEdit, setModalDeleteInEdit] = useState(false);
	const [modalSaving, setModalSaving] = useState(false);
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState('');

	const { unformRef } = useVForm();
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();

	useEffect(() => {
		if (id !== 'nova') {
			setLoading(true);
			PersonService.getById(Number(id))
				.then((response) => {
					setLoading(false);
					if (response instanceof Error) {
						alert(response.message);
						navigate('/pessoas');
					} else {
						unformRef.current?.setData(response);
						setName(response.fullName);
					}
				});
		} else {
			unformRef.current?.setData({
				email: '',
				fullName: '',
				cityId: ''
			});
		}

	}, [id]);

	const handleSave = (data: IFormProps) => {
		validateYupFormSchema.validate(data, { abortEarly: false })
			.then((validatesData) => {
				setLoading(true);
				if (id === 'nova') {
					PersonService.create(validatesData)
						.then((response) => {
							setLoading(true);
							if (response instanceof Error) {
								alert(response.message);
							} else {
								navigate(`/pessoas/detalhe/${response}`);
								setLoading(false);
							}
						});
				} else {
					setLoading(true);
					setModalSaving(modalSaving === false ? true : false);
					PersonService.updateById(Number(id), { id: Number(id), ...validatesData })
						.then((response) => {
							setLoading(false);
							if (response instanceof Error) {
								alert(response.message);
							}
						});

				}
			})
			.catch((errors: yup.ValidationError) => {
				const validationErrors: VFormErrors = {};
				errors.inner.map(error => {
					if (!error.path) return;
					validationErrors[error.path] = error.message;
					setModalSaving(false);
				});
				unformRef.current?.setErrors(validationErrors);
			});
	};

	const handleDelete = (id: number) => {
		PersonService.deleteById(Number(id))
			.then((response) => {
				if (response instanceof Error) {
					alert(response.message);
					return response;
				}
				navigate('/pessoas');
			});
	};

	const handleClickInSave = (data: IFormProps) => {
		handleSave(data);
		setModalSaving(true);
	};

	return (
		<LayoutBaseDePagina
			title={id === 'nova' ? ' → Cadastro de pessoas' : `→ Editando ${name}`}
			icon=''
			toolbar={<FerramentasDetalhes
				onClickInBack={() => navigate('/pessoas')}
				onClickInSave={() => unformRef.current?.submitForm()}
				onClickInNew={() => navigate('/pessoas/detalhe/nova')}
				onClickInDelete={() => setModalDeleteInEdit(true)}
				showButtonDelete={id !== 'nova'}
				showButtonNew={id !== 'nova'}
				showButtonSave
				showButtonBack
			/>
			}
		>

			<VForm ref={unformRef} onSubmit={handleClickInSave}>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					component={Paper}
					elevation={6}
					padding={3}
				>
					<Grid container direction='column'>

						{loading &&
							<Grid item justifyContent='center'>
								<LinearProgress variant='indeterminate' />
								<Typography variant='caption' align='center'>
									Carregando dados...
								</Typography>
							</Grid>
						}

						<Grid item>
							<Typography variant='h6' align='center' marginY={4} >Informe seus dados</Typography>
						</Grid>
						<Grid container item direction='row' justifyContent='center'>
							<Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
								<UnformInputText fullWidth
									name='fullName'
									label='Nome completo'
									autoFocus
									disabled={loading}
									onChange={e => setName(e.target.value)}
								/>
							</Grid>
						</Grid>
						<Grid container item direction='row' justifyContent='center'>
							<Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
								<UnformInputText fullWidth
									name='email'
									label='E-mail'
									disabled={loading}
								/>
							</Grid>
						</Grid>
						<Grid container item direction='row' justifyContent='center'>
							<Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
								<UnformInputText
									fullWidth
									name='cityId'
									label='Código da cidade'
									disabled={loading}
								/>
							</Grid>
						</Grid>

					</Grid>
				</Box>
			</VForm>

			{
				modalSaving &&
				<ConfirmModalSave
					title='Registro salvo com sucesso!'
					description='Clique em "OK" para permanecer na tela de edição'
					onCloseModalSave={() => setModalSaving(modalSaving === true ? false : true)}
					onCloseModaAndBack={() => navigate('/pessoas')}
				/>
			}
			{
				modalDeleteInEdit &&
				<ConfirmModalDeleteInEdit
					onDelete={() => handleDelete(Number(id))}
					onCloseModal={() => setModalDeleteInEdit(modalDeleteInEdit === true ? false : true)}
				/>
			}
			<Box
				width='100%'
				height='100%'
				maxWidth='300px'
				maxHeight='300px'
				marginX='auto'
				marginY={6}
			>
				<img style={{ width: '100%' }} src={peopleIllustration} />
			</Box>
		</LayoutBaseDePagina >
	);
};
