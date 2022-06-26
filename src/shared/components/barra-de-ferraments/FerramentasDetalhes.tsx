import { Box, Button, Icon, Paper, Skeleton, useMediaQuery, useTheme } from "@mui/material";

export interface IFerramentasDetalhesProps {
    textButtonNew?: string;

    showButtonNew?: boolean;
    showButtonBack?: boolean;
    showButtonDelete?: boolean;
    showButtonSave?: boolean;
    showButtonSaveAndBack?: boolean;

    showButtonNewLoading?: boolean;
    showButtonBackLoading?: boolean;
    showButtonDeleteLoading?: boolean;
    showButtonSaveLoading?: boolean;
    showButtonSaveAndBackLoading?: boolean;

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

    showButtonNewLoading = false,
    showButtonBackLoading = false,
    showButtonDeleteLoading = false,
    showButtonSaveLoading = false,
    showButtonSaveAndBackLoading = false,

    onClickInNew,
    onClickInBack,
    onClickInDelete,
    onClickInSave,
    onClickInSaveAndBack: onClickInSaveAndBack,

}: IFerramentasDetalhesProps) => {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
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
            {(showButtonSave && !showButtonSaveLoading) &&
                <Button
                    sx={{ borderRadius: 0 }}
                    variant='contained'
                    startIcon={<Icon>save</Icon>}
                    size="small"
                    onClick={onClickInSave}
                >
                    Salvar
                </Button>
            }
            {showButtonSaveLoading &&
                <Skeleton
                    sx={{ borderRadius: '0' }}
                    animation='wave'
                    width='110px'
                    height='59px'
                />
            }
            {(showButtonSaveAndBack && !showButtonSaveAndBackLoading && !smDown && !mdDown) &&
                <Button
                    sx={{ borderRadius: 0 }}
                    variant='contained'
                    startIcon={<Icon>save_as</Icon>}
                    size="small"
                    onClick={onClickInSaveAndBack}
                >
                    Salvar e voltar
                </Button>
            }
            {(showButtonSaveAndBackLoading && !smDown && !mdDown) &&
                <Skeleton
                    sx={{ borderRadius: '0' }}
                    animation='wave'
                    width='180px'
                    height='59px'
                />
            }
            {(showButtonDelete && !showButtonDeleteLoading) &&
                <Button
                    sx={{ borderRadius: 0 }}
                    variant='contained'
                    startIcon={<Icon>delete</Icon>}
                    size="small"
                    onClick={onClickInDelete}
                >
                    Apagar
                </Button>
            }
            {showButtonDeleteLoading &&
                <Skeleton
                    sx={{ borderRadius: '0' }}
                    animation='wave'
                    width='110px'
                    height='59px'
                />
            }
            {(showButtonNew && !showButtonNewLoading && !smDown) &&
                <Button
                    sx={{ borderRadius: 0 }}
                    variant='contained'
                    startIcon={<Icon>add</Icon>}
                    size="small"
                    onClick={onClickInNew}
                >
                    {textButtonNew}
                </Button>
            }
            {(showButtonNewLoading && !smDown) &&
                <Skeleton
                    sx={{ borderRadius: '0' }}
                    animation='wave'
                    width='110px'
                    height='59px'
                />
            }
            {(showButtonBack && !showButtonBackLoading) &&
                <Box display='flex' flex={1} justifyContent='end'>
                    <Button
                        sx={{ borderRadius: 0 }}
                        variant='contained'
                        startIcon={<Icon>arrow_back</Icon>}
                        size="small"
                        onClick={onClickInBack}
                    >
                        Voltar
                    </Button>
                </Box>
            }
            {showButtonBackLoading &&
                <Box display='flex' flex={1} justifyContent='end'>
                    <Skeleton
                        sx={{ borderRadius: '0' }}
                        animation='wave'
                        width='110px'
                        height='59px'
                    />
                </Box>
            }
        </Box>
    );
};