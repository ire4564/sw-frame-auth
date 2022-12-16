import { AxiosResponse, AxiosRequestConfig, AxiosError } from 'axios';
import { SERVER_ERROR, FAIL, SUCCESS, STATUS_SERVER_FAIL, INVALID_URL } from '../constants/api/constants';
import decodedErrMsg from './decodedErrorMsg';
import { isUri } from 'valid-url';

export const handleRequestError = (err: AxiosRequestConfig) => err;

export const handleResponseData = (response: AxiosResponse) => {
    const responseResult = response.data;
    const statusCode = response.status;

    if (responseResult) {
        return {
            data: responseResult,
            status: statusCode,
            message: SUCCESS,
        };
    } else {
        return {
            data: responseResult,
            status: statusCode,
            message: FAIL,
        };
    }
};

export const handleResponseError = (err: AxiosError) => {
    const validUrl = isUri(err.config.baseURL as string);

    if (!validUrl) {
        return {
            message: INVALID_URL,
        };
    }

    if (!err.response) {
        return {
            message: err.message,
        };
    }

    if (err.response.status !== STATUS_SERVER_FAIL) {
        return {
            status: err.response.status,
            message: decodedErrMsg(err.response.data),
        };
    }

    return {
        status: STATUS_SERVER_FAIL,
        message: SERVER_ERROR,
    };
};
