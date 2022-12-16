import { iSbBooleanResponse } from '../..';
import {
    FAIL,
    INVALID_URL,
    SERVER_ERROR,
    SIGNUP,
    SIGNUP_PATH,
    SUCCESS,
    UNKNOWN_TYPE,
} from '../../constants/api/constants';
import mock from '../../setupJest';
import signupAPI from '../signup';

describe('Signup API', () => {
    const options = {
        email: 'gildong@sandbox.net',
        id_token: 'token',
        access_token: 'accessToken',
        name: 'hong gil dong',
        imageUrl: 'https://googleuerContsnets.com',
    };
    const ERR_MESSAGE = 'err message';

    afterAll(() => {
        mock.reset();
    });

    it('Return success', async () => {
        const { data, message } = (await signupAPI(process.env.SB_AUTH_URL as string, options)) as iSbBooleanResponse;
        expect(data).toBe(true);
        expect(message).toBe(`${SIGNUP} ${SUCCESS}`);
    });

    it('Invalid URL', async () => {
        const { message } = await signupAPI(INVALID_URL, options);
        expect(message).toBe(`${SIGNUP} ${INVALID_URL}`);
    });

    it('Not found response data', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${SIGNUP_PATH}`).reply(200);
        const { data, message } = (await signupAPI(process.env.SB_AUTH_URL as string, options)) as iSbBooleanResponse;
        expect(data).toBe(undefined);
        expect(message).toBe(`${SIGNUP} ${FAIL}`);
    });

    it('Return response message error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${SIGNUP_PATH}`).reply(400, { message: ERR_MESSAGE });
        const { message } = await signupAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${SIGNUP} ${ERR_MESSAGE}`);
    });

    it('Return response detail error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${SIGNUP_PATH}`).reply(400, { detail: ERR_MESSAGE });
        const { message } = await signupAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${SIGNUP} ${ERR_MESSAGE}`);
    });

    it('Return response non_field_errors error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${SIGNUP_PATH}`).reply(400, { non_field_errors: [ERR_MESSAGE] });
        const { message } = await signupAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${SIGNUP} ${ERR_MESSAGE}`);
    });

    it('Return response exeption error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${SIGNUP_PATH}`).reply(400, { exeption: ERR_MESSAGE });
        const { message } = await signupAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${SIGNUP} ${UNKNOWN_TYPE}`);
    });

    it('500 error return message "Login server error"', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${SIGNUP_PATH}`).reply(500);
        const { message } = await signupAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${SIGNUP} ${SERVER_ERROR}`);
    });
});
