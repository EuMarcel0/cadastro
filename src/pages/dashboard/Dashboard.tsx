import { FerramentasDetalhes, FerramentasListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
    return(
        <LayoutBaseDePagina title='Página inicial' toolbar={<FerramentasDetalhes />}>
            Testando
        </LayoutBaseDePagina>
    );
};