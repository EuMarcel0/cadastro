import { Box, Button, Divider, Icon, Paper, useTheme } from "@mui/material";

interface IFerramentasDetalhesProps {
    textButtonNew?: string;

    showButtonNew?: boolean;
    showButtonBack?: boolean;
    showButtonDelete?: boolean;
    showButtonSave?: boolean;
    showButtonSaveAndBack?: boolean;

    onClickInNew?: () => void;
    onClickInBack?: () => void;
    onClickInDelete?: () => void;
    onClickInSave?: () => void;
    onClickInSaveAndBack?: () => void;
};

export const FerramentasDetalhes = ({
    textButtonNew = 'Novo',
    showButtonNew = true,
    showButtonBack = true,
    showButtonDelete = true,
    showButtonSave = true,
    showButtonSaveAndBack = false,

    onClickInNew,
    onClickInBack,
    onClickInDelete,
    onClickInSave,
    onClickInSaveAndBack: onClickInSaveAndBack,

}: IFerramentasDetalhesProps) => {
    const theme = useTheme();

    return (
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

            {showButtonSave &&
                <Button
                    variant='contained'
                    startIcon={<Icon>save</Icon>}
                    size="small"
                    onClick={onClickInSave}
                >
                    Salvar
                </Button>
            }
            {showButtonSaveAndBack &&
                <Button
                    variant='contained'
                    startIcon={<Icon>save</Icon>}
                    size="small"
                    onClick={onClickInSaveAndBack}
                >
                    Salvar e voltar
                </Button>
            }
            {showButtonDelete &&
                <Button
                    variant='contained'
                    startIcon={<Icon>delete</Icon>}
                    size="small"
                    onClick={onClickInDelete}
                >
                    Apagar
                </Button>
            }
            {showButtonNew &&
                <Button
                    variant='contained'
                    startIcon={<Icon>add</Icon>}
                    size="small"
                    onClick={onClickInNew}
                >
                    {textButtonNew}
                </Button>
            }
            {showButtonBack &&
                <Box display='flex' flex={1} justifyContent='end'>
                    <Button
                        variant='contained'
                        startIcon={<Icon>arrow_back</Icon>}
                        size="small"
                        onClick={onClickInBack}
                    >
                        Voltar
                    </Button>
                </Box>
            }
        </Box>
    );
};