import { iSbBooleanResponse, iSbTokenResponse } from '../api/types/types';

const setResponseMsg = (apiName: string, response: iSbBooleanResponse | iSbTokenResponse) => {
    const result: string = response.message;

    response.message = `${apiName} ${result}`;

    return response;
};

export default setResponseMsg;
