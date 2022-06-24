import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";

interface IBarraDeFerramentasProps {
    textOfSearch?: string;
    showInputSearch?: boolean;
    handleTextOfSearch?: (newText: string) => void;

    textButtonNew?: string;
    showButtonNew?: boolean;
    onClickButtonNew?: () => void;
    children?: React.ReactNode;
}

export const BarraDeFerramentas= ({
    textOfSearch = '',
    showInputSearch = false,
    handleTextOfSearch,
    textButtonNew = 'Novo',
    showButtonNew = true,
    onClickButtonNew
} : IBarraDeFerramentasProps) => {

    const theme = useTheme();

    return(
        <Box
            component={Paper}
            height={theme.spacing(7)}
            display='flex'
            justifyContent='center'
            alignItems='center'
            paddingY={1}
            paddingX={2}
            marginX={1}
            marginY={1}
        >
            {showInputSearch &&
                <TextField
                    id='standard-basic'
                    label='Pesquisar...'
                    size="small"
                    autoFocus
                    value={textOfSearch}
                    onChange={(e) => handleTextOfSearch?.(e.target.value)}
                />
            }
            {showButtonNew &&
                <Box display='flex' justifyContent='end' flex={1}>
                    <Button
                        variant='contained'
                        endIcon={<Icon>add</Icon>}
                        size="small"
                        onClick={onClickButtonNew}
                    >
                        {textButtonNew}
                    </Button>
                </Box>
            }
        </Box>
    );
};