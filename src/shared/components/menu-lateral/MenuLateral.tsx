import ImageProfile from '../../../assets/images/perfil.png';

import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";
import { ReactNode } from "react";

interface iMenuLateral {
    children: ReactNode;
}

export const MenuLateral: React.FC<iMenuLateral> = ({ children }) => {

    const theme = useTheme();

    return (
        <Box>
            <Drawer variant='permanent'>
                <Box
                    width={theme.spacing(28)}
                    height='100%' display='flex'
                    flexDirection='column' alignContent='center'
                    justifyContent='center'
                >
                    <Box
                        width='100%'
                        height={theme.spacing(20)}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        <Avatar
                            sx={{ width: theme.spacing(9), height: theme.spacing(9) }}
                            src={ImageProfile}
                        />
                    </Box>
                    <Divider />
                    <Box flex='1' >
                        <List component='nav'>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Icon>home</Icon>
                                </ListItemIcon>
                                <ListItemText primary="Página inicial" />
                            </ListItemButton>
                        </List>
                    </Box>
                </Box>
            </Drawer>
            <Box height='100vh' marginLeft={theme.spacing(28)}>
                {children}
            </Box>
        </Box>
    );
};