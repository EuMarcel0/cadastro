import { Form } from '@unform/web';
import { FerramentasDetalhes, UnformInputText } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const DetalhesPessoas: React.FC = () => {
	return (
		<LayoutBaseDePagina
			title='Editando Pessoa'
			icon='people-edit'
			toolbar={<FerramentasDetalhes />}
		>
			<Form onSubmit={() => console.log('Enviou os dados')}>
				<UnformInputText name='email' />
			</Form>
		</LayoutBaseDePagina>
	);
};
