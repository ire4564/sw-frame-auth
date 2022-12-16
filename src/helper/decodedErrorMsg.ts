import { iSbError } from '..';
import { UNKNOWN_TYPE } from '../constants/api/constants';

const decodedErrMsg = (response: iSbError | string) => {
    try {
        const message =
            typeof response !== 'string'
                ? response.message ||
                  response.detail ||
                  response.email ||
                  (Array.isArray(response.non_field_errors) ? response.non_field_errors[0] : undefined)
                : response;

        if (!message) {
            throw new Error();
        }
        return message;
    } catch (e) {
        return UNKNOWN_TYPE;
    }
};

export default decodedErrMsg;
