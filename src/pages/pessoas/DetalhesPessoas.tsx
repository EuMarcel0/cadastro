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
	const [modalEditSaving, setModalEditSaving] = useState(false);
	const [modalDeleteInEdit, setModalDeleteInEdit] = useState(false);

	useEffect(() => {
		if (id !== 'nova') {
			PersonService.getById(Number(id))
				.then((response) => {
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
					setLoaging(false);
					if (response instanceof Error) {
						alert(response.message);
					} else {
						navigate(`/pessoas/detalhe/${response}`);
					}
				});
		} else {
			PersonService.updateById(Number(id), { id: Number(id), ...data })
				.then((response) => {
					if (response instanceof Error) {
						alert(response.message);
					}
					setModalSaving(false);
					setModalEditSaving(true);
					if (modalEditSaving !== false) {
						navigate('/pessoas');
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

	const handleSaveData = (data: IFormProps) => {
		setModalSaving(true);
		handleSave(data);
	};

	return (
		<LayoutBaseDePagina
			title={id === 'nova' ? 'Novo cadastro de pessoa' : `Editando ${name}`}
			icon='people-edit'
			toolbar={<FerramentasDetalhes
				onClickInBack={() => navigate('/pessoas')}
				onClickInSave={() => unformRef.current?.submitForm()}
				onClickInSaveAndBack={() => unformRef.current?.submitForm()}
				onClickInNew={() => navigate('/pessoas/detalhe/nova')}
				onClickInDelete={() => setModalDeleteInEdit(true)}
				showButtonDelete={id !== 'nova'}
				showButtonNew={id !== 'nova'}
				showButtonSaveAndBack
				showButtonSave
				showButtonBack
			/>
			}
		>
			<Form ref={unformRef} onSubmit={handleSaveData}>
				<UnformInputText name='fullName' label='Nome completo...' autoFocus />
				<UnformInputText name='email' label='E-mail...' />
				<UnformInputText name='cityId' label='Código da cidade' />
			</Form>
			{modalSaving &&
				<ConfirmModalSave
					title='Registro salvo com sucesso!'
					description={id !== 'nova' ? 'Você será direcionado para a edição deste registro!' : 'Registro alterado com sucesso!'}
					onSave={() => handleSave}
				/>
			}

			{modalEditSaving &&
				<ConfirmModalSave
					title='Registro alterado com sucesso!'
					description={'Registro salvo'}
					onSave={() => handleSave}
					onClickInClose={() => navigate('/pessoas')}
				/>
			}
			{modalDeleteInEdit &&
				<ConfirmModalDeleteInEdit
					onDelete={() => handleDelete(Number(id))}
					onCloseModal={() => setModalDeleteInEdit(modalDeleteInEdit === true ? false : true)}
				/>
			}


		</LayoutBaseDePagina>
	);
};
