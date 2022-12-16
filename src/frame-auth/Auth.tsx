import AuthComponent from '../components/AuthComponent';
import { iAuth } from '../components/types/types';
import loginAPI from '../api/login';
import signupAPI from '../api/signup';

export const SandboxLogin: React.FunctionComponent<iAuth> = ({ sbResponseHandler, clientId, ...props }) => (
    <AuthComponent
        sbResponseHandler={sbResponseHandler}
        clientId={clientId}
        API={loginAPI}
        buttonText="Login with Sandbox"
        {...props}
    />
);

export const SandboxSignup: React.FunctionComponent<iAuth> = ({ sbResponseHandler, clientId, ...props }) => (
    <AuthComponent
        sbResponseHandler={sbResponseHandler}
        clientId={clientId}
        API={signupAPI}
        buttonText="Sign up with Sandbox"
        {...props}
    />
);
