import ImageProfile from '../../../assets/images/perfil.png';

import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery } from '@mui/material';
import { ReactNode } from 'react';
import { useDrawerContext } from '../../contexts';

interface iMenuLateral {
    children: ReactNode;
}

export const MenuLateral: React.FC<iMenuLateral> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const {isDrawerOpen, toggleDrawerOpen} = useDrawerContext();

	return (
		<Box>
			<Drawer open={isDrawerOpen} variant={smDown? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
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
								<ListItemText primary="Página inicial"/>
							</ListItemButton>
						</List>
					</Box>
				</Box>
			</Drawer>
			<Box
                height='100vh'
                marginLeft={ smDown? theme.spacing(0): theme.spacing(28)}
            >
				{children}
			</Box>
		</Box>
	);
};