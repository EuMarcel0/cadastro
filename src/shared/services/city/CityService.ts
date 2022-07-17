import { Environment } from '../../environment';
import Api from '../api/axios-config';

export interface IlistingCityProps {
	id: number;
	name: string;
}
export interface IDetailsCityProps {
	id: number;
	name: string;
}
type TCityWithTotalCountProps = {
	data: IlistingCityProps[];
	totalCount: number;
}

/**
 * PT_BR: Traz todos os itens na listagem com total de registros
*/
const getAll = async (page: number, filter: string) : Promise<TCityWithTotalCountProps | Error> => {
	const relativePath = `/cidades?_page=${page}&_limit=${Environment.LIMIT_OF_ROWS_PER_PAGE}&name_like=${filter}`;
	try{
		const { data, headers } = await Api.get(relativePath);
		if(data){
			return{
				data,
				totalCount: Number(headers['x-total-count'] || Environment.LIMIT_OF_ROWS_PER_PAGE),
			};
		}
		return new Error('Erro ao consultar os registros');
	}catch(error){
		return new Error((error as { message: string}).message || 'Erro ao consultar os registros');
	}
};
/**
 * PT_BR: Traz dados a partir do id
*/
const getById = async (id: number) : Promise<IDetailsCityProps | Error> => {
	try{
		const { data } = await Api.get(`/cidades/${id}`);
		if(data){
			return data;
		}
		return new Error('Erro ao consultar o registro');
	}catch(error){
		return new Error((error as { message: string}).message || 'Erro ao consultar o registro');
	}
};
/**
 * PT_BR: Cria um novo dado de cidades no servidor
*/
const create = async (dataCity: Omit<IDetailsCityProps, 'id'>) : Promise<number | Error> => {
	try{
		const { data } = await Api.post('/cidades', dataCity);
		if(data){
			return data.id;
		}
		return new Error ('Erro ao criar o registro');
	}catch(error){
		return new Error((error as { message: string}).message || 'Erro ao criar o registro');
	}
};
/**
 * PT_BR: Atualiza os dados da cidade no servidor
*/
const updateById = async (id: number, dataCity: IDetailsCityProps) : Promise<void | Error> => {
	try{
		await Api.put(`/cidades/${id}`, dataCity);
	}catch(error){
		return new Error((error as { message: string}).message || 'Erro ao alterar o registro');
	}
};
/**
 * PT_BR: Deleta os dados da cidade no servidor
*/
const deleteById = async (id: number) : Promise<void | Error>=> {
	try{
		await Api.delete(`/cidades/${id}`);
	}catch(error){
		return new Error((error as { message: string}).message || 'Erro ao deletar o registro');
	}
};


export const CityService = {
	getAll,
	getById,
	create,
	updateById,
	deleteById
};
