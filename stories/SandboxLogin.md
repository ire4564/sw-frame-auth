# How to Use

## Usage

```tsx
import { SandboxLogin } from '@sandworks/frame-auth';
import { iLoginResponse } from '@sandworks/fram-auth';

const responseSandbox = (res: iSbBooleanResponse | iSbTokenResponse) => {
    console.log(res);
};

ReactDOM.render(
    <SandboxLogin
        clientId="6436342323-c5u6yh5bagvk87omq4isihu2h9reffi0b5.apps.googleusercontent.com"
        URL="<http://localhost:8008>"
        sbResponseHandler={responseSandbox}
    />,
    document.getElementById('sandbox-button')
);
```

## **Custom styling**

```tsx
ReactDOM.render(
    <SandboxLogin
        clientId="6436342323-c5u6yh5bagvk87omq4isihu2h9reffi0b5.apps.googleusercontent.com"
        URL="<http://localhost:8008>"
        sbResponseHandler={responseSandbox}
        render={renderProps => <button onClick={renderProps.onClick}>custom login button</button>}
    />,

    document.getElementById('sandbox-button')
);
```

# Props

-   **clientId** (mandatory): string

    -   clientId from the Google developer console.

-   **URL** (mandatory): string

    -   These components and APIs contains the port address for each function.

    -   URL’s parameter should contain ‘/’ sign at the end of the address.

-   **sbResponseHandler** (mandatory): function

    -   Parameter for the callback function.

-   **render** (optional): component for custom styling

-   **etc**. (optional)

    -   Using other parameters from the [react-google-login](https://github.com/anthonyjgrove/react-google-login) is also possible.

# **sbResponseHandler success callback**

-   You can add a callback function to use responses from Sandbox API or function.

-   callback function’s first parameter should be the response from Sandbox API or function. Please check ‘Responses’ chapter for further information about responses’ types.

| property name | type   | definition                             |
| :------------ | :----- | :------------------------------------- |
| data          | object | Sandbox Token + Detail user infomation |
| status        | number | Status                                 |
| message       | string | Detail Message                         |

## Response

-   Example success callback value

```tsx
{
    data: {
        token: "user token",
        eamil : "sandbox@sandboxnetwork.net",
        name : "sandbox",
        imageUrl : "https://google.com/wefg/e23f3"
    },
    status: 200,
    message: "Success message"
}

```

# **sbResponseHandler fail callback**

| property name | type   | definition           |
| :------------ | :----- | :------------------- |
| status        | number | Status               |
| message       | string | Detail error message |

## Response

-   Example fail callback value

```tsx
{
    status: 400,
    message: "Error message"
}

```
