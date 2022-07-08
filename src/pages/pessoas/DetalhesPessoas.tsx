import { Form } from '@unform/web';
import { UnformInputText } from '../../shared/components';

export const DetalhesPessoas: React.FC = () => {
	return (
		<Form onSubmit={() => console.log('Enviou')}>
			<UnformInputText name='teste' />
		</Form>
	);
};
