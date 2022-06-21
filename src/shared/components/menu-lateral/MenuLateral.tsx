import ImageProfile from '../../../assets/images/perfil.png';

import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery, Typography, Button, IconButton } from '@mui/material';
import { Brightness4 } from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { ReactNode } from 'react';
import { useDrawerContext, useAppThemeContext } from '../../contexts';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';

interface iMenuLateral {
    children: ReactNode;
};

interface IListItemLinkProps{
	to: string;
	icon: string;
	label: string;
	handleOnClick: (() => void) | undefined;
    children: ReactNode;
}

const ListItemLink:React.FC<IListItemLinkProps>= ({to, icon, label, handleOnClick, children}) => {
	const navigate = useNavigate();

	const resolvedPath = useResolvedPath(to);
	const matchPath = useMatch({path:resolvedPath.pathname, end: false });

	const handleNavigateClick = () => {
		navigate(to);
		handleOnClick?.();
	}

	return(
		<ListItemButton selected={!!matchPath} onClick={handleNavigateClick}>
			<ListItemIcon>
				<Icon>{icon}</Icon>
			</ListItemIcon>
			<ListItemText>
				<Typography variant='caption'>
					{label}
				</Typography>
			</ListItemText>
		</ListItemButton>
	)
};	

export const MenuLateral: React.FC<iMenuLateral> = ({ children }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const {isDrawerOpen, drawerOptions, toggleDrawerOpen} = useDrawerContext();
	const {toggleTheme} = useAppThemeContext();

	return (
		<Box>
			<Drawer open={isDrawerOpen} variant={smDown? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
				<Box
					width={theme.spacing(28)}
					height='100%'
					display='flex'
					flexDirection='column'
					alignContent='center'
					justifyContent='center'
				>
					<Box
						width='100%'
						height={theme.spacing(15)}
						display='flex'
						flexDirection='column'
						alignItems='center'
				
					>
						{smDown &&
							<Box display='flex' justifyContent='flex-end' width='100%'>
								<IconButton onClick={toggleTheme} size='small'>
									<Brightness4 />
								</IconButton>
								<IconButton size='small'>
									<KeyboardArrowLeftIcon onClick={toggleDrawerOpen}/>
								</IconButton>
							</Box>
						}
						<Box display='flex' alignItems='center' flexDirection='row' gap={1}>
							<Avatar
								sx={{ width: theme.spacing(7), height: theme.spacing(7) }}
								src={ImageProfile}
							/>
							<Typography variant='caption'>Marcelo Silva</Typography>
						</Box>
					</Box>
					<Divider />
					<Box flex='1' >
						<List component='nav'>
							{drawerOptions.map((item, index) => (
								<ListItemLink key={index}
									to={item.path}
									label={item.label}
									icon={item.icon}
									handleOnClick={ smDown? toggleDrawerOpen : undefined }
								>
								</ListItemLink>
							))}
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