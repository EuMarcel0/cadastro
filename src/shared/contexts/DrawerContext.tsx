
import { createContext, useCallback, useContext, useState } from 'react';

interface IDrawerContextData {
	isDrawerOpen: boolean;
	toggleDrawerOpen: () => void;
	drawerOptions: IDrawerOptionsProps[];
	setDrawerOptions: (newDrawerOptions : IDrawerOptionsProps[]) => void;
}

interface IDrawerOptionsProps{
	icon: string;
	label: string;
	path: string;
}

const DrawerContext = createContext({} as IDrawerContextData);
interface IAppThemeProvider {
	children: React.ReactNode;
}

export const useDrawerContext = () => {
	return useContext(DrawerContext);
};

export const AppDrawerProvider: React.FC<IAppThemeProvider> = ({ children }) => {

	const [isDrawerOpen, setIsDrawerOpen] = useState(false);
	const [drawerOptions, setDrawerOptions] = useState<IDrawerOptionsProps[]>([]);

	const toggleDrawerOpen = useCallback(() => {
		setIsDrawerOpen(oldDrawerOpen => !oldDrawerOpen);
	}, []);

	const handleSetDrawerOptions = useCallback((newDrawerOptions : IDrawerOptionsProps[]) => {
		setDrawerOptions(newDrawerOptions);
	}, []);

	return (
		<DrawerContext.Provider value={{ isDrawerOpen, drawerOptions, toggleDrawerOpen, setDrawerOptions: handleSetDrawerOptions }}>
			{children}
		</DrawerContext.Provider>
	);
};