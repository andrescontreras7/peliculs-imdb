import axios from 'axios';
import { BASE_URL } from './bse';

const createAxiosInstance = (url, customHeaders = {'X-Custom-Header': 'foobar'}) => {
    
    return axios.create({
        baseURL: `${BASE_URL}/${url}`,
        headers: customHeaders,
        params: {
            api_key:'1ef52568a1e1fd90ff0ab4bc2c4d2a76'
        }
    });
};

export default createAxiosInstance;