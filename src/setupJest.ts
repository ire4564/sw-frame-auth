import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LOGIN_PATH, REFRESH_PATH, SIGNUP_PATH, VERIFY_PATH } from './constants/api/constants';
import { SUCCESS_LOGIN_DATA, SUCCES_REFRESH_DATA } from './constants/mockedJsonData';

global.React = React;

Enzyme.configure({ adapter: new Adapter() });
const mock = new MockAdapter(axios);

mock.onPost(`${process.env.SB_AUTH_URL}${LOGIN_PATH}`).reply(200, SUCCESS_LOGIN_DATA);
mock.onPost(`${process.env.SB_AUTH_URL}${SIGNUP_PATH}`).reply(200, true);
mock.onGet(`${process.env.SB_AUTH_URL}${VERIFY_PATH}`).reply(200, true);
mock.onGet(`${process.env.SB_AUTH_URL}${REFRESH_PATH}`).reply(200, SUCCES_REFRESH_DATA);

export default mock;
