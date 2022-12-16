import createAuthInstance from '../helper/axiosInstance';
import { iSbAuthData, iSbBooleanResponse } from './types/types';
import { SIGNUP_PATH, SIGNUP, ERROR_TYPE } from '../constants/api/constants';
import setResponseMsg from '../helper/setResponseMsg';
import getType from '../helper/getType';

export const signupAPI = async (URL: string, data: iSbAuthData) => {
    const authInstance = createAuthInstance(URL);
    const response: iSbBooleanResponse = await authInstance.post(SIGNUP_PATH, data);

    return getType(response) === ERROR_TYPE ? response : setResponseMsg(SIGNUP, response);
};

export default signupAPI;
