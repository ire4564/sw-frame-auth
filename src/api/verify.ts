import checkToken from './checkToken';
import { VERIFY, VERIFY_PATH } from '../constants/api/constants';

export const verifyAPI = async (URL: string) => await checkToken(URL, VERIFY_PATH, VERIFY);

export default verifyAPI;
