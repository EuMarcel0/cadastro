import { Environment } from "../../environment";
import Api from "../api/axios-config";


interface IlistingPeopleProps{
    id: number;
    email: string;
    cityId: number;
    fullName: string;
}

interface IDetailsPeopleProps{
    id: number;
    email: string;
    cityId: number;
    fullName: string;
}

type TPepleWithTotalCountProps = {
    data: IlistingPeopleProps[];
    totalCount: number;
}

/**
 * PT_BR: Traz todos os itens na listagem com total de registros
*/
const getAll = async ( page = 1, filter = '' ) : Promise<TPepleWithTotalCountProps | Error> => {
    const relativeURL = `/pessoas?_page=${page}&_limit${Environment.LIMIT_OF_ROWS_PER_PAGE}&nomeCompleto_like=${filter}`;
    try{
        const { data, headers } = await Api.get(relativeURL) 
        
        if( data ){
            return { 
                data,
                totalCount: Number(headers['X-Total-Count'] || Environment.LIMIT_OF_ROWS_PER_PAGE)
            };
        };
        return new Error('Erro ao consultar os registros');
    }catch ( error ){
        console.error(error)
        return new Error((error as { message: string }).message || 'Erro ao consultar os registros');
        ;
    }
};
/**
 * PT_BR: Traz dados a partir do id
*/
const getById = async (id: number ) : Promise<IDetailsPeopleProps | Error> => {
    try{
        const { data } = await Api.get(`/pessoas${id}`)

        if( data ){
            return data;
        }
        return new Error('Erro ao consultar o registro');

    }catch( error ){
        return new Error((error as { message: string }).message || 'Erro ao consultar os registros');
    }
};
/**
 * PT_BR: Cria um novo dado de pessoas no servidor
*/
const create = async (dataPeople: Omit<IDetailsPeopleProps, 'id'>) : Promise<number | Error> => {
    try{
        const { data } = await Api.post<IDetailsPeopleProps>('/pessoas', dataPeople)

        if( data ){
            return data.id;
        }
        return new Error('Erro ao criar o registro');

    }catch( error ){
        return new Error((error as { message: string }).message || 'Erro ao criar o registro');
    }
};
/**
 * PT_BR: Atualiza os dados da pessoa no servidor
*/
const updateById = async (id: number, dataPeople: IDetailsPeopleProps) : Promise<void | Error> => {
    try{
        await Api.put(`/pessoas${id}`, dataPeople)
    }catch( error ){
        return new Error((error as { message: string }).message || 'Erro ao alterar o registro');
    }
};
/**
 * PT_BR: Deleta os dados da pessoa no servidor
*/
const deleteById = async (id: number) : Promise<void | Error> => {
    try{
        await Api.delete(`/pessoas${id}`)
    }catch( error ){
        return new Error((error as { message: string }).message || 'Erro ao deletar o registro');
    }
};


export const PeopleService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};

PeopleService.getAll