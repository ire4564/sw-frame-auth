import axios from 'axios';
import { handleRequestError, handleResponseData, handleResponseError } from './axiosInterceptors';
import { AUTH_INSTANCE_TIMEOUT } from '../constants/api/constants';

export default function createAuthInstance(URL: string) {
    const instance = axios.create({
        baseURL: URL,
        timeout: AUTH_INSTANCE_TIMEOUT,
        withCredentials: true,
    });

    instance.interceptors.response.use(handleRequestError);
    instance.interceptors.response.use(handleResponseData, handleResponseError);

    return instance;
}
