import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDetalhes, UnformInputText } from '../../shared/components';
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
		}
	}, [id]);

	const handleSave = (data: IFormProps,) => {
		setLoaging(true);
		if (id === 'nova') {
			PersonService.create(data)
				.then((response) => {
					setLoaging(false);
					if (response instanceof Error) {
						alert(response.message);
					} else {
						alert('OK');
						navigate(`/pessoas/detalhe/${response}`);
					}
				});
		} else {
			PersonService.updateById(Number(id), { id: Number(id), ...data })
				.then((response) => {
					if (response instanceof Error) {
						alert(response.message);
					}
					alert('Registro alterado com sucesso');
					navigate('/pessoas');
				});

		}
	};

	return (
		<LayoutBaseDePagina
			title={id === 'nova' ? 'Cadastrando uma nova pessoa' : `Editando ${name}`}
			icon='people-edit'
			toolbar={<FerramentasDetalhes
				onClickInBack={() => navigate('/pessoas')}
				onClickInSave={() => unformRef.current?.submitForm()}
				onClickInSaveAndBack={() => unformRef.current?.submitForm()}
				onClickInNew={() => navigate('/pessoas/detalhe/nova')}
				showButtonDelete={id !== 'nova'}
				showButtonNew={id !== 'nova'}
				showButtonSaveAndBack
				showButtonSave
				showButtonBack
			/>
			}
		>
			<Form ref={unformRef} onSubmit={handleSave}>
				<UnformInputText name='fullName' label='Nome completo...' />
				<UnformInputText name='email' label='E-mail...' />
				<UnformInputText name='cityId' label='Código da cidade' />
			</Form>
		</LayoutBaseDePagina>
	);
};
