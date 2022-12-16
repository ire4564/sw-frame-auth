/* eslint-disable no-console */
import { iSbBooleanResponse, iSbTokenResponse, SandboxLogin, SandboxSignup, refreshAPI, verifyAPI, web } from '../src';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENTID as string;
const URL = process.env.SB_AUTH_URL as string;

function App() {
    const callBack = (res: iSbTokenResponse | iSbBooleanResponse) => {
        console.log(res);
    };

    const callBackRefresh = async () => {
        const result = await refreshAPI(URL);
        console.log(result);
    };

    const callBackVerify = async () => {
        const result = await verifyAPI(URL);
        console.log(result);
    };

    const getTokenLocalStorage = () => {
        const token = web.localStorage();
        console.log(token);
    };

    return (
        <>
            <SandboxLogin clientId={GOOGLE_CLIENT_ID} URL={URL} sbResponseHandler={callBack} />
            <SandboxSignup clientId={GOOGLE_CLIENT_ID} URL={URL} sbResponseHandler={callBack} />
            <button onClick={callBackRefresh}>refresh</button>
            <button onClick={callBackVerify}>verify</button>
            <button onClick={getTokenLocalStorage}>get localStorage token</button>
        </>
    );
}

export default App;
