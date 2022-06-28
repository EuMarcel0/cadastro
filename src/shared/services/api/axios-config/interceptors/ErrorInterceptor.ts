import { AxiosError } from "axios";

export const errorInterceptor = (error: AxiosError) => {
    if(error.message === 'Network Error'){
        return Promise.reject(new Error('Erro de conexão. Tente novamente'));
    }
    return Promise.reject(error);
};