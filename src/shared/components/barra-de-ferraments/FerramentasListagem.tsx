import { Box, Button, Icon, Paper, TextField, Typography, useTheme } from "@mui/material";
import { Environment } from "../../environment";

interface IFerramentasListagemProps {
    textOfSearch?: string;
    showInputSearch?: boolean;
    handleTextOfSearch?: (newText: string) => void;
    handleInputClear: () => void;
    textButtonNew?: string;
    showButtonNew?: boolean;
    onClickButtonNew?: () => void;
    children?: React.ReactNode;
}

export const FerramentasListagem= ({
    textOfSearch = '',
    showInputSearch = false,
    handleTextOfSearch,
    textButtonNew = 'Novo',
    showButtonNew = true,
    onClickButtonNew,
    handleInputClear
} : IFerramentasListagemProps) => {

    const theme = useTheme();


    return(
        <Box
            borderRadius={0}
            component={Paper}
            height={theme.spacing(7)}
            display='flex'
            alignItems='center'
            paddingY={1}
            paddingX={2}
            marginX={0}
            marginY={1}
            gap={1}
        >
            {showInputSearch &&
                <TextField
                    id='standard-basic'
                    label={Environment.PLACEHOLDER_INPUTS_OF_SEARCH}
                    size="small"
                    autoFocus
                    value={textOfSearch}
                    onChange={(e) => handleTextOfSearch?.(e.target.value)}
                />
            }
            {textOfSearch.length > 0 &&
                <Button onClick={handleInputClear} variant='contained' sx={{ borderRadius: '0'}}>
                    <Typography textTransform='capitalize'>Limpar</Typography>
                </Button>
            }
            {showButtonNew &&
                <Box display='flex' justifyContent='end' flex={1}>
                    <Button
                        sx={{borderRadius: 0}}
                        variant='contained'
                        startIcon={<Icon>add</Icon>}
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