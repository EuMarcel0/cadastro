
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from '../themes';

interface iThemeContextData {
	themeName: 'light' | 'dark';
	toggleTheme: () => void;
}

const ThemeContext = createContext({} as iThemeContextData);

interface iAppThemeProvider {
	children: React.ReactNode;
}
const LOCAL_STORAGE_APP__THEME = 'LOCAL_STORAGE_THEME';

export const useAppThemeContext = () => {
	return useContext(ThemeContext);
};

export const AppThemeProvider: React.FC<iAppThemeProvider> = ({ children }) => {

	const [themeName, setThemeName] = useState<'light' | 'dark'>('light');

	const toggleTheme = useCallback(() => {
		setThemeName(themeName => themeName === 'light' ? 'dark' : 'light');
	}, [themeName]);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_APP__THEME, JSON.stringify(themeName));
	}, [themeName]);

	const theme = useMemo(() => {
		if (themeName === 'light') {
			return LightTheme;
		}
		return DarkTheme;
	}, [themeName]);

	return (
		<ThemeContext.Provider value={{ themeName, toggleTheme }}>
			<ThemeProvider theme={theme}>
				<Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
					{children}
				</Box>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};
