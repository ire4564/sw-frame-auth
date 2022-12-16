import { LOGOUT, SUCCESS, FAIL, STATUS_OK, STATUS_CLIENT_FAIL } from '../constants/api/constants';

export const logoutAPI = () => {
    const token = localStorage.getItem('token');
    if (token) {
        localStorage.removeItem('token');
        return {
            data: true,
            status: STATUS_OK,
            message: `${LOGOUT} ${SUCCESS}`,
        };
    } else {
        return {
            data: false,
            status: STATUS_CLIENT_FAIL,
            message: `${LOGOUT} ${FAIL}`,
        };
    }
};

export default logoutAPI;
