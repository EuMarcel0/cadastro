import { Environment } from '../../../environment';
import { errorInterceptor, responseInterceptor } from './interceptors';

import  axios  from 'axios';

const Api = axios.create({
	baseURL: Environment.BASE_URL,
});

Api.interceptors.response.use(
	(response) => responseInterceptor(response),
	(error) => errorInterceptor(error)
);

export default Api;
