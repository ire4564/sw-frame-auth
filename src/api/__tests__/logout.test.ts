import { logoutAPI } from '..';
import { FAIL, LOGOUT, SUCCESS } from '../../constants/api/constants';

describe('Logout API', () => {
    it('Return success', async () => {
        localStorage.setItem('token', 'token');
        const { message } = await logoutAPI();
        expect(message).toBe(`${LOGOUT} ${SUCCESS}`);
    });

    it('Return fail', async () => {
        const { message } = await logoutAPI();
        expect(message).toBe(`${LOGOUT} ${FAIL}`);
    });
});
