import {
    FAIL,
    INVALID_URL,
    LOGIN,
    LOGIN_PATH,
    SERVER_ERROR,
    SUCCESS,
    UNKNOWN_TYPE,
} from '../../constants/api/constants';
import mock from '../../setupJest';
import loginAPI from '../login';
import { iSbTokenResponse } from '../types/types';

describe('Login API', () => {
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

    it('Return succeed', async () => {
        const { data, message } = (await loginAPI(process.env.SB_AUTH_URL as string, options)) as iSbTokenResponse;
        expect(data).toHaveProperty('token');
        expect(message).toBe(`${LOGIN} ${SUCCESS}`);
    });

    it('Invalid URL', async () => {
        const { message } = await loginAPI(INVALID_URL, options);
        expect(message).toBe(`${LOGIN} ${INVALID_URL}`);
    });

    it('Not found response data', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${LOGIN_PATH}`).reply(200);
        const { message } = await loginAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${LOGIN} ${FAIL}`);
    });

    it('Return response message error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${LOGIN_PATH}`).reply(400, { message: ERR_MESSAGE });
        const { message } = await loginAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${LOGIN} ${ERR_MESSAGE}`);
    });

    it('Return response detail error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${LOGIN_PATH}`).reply(400, { detail: ERR_MESSAGE });
        const { message } = await loginAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${LOGIN} ${ERR_MESSAGE}`);
    });

    it('Return response non_field_errors error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${LOGIN_PATH}`).reply(400, { non_field_errors: [ERR_MESSAGE] });
        const { message } = await loginAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${LOGIN} ${ERR_MESSAGE}`);
    });

    it('Return response exeption error', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${LOGIN_PATH}`).reply(400, { exeption: 'error' });
        const { message } = await loginAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${LOGIN} ${UNKNOWN_TYPE}`);
    });

    it('500 error return message "Login server error"', async () => {
        mock.onPost(`${process.env.SB_AUTH_URL}${LOGIN_PATH}`).reply(500);
        const { message } = await loginAPI(process.env.SB_AUTH_URL as string, options);
        expect(message).toBe(`${LOGIN} ${SERVER_ERROR}`);
    });
});
