import { AxiosError } from 'axios';
import { refreshAPI, verifyAPI } from '..';
import { iSbBooleanResponse } from '../..';
import { INVALID_URL, REFRESH, SUCCESS, VERIFY } from '../../constants/api/constants';

describe('Refresh API, Verify API', () => {
    it('Return succeed', async () => {
        localStorage.setItem('token', 'token');
        const resRefreshAPI = (await refreshAPI(process.env.SB_AUTH_URL as string)) as iSbBooleanResponse;

        expect(resRefreshAPI.data).toHaveProperty('token');
        expect(resRefreshAPI.message).toBe(`${REFRESH} ${SUCCESS}`);

        const resVerifyAPI = (await verifyAPI(process.env.SB_AUTH_URL as string)) as iSbBooleanResponse;

        expect(resVerifyAPI.data).toBe(true);
        expect(resVerifyAPI.message).toBe(`${VERIFY} ${SUCCESS}`);
    });

    it('Token is not available', async () => {
        localStorage.clear();
        try {
            await refreshAPI(process.env.SB_AUTH_URL as string);
        } catch (e) {
            const error = e as AxiosError;
            expect(error.message).toBe('Refresh Not enough segments');
        }

        try {
            await verifyAPI(process.env.SB_AUTH_URL as string);
        } catch (e) {
            const error = e as AxiosError;
            expect(error.message).toBe('Verification Not enough segments');
        }
    });

    it('Invalid URL', async () => {
        localStorage.setItem('token', 'token');
        const resRefreshAPI = await refreshAPI(INVALID_URL);
        const resVerifyAPI = await verifyAPI(INVALID_URL);

        expect(resRefreshAPI.message).toBe(`${REFRESH} ${INVALID_URL}`);
        expect(resVerifyAPI.message).toBe(`${VERIFY} ${INVALID_URL}`);
    });
});
