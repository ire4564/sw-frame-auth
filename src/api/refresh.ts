//refresh API
import checkToken from './checkToken';
import { REFRESH, REFRESH_PATH } from '../constants/api/constants';

export const refreshAPI = async (URL: string) => await checkToken(URL, REFRESH_PATH, REFRESH);

export default refreshAPI;
