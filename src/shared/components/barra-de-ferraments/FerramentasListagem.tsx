import { Box, Button, Icon, Paper, TextField, useTheme } from "@mui/material";
import { Environment } from "../../environment";

interface IFerramentasListagemProps {
    textOfSearch?: string;
    showInputSearch?: boolean;
    handleTextOfSearch?: (newText: string) => void;

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
    onClickButtonNew
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
                    sx={{backgroundColor: '#FFF', borderRadius: 1}}
                    id='standard-basic'
                    label={Environment.PLACEHOLDER_INPUTS_OF_SEARCH}
                    size="small"
                    autoFocus
                    value={textOfSearch}
                    onChange={(e) => handleTextOfSearch?.(e.target.value)}
                />
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