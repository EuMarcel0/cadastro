import { createTheme } from '@mui/material';

export const DarkTheme = createTheme({
	palette:{
		mode: 'dark',
		primary:{
			main: '#0288d1',
			light: '#01579b',
			contrastText: '#FFFFFF',
		},
		secondary:{
			main: '#4fc3f7',
			dark: '#03a9f4',
			light: '#29b6f6',
			contrastText: '#FFFFFF',
		},
		background: {
			default: '#0a1929',
			paper: '#001e3c',
		}
	},
	typography:{
		allVariants: {
			color: '#FFFFFF',
		}
	}
});
