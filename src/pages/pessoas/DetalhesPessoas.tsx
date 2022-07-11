import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FerramentasDetalhes, UnformInputText } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import { PersonService } from '../../shared/services/person/PersonService';

interface IDetalhesPessoasProps {
	email: string;
	fullName: string;
	cityId: string;
}

export const DetalhesPessoas: React.FC = () => {
	const { id = 'nova' } = useParams<'id'>();
	const navigate = useNavigate();
	const unformRef = useRef<FormHandles>(null);
	const [name, setName] = useState('');

	useEffect(() => {
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
	}, [id]);

	return (
		<LayoutBaseDePagina
			title={`Editando ${name}`}
			icon='people-edit'
			toolbar={<FerramentasDetalhes
				onClickInBack={() => navigate('/pessoas')}

			/>
			}
		>
			<Form ref={unformRef} onSubmit={() => console.log('Enviou os dados')}>
				<UnformInputText name='fullName' label='Nome completo...' />
				<UnformInputText name='email' label='E-mail...' />
				<UnformInputText name='cityId' label='Código da cidade' />
			</Form>
		</LayoutBaseDePagina>
	);
};
