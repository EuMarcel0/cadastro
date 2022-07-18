import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

import { ConfirmModalDeleteInEdit, ConfirmModalSave, FerramentasDetalhes } from '../../shared/components';
import cityIllustration from '../../assets/images/city.svg';
import { UnformInputText, useVForm, VForm, VFormErrors } from '../../shared/components/form';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { CityService } from '../../shared/services/city/CityService';

interface IFormProps {
	name: string;
}

const validateYupFormSchema: yup.SchemaOf<IFormProps> = yup.object().shape({
	name: yup.string().required(),
});

export const DetalhesCidades: React.FC = () => {

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
			CityService.getById(Number(id))
				.then((response) => {
					setLoading(false);
					if (response instanceof Error) {
						alert(response.message);
						navigate('/cidades');
					} else {
						unformRef.current?.setData(response);
						setName(response.name);
					}
				});
		} else {
			unformRef.current?.setData({
				name: '',
			});
		}

	}, [id]);

	const handleSave = (data: IFormProps) => {
		validateYupFormSchema.validate(data, { abortEarly: false })
			.then((validatesData) => {
				setLoading(true);
				if (id === 'nova') {
					CityService.create(validatesData)
						.then((response) => {
							setLoading(true);
							if (response instanceof Error) {
								alert(response.message);
							} else {
								navigate(`/cidades/detalhe/${response}`);
								setLoading(false);
							}
						});
				} else {
					setLoading(true);
					setModalSaving(modalSaving === false ? true : false);
					CityService.updateById(Number(id), { id: Number(id), ...validatesData })
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
		CityService.deleteById(Number(id))
			.then((response) => {
				if (response instanceof Error) {
					alert(response.message);
					return response;
				}
				navigate('/cidades');
			});
	};

	const handleClickInSave = (data: IFormProps) => {
		handleSave(data);
		setModalSaving(true);
	};

	return (
		<LayoutBaseDePagina
			title={id === 'nova' ? ' → Cadastro de cidades' : `→ Editando ${name}`}
			icon=''
			toolbar={<FerramentasDetalhes
				onClickInBack={() => navigate('/cidades')}
				onClickInSave={() => unformRef.current?.submitForm()}
				onClickInNew={() => navigate('/cidades/detalhe/nova')}
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
							<Typography variant='h6' align='center' marginY={4} >Informe o nome da cidade</Typography>
						</Grid>
						<Grid container item direction='row' justifyContent='center'>
							<Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
								<UnformInputText fullWidth
									name='name'
									label='Nome completo'
									autoFocus
									disabled={loading}
									onChange={e => setName(e.target.value)}
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
					onCloseModaAndBack={() => navigate('/cidades')}
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
				<img style={{ width: '100%' }} src={cityIllustration} />
			</Box>
		</LayoutBaseDePagina >
	);
};
