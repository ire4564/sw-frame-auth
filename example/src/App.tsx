import { iSbTokenResponse, iSbBooleanResponse, SandboxLogin, SandboxSignup, verifyAPI, logoutAPI, refreshAPI } from '@sandboxnetwork/sw-frame-auth';
import './App.css';

const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENTID as string;
const URL = process.env.REACT_APP_SB_AUTH_URL as string;

const loginCallback = (res: iSbTokenResponse | iSbBooleanResponse) => {
    console.log(res);
};

const checkRefresh = async (URL: string) => {
  const response = await refreshAPI(URL);
  console.log(response);
}

const checkVerify = async (URL: string) => {
  const response = await verifyAPI(URL);
  console.log(response);
}

function App() {
  return (
    <div className="App">

    <SandboxLogin
      className="Item"
      clientId={GOOGLE_CLIENT_ID}
      URL={URL}
      sbResponseHandler={loginCallback}
    />
    <SandboxSignup
      className="Item"
      clientId={GOOGLE_CLIENT_ID}
      URL={URL}
      sbResponseHandler={loginCallback}
    />
    <button onClick={() => logoutAPI()}>logout</button>
    <button onClick={() => checkRefresh(URL)}>refresh</button>
    <button onClick={() => checkVerify(URL)}>verify</button>

    </div>
  );
}

export default App;
