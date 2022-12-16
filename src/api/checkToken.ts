import createAuthInstance from '../helper/axiosInstance';
import setResponseMsg from '../helper/setResponseMsg';
import { iSbBooleanResponse } from './types/types';
import { web } from './config';

const checkToken = async (URL: string, path: string, apiName: string) => {
    const token = web.localStorage();
    const checkTokenInstance = createAuthInstance(URL);
    checkTokenInstance.defaults.headers['authorization'] = token;

    const response: iSbBooleanResponse = await checkTokenInstance.get(path);
    return setResponseMsg(apiName, response);
};

export default checkToken;
