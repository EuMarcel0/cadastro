import { useAuthContex } from '../../shared/contexts';

interface ILoginProps {
	children: React.ReactNode;
}

export const Login: React.FC<ILoginProps> = ({ children }) => {
	const { isAuthenticated } = useAuthContex();

	if (isAuthenticated) {
		return <>{children}</>;
	}
	return (
		<div>Login</div>
	);
};
