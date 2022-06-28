import { Icon, Typography } from "@mui/material";
import { FerramentasListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemPessoas: React.FC = () => {
    return(
        <LayoutBaseDePagina
            icon={<Typography><Icon>person</Icon></Typography>} 
            title='Listagem de pessoas'
            toolbar={<FerramentasListagem showInputSearch textButtonNew='Nova' />}
        >

        </LayoutBaseDePagina>
    );
};