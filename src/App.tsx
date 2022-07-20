import { AppThemeProvider, AuthProvider } from './shared/contexts';
import './shared/components/form/TranslateErrorsYupForm';
import { AppDrawerProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';
import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes';

import './Global.css';
import { Login } from './pages';


export const App = () => {
	return (
		<AuthProvider>
			<AppThemeProvider>
				<Login>
					<AppDrawerProvider>
						<BrowserRouter>
							<MenuLateral>
								<AppRoutes />
							</MenuLateral>
						</BrowserRouter>
					</AppDrawerProvider>
				</Login>
			</AppThemeProvider>
		</AuthProvider>
	);
};

