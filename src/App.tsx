import './Global.css';

import { BrowserRouter } from 'react-router-dom';
import './shared/components/form/TranslateErrorsYupForm';
import { AppRoutes } from './routes';
import { AppThemeProvider } from './shared/contexts';
import { MenuLateral } from './shared/components';
import { AppDrawerProvider } from './shared/contexts';

export const App = () => {
	return (
		<AppThemeProvider>
			<AppDrawerProvider>
				<BrowserRouter>
					<MenuLateral>
						<AppRoutes />
					</MenuLateral>
				</BrowserRouter>
			</AppDrawerProvider>
		</AppThemeProvider>
	);
};

