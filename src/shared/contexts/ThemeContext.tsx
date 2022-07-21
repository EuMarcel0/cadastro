
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { DarkTheme, LightTheme } from '../themes';
import { usePersistedState } from '../hooks';

interface iThemeContextData {
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
	const { state, setState } = usePersistedState(LOCAL_STORAGE_APP__THEME, LightTheme);

	const toggleTheme = useCallback(() => {
		setState((themeName: string) => themeName === 'light' ? 'dark' : 'light');
	}, [state]);

	const theme = useMemo(() => {
		if (state === 'light') {
			return LightTheme;
		}
		return DarkTheme;
	}, [state]);

	return (
		<ThemeContext.Provider value={{ toggleTheme }}>
			<ThemeProvider theme={theme}>
				<Box width='100vw' height='100vh' bgcolor={theme.palette.background.default}>
					{children}
				</Box>
			</ThemeProvider>
		</ThemeContext.Provider>
	);
};
