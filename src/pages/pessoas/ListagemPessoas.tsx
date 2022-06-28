import { FerramentasListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemPessoas: React.FC = () => {
    return(
        <LayoutBaseDePagina 
            title='Listagem de pessoas'
            toolbar={<FerramentasListagem showInputSearch />}
        >

        </LayoutBaseDePagina>
    );
};