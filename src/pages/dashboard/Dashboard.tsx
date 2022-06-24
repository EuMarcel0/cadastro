import { FerramentasListagem } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';

export const Dashboard = () => {
    return(
        <LayoutBaseDePagina title='Página inicial' toolbar={<FerramentasListagem showInputSearch />}>
            Testando
        </LayoutBaseDePagina>
    );
};