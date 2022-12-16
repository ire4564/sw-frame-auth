/* eslint-disable @typescript-eslint/no-explicit-any */
import { iSbBooleanResponse, iSbTokenResponse } from '../..';

export interface iAuth {
    sbResponseHandler: (response: iSbBooleanResponse | iSbTokenResponse) => void;
    render?: (renderProps: { onClick: () => void }) => JSX.Element;
    clientId: string;
    [x: string]: any;
}
