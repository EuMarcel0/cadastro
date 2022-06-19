
import { createContext, useCallback, useContext, useState } from 'react';

interface iDrawerContextData {
	isDrawerOpen: boolean;
	toggleDrawerOpen: () => void;
}

const DrawerContext = createContext({} as iDrawerContextData);
interface iAppThemeProvider {
	children: React.ReactNode;
}

export const useDrawerContext = () => {
	return useContext(DrawerContext);
};

export const AppDrawerProvider: React.FC<iAppThemeProvider> = ({ children }) => {

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const toggleDrawerOpen = useCallback(() => {
		setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
	}, []);

	return (
		<DrawerContext.Provider value={{ isDrawerOpen, toggleDrawerOpen }}>
			{children}
		</DrawerContext.Provider>
	);
};