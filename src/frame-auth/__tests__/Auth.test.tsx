/* eslint-disable no-console */
import { mount } from 'enzyme';
import { iSbBooleanResponse, iSbTokenResponse } from '../..';
import { SandboxLogin, SandboxSignup } from '../Auth';

describe('Sandbox Auth Component', () => {
    const props = {
        sbResponseHandler: (res: iSbBooleanResponse | iSbTokenResponse) => console.log(res),
        clientId: process.env.GOOGLE_CLIENTID as string,
        URL: process.env.SB_AUTH_URL as string,
    };

    it('render sandbox login button', () => {
        const component = mount(<SandboxLogin {...props} />);
        expect(component).toMatchSnapshot();
    });

    it('render sandbox signup button', () => {
        const component = mount(<SandboxSignup {...props} />);
        expect(component).toMatchSnapshot();
    });
});
