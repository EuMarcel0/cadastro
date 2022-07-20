import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { AuthService } from '../services/auth/AuthService';

interface IAuthContext {
	isAuthenticated: boolean;
	onLogin: (email: string, password: string) => Promise<string | void>;
	onLogout: () => void;
}

const LOCAL_STORAGE_AUTH_TOKEN = 'LOCAL_STORAGE_APP_TOKEN';

export const AuthContext = createContext({} as IAuthContext);

interface IAuthProps {
	children: React.ReactNode;
}

export const AuthProvider = ({ children }: IAuthProps) => {
	const [accessToken, setAccessToken] = useState<string | undefined>();

	useEffect(() => {
		const accessToken = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN);
		if (accessToken) {
			setAccessToken(JSON.parse(accessToken));
		} else {
			setAccessToken(undefined);
		}
	}, []);

	const handleLogin = useCallback(async (email: string, password: string) => {
		const result = await AuthService.auth(email, password);
		if (result instanceof Error) {
			alert(result.message);
		} else {
			localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN, JSON.stringify(result.accessToken));
			setAccessToken(result.accessToken);
		}
	}, []);

	const handleLogout = useCallback(() => {
		localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN);
		setAccessToken(undefined);
	}, []);

	const isAuthenticated = useMemo(() => accessToken !== undefined, [accessToken]);

	return (
		<AuthContext.Provider value={{ isAuthenticated, onLogin: handleLogin, onLogout: handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthContex = () => {
	return useContext(AuthContext);
};
