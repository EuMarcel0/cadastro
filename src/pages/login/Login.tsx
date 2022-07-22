import { useAuthContex } from '../../shared/contexts';

interface ILoginProps {
	children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {

	const { isAuthenticated, onLogin } = useAuthContex();


	if (isAuthenticated) {
		return <>{children}</>;
	}
	return (
		<div>
			<button onClick={() => onLogin('email', 'senha')}>Entrar</button>
		</div>
	);
};
