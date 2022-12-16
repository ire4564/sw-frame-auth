/* eslint-disable indent */
import GoogleLogin, { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { iAuth } from './types/types';
import SandboxLogo from '../image/SandboxLogo';
import { INVALID_URL } from '../constants/api/constants';

const AuthComponent: React.FunctionComponent<iAuth> = ({ sbResponseHandler, clientId, buttonText, API, ...props }) => {
    const { URL, render } = props;

    const resGoogle = async (res: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        const googleRes = res as GoogleLoginResponse;
        const data = {
            email: googleRes.profileObj.email,
            id_token: googleRes.tokenId,
            access_token: googleRes.accessToken,
            name: googleRes.profileObj.name,
            imageUrl: googleRes.profileObj.imageUrl,
        };

        try {
            const response = await API(URL, data);
            sbResponseHandler(response);
        } catch (error) {
            sbResponseHandler({
                message: INVALID_URL,
                status: 404,
            });
        }
    };

    return (
        <>
            <GoogleLogin
                clientId={clientId}
                render={
                    render
                        ? render
                        : renderProps => (
                              <button
                                  style={{
                                      fontSize: '14px',
                                      color: '#4e4c4c',
                                      backgroundColor: '#fff',
                                      border: '1px solid transparent',
                                      borderRadius: '10px',
                                      boxShadow: 'rgb(0 0 0 / 24%) 0px 2px 2px 0px, rgb(0 0 0 / 24%) 0px 0px 1px 0px',
                                      fontWeight: 500,
                                      padding: '5px',
                                      cursor: 'pointer',
                                      display: 'flex',
                                  }}
                                  onClick={renderProps.onClick}
                              >
                                  <SandboxLogo></SandboxLogo>
                                  {buttonText}
                              </button>
                          )
                }
                onSuccess={resGoogle}
                onFailure={err => sbResponseHandler({ status: 500, message: err })}
                {...props}
            />
        </>
    );
};

export default AuthComponent;
