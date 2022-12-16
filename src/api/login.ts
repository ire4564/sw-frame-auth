import createAuthInstance from '../helper/axiosInstance';
import { LOGIN_PATH, LOGIN } from '../constants/api/constants';
import { iSbAuthData, iSbTokenResponse } from './types/types';
import setResponseMsg from '../helper/setResponseMsg';
import hasProperty from '../helper/hasProperty';
import { web } from './config';

export const loginAPI = async (URL: string, data: iSbAuthData) => {
    const authInstance = createAuthInstance(URL);
    const response: iSbTokenResponse = await authInstance.post(LOGIN_PATH, data);
    const resData = hasProperty<iSbTokenResponse>(response);

    if (resData && typeof response.data?.token === 'string') {
        web.setting(response.data.token);
        response.data.email = data.email;
        response.data.imageUrl = data.imageUrl;
        response.data.name = data.name;
    }

    return setResponseMsg(LOGIN, response);
};

export default loginAPI;
