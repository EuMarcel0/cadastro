import { ReactNode } from 'react';
import { useMatch, useNavigate, useResolvedPath } from 'react-router-dom';
import { Brightness4, Logout } from '@mui/icons-material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Avatar, Box, Divider, Drawer, Icon, List, ListItemButton, ListItemIcon, ListItemText, useTheme, useMediaQuery, Typography, IconButton } from '@mui/material';


import ImageProfile from '../../../assets/images/perfil.png';
import { useDrawerContext, useAppThemeContext, useAuthContex } from '../../contexts';

interface iMenuLateral {
	children: ReactNode;
}

interface IListItemLinkProps {
	to: string;
	icon: string;
	label: string;
	handleOnClick: (() => void) | undefined;
	children: ReactNode;
}

const ListItemLink: React.FC<IListItemLinkProps> = ({ to, icon, label, handleOnClick, children }) => {
	const navigate = useNavigate();
	const resolvedPath = useResolvedPath(to);
	const matchPath = useMatch({ path: resolvedPath.pathname, end: false });

	const handleNavigateClick = () => {
		navigate(to);
		handleOnClick?.();
	};

	return (
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
	);
};

export const MenuLateral: React.FC<iMenuLateral> = ({ children }) => {

	const theme = useTheme();
	const smDown = useMediaQuery(theme.breakpoints.down('sm'));
	const { isDrawerOpen, drawerOptions, toggleDrawerOpen } = useDrawerContext();
	const { toggleTheme } = useAppThemeContext();
	const { onLogout } = useAuthContex();

	return (
		<Box>
			<Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
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
						padding='12px'
						display='flex'
						flexDirection='column'
						alignItems='center'
						justifyContent={smDown ? 'flex-start' : 'center'}
					>

						<Box display='flex' justifyContent='flex-end' width='100%'>
							<IconButton onClick={toggleTheme} size='small'>
								<Brightness4 sx={smDown ? { width: '1.5rem', height: '1rem' } : { width: '1rem', height: '1rem' }} />
							</IconButton>
							<IconButton onClick={onLogout} size='small'>
								<Logout sx={smDown ? { width: '1.5rem', height: '1rem' } : { width: '1rem', height: '1rem' }} />
							</IconButton>
							{smDown &&
								<IconButton size='small'>
									<KeyboardArrowLeftIcon onClick={toggleDrawerOpen} />
								</IconButton>
							}
						</Box>
						<Box display='flex' alignItems='center' flexDirection='column' gap={1}>
							<Avatar
								sx={{ width: theme.spacing(7), height: theme.spacing(7) }}
								src={ImageProfile}
							/>
							<Typography variant='caption'>Marcelo Silva</Typography>
						</Box>
					</Box>
					<Divider sx={{ marginY: '2px' }} />
					<Box flex='1' >
						<List component='nav'>
							{drawerOptions.map((item, index) => (
								<ListItemLink key={index}
									to={item.path}
									label={item.label}
									icon={item.icon}
									handleOnClick={smDown ? toggleDrawerOpen : undefined}
								>
								</ListItemLink>
							))}
						</List>
					</Box>
				</Box>
			</Drawer>
			<Box
				height='100vh'
				marginLeft={smDown ? theme.spacing(0) : theme.spacing(28)}
			>
				{children}
			</Box>
		</Box>
	);
};
