import Api from '../api/axios-config';

interface IAuth {
	accessToken: string;
}

export const auth = async (email: string, password: string) : Promise<IAuth | Error>=> {
	try{
		const { data } = await Api.get('/auth', {data:{email: email, password: password}});
		if( data ){
			return data;
		}
		return new Error('Erro ao fazer login');
	}catch(error){
		return new Error((error as { message: string }).message || 'Erro ao fazer login');
	}
};

export const AuthService = {
	auth,
};
