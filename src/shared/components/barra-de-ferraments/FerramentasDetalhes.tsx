import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

export const FerramentasDetalhes = () => {
    const theme = useTheme();

    return(
        <Box
            component={Paper}
            height={theme.spacing(7)}
            display='flex'
            alignItems='center'
            paddingY={1}
            paddingX={2}
            marginX={1}
            marginY={1}
            gap={1}
        >
            
            <Button
                variant='contained'
                startIcon={<Icon>save</Icon>}
                size="small"
            >
                Salvar
            </Button>
            <Button
                variant='contained'
                startIcon={<Icon>save</Icon>}
                size="small"
            >
                Salvar e voltar
            </Button>
            <Button
                variant='contained'
                startIcon={<Icon>delete</Icon>}
                size="small"
            >
                Apagar
            </Button>
            <Button
                variant='contained'
                startIcon={<Icon>add</Icon>}
                size="small"
            >
                Novo
            </Button>
            <Box display='flex' flex={1} justifyContent='end'>
                <Button
                    variant='contained'
                    startIcon={<Icon>arrow_back</Icon>}
                    size="small"
                >
                    Voltar
                </Button>
            </Box>
        </Box>
    );
};