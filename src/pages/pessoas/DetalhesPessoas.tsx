import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ConfirmModalDeleteInEdit, ConfirmModalSave, FerramentasDetalhes, UnformInputText } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PersonService } from '../../shared/services/person/PersonService';

interface IFormProps {
	email: string;
	fullName: string;
	cityId: number;
}

export const DetalhesPessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();
	const unformRef = useRef<FormHandles>(null);
	const [name, setName] = useState('');
	const [loading, setLoaging] = useState(false);
	const [modalSaving, setModalSaving] = useState(false);
	const [modalDeleteInEdit, setModalDeleteInEdit] = useState(false);

	useEffect(() => {
		if (id !== 'nova') {
			setLoaging(true);
			PersonService.getById(Number(id))
				.then((response) => {
					setLoaging(false);
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
		setLoaging(true);
		if (id === 'nova') {
			PersonService.create(data)
				.then((response) => {
					setLoaging(true);
					if (response instanceof Error) {
						alert(response.message);
					} else {
						navigate(`/pessoas/detalhe/${response}`);
						setLoaging(false);
					}
				});
		} else {
			setLoaging(true);
			setModalSaving(modalSaving === false ? true : false);
			PersonService.updateById(Number(id), { id: Number(id), ...data })
				.then((response) => {
					setLoaging(false);
					if (response instanceof Error) {
						alert(response.message);
					}
				});

		}
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

			<Form ref={unformRef} onSubmit={handleClickInSave}>
				<Box
					display='flex'
					alignItems='center'
					justifyContent='center'
					component={Paper}
					padding={3}
				>
					<Grid container direction='column'>

						{loading &&
							<Grid item>
								<LinearProgress variant='indeterminate' />
							</Grid>
						}

						<Grid item>
							<Typography variant='h6' align='center' marginY={4} >Informe seus dados</Typography>
						</Grid>

						<Grid container item direction='row' justifyContent='center'>
							<Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
								<UnformInputText fullWidth name='fullName' label='Nome completo...' autoFocus />
							</Grid>
						</Grid>

						<Grid container item direction='row' justifyContent='center'>
							<Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
								<UnformInputText fullWidth name='email' label='E-mail...' />
							</Grid>
						</Grid>

						<Grid container item direction='row' justifyContent='center'>
							<Grid item xs={12} sm={12} md={10} lg={8} xl={6}>
								<UnformInputText fullWidth name='cityId' label='Código da cidade' />
							</Grid>
						</Grid>

					</Grid>
				</Box>
			</Form>


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
		</LayoutBaseDePagina >
	);
};
