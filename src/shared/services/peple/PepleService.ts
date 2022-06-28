import { Environment } from "../../environment";
import Api from "../api/axios-config";


interface IlistingPepleProps{
    id: number;
    email: string;
    cityId: number;
    fullName: string;
}

interface IDetailsPepleProps{
    id: number;
    email: string;
    cityId: number;
    fullName: string;
}

type TPepleWithTotalCountProps = {
    data: IlistingPepleProps[];
    totalCount: number;
}

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


const getById = async (page = 1, filter = 'id' ) : Promise<TPepleWithTotalCountProps | Error> => {
    const relativeURL = `/pessoas?_page=${page}&_limit${Environment.LIMIT_OF_ROWS_PER_PAGE}&id_like=${filter}`;
    try{
        const {data, headers} = await Api.get(relativeURL)

        if(data){
            return{
                data,
                totalCount: Number(headers['X-Total-Count'] || Environment.LIMIT_OF_ROWS_PER_PAGE)
            };
        }
        return new Error('Erro ao consultar os registros');

    }catch( error ){
        return new Error((error as { message: string }).message || 'Erro ao consultar os registros');
    }
};
const create = () => {

};
const updateById = () => {

};
const deleteById = () => {

};


export const PepleService = {
    getAll,
    getById,
    create,
    updateById,
    deleteById,
};