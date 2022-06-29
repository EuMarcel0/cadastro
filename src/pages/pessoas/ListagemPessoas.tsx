import { Icon, Typography } from "@mui/material";

import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import { FerramentasListagem } from "../../shared/components";
import { LayoutBaseDePagina } from "../../shared/layouts";

export const ListagemPessoas: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams('Teste');

    const search = useMemo(() => {
        return searchParams.get('busca') || '';
    },[searchParams]);

    return(
        <LayoutBaseDePagina
            icon={<Typography><Icon>person</Icon></Typography>} 
            title='Listagem de pessoas'
            toolbar={<FerramentasListagem
                        showInputSearch
                        textButtonNew='Nova'
                        textOfSearch={search}
                        handleTextOfSearch={text => setSearchParams({busca: text}, {replace: true})}
                        />
                    }

        >

        </LayoutBaseDePagina>
    );
};