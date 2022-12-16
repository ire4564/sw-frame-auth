export interface iSbAuthData {
    email: string;
    id_token?: string;
    access_token: string;
    name: string;
    imageUrl: string;
}

export interface iTokenHeader {
    [authorization: string]: string;
}

export interface iGoogleSuccessResponse {
    profileObj: {
        email: string;
        tokenId?: string;
    };
    accessToken: string;
}

export interface iSbResponse {
    status?: number;
    message: string;
}

export interface iSbBooleanResponse extends iSbResponse {
    data?: boolean | undefined;
}

export interface iSbTokenResponse extends iSbResponse {
    data?: {
        token: string;
        name?: string;
        imageUrl?: string;
        email?: string;
    };
}

export interface iSbError {
    message?: string;
    detail?: string;
    non_field_errors?: Array<string>;
    email?: string;
}
