# sandworks-frame-auth [![Build Status](https://app.travis-ci.com/sandboxnetwork/sw-frame-auth.svg?token=q419YsQ8g4ca15Myyy25&branch=master)](https://app.travis-ci.com/sandboxnetwork/sw-frame-auth)
  

**sandworks-frame-auth** is an npm package designed to easily use components and functions related to user authentication by linking Google social login and sand auth.

  

  

## Demo

  

  

An example of **sandworks-frame-auth** is provided in the form of a component. Take a look at an example through the **mockup** below. or, you can refer to the git page using the link below. 
(https://fuzzy-waffle-522b0119.pages.github.io)
  

**`(put in this line - mockup)`**



# Prerequisites for installation (using git registry)


When downloading and using the npm package from the Git registry, the following prerequisites must be met. You must login to the registry using the command below.

Also, before you start, you need to be issued a token with read and write access to the npm package. Please refer to the link for the issuance method. (https://min9nim.vercel.app/2021-05-17-github-packages/)
**Note.** your token should check ‘write:packages’ options

First, create or change the .npmrc file with the following file contents. You will need your github authentication key to do this. (Authentication key related to npm package permission setting)

~~~
//.npmrc

@sandboxnetwork:registry=https://npm.pkg.github.com/ 
//npm.pkg.github.com/:_authToken=[YourGitHubToken]

~~~

Then use the command below to authenticate the user and login in registry,
~~~

npm login --scope=@sandboxnetwork --registry=https://npm.pkg.github.com

~~~

Please follow the instructions below for the input value that appears when you enter the above command.

~~~

name: [yourUserName]
password: [yourGitHubToken]
email: [yourGitHubEmail]

~~~

At this point you are ready to install the **sw-frame-auth** package. For commands related to npm install, follow the installation commands section at the top of the package.


# How to use

  

  

## Usage

  

  

```tsx

import { SandboxLogin } from  '@sandworks/frame-auth';
import { iLoginResponse } from  '@sandworks/fram-auth';

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


# **sbResponseHandler success callback**

- You can add a callback function to use responses from Sandbox API or function.

  

- callback function’s first parameter should be the response from Sandbox API or function. Please check ‘Responses’ chapter for further information about responses’ types.


|property name|type| definition|
|:---|:---|:---|
data|object| Sandbox Token + Detail user infomation
status|number| Status
message|string| Message


# **sbResponseHandler fail callback**

|property name|type| definition|
|:---|:---|:---|
status|number| Status
message|string| Detail error message


  

# Common Parameters

  

  

-  **clientId** (mandatory): string

  

- clientId from the Google developer console.

  

-  **URL** (mandatory): string

  

- These components and APIs contains the port address for each function.

  

- URL’s parameter should contain ‘/’ sign at the end of the address.

  

- ex) **[https://sandbox.co.kr/**index.html](https://sandbox.co.kr/**index.html) => '**[https://sandbox.co.kr/**](https://sandbox.co.kr/**)'

  

-  **sbResponseHandler** (mandatory): function

  

- Parameter for the callback function.

  

-  **render** (optional): component

  

- If there is no component entered, component will return the default components, looks like below:

  
<img width="498" alt="스크린샷 2022-03-08 오후 5 59 42" src="https://user-images.githubusercontent.com/97079582/157203500-69eff196-6a8f-43e5-88bc-0e85c9f19398.png">


-  **etc**. (optional)

  

- Using other parameters from the react-google-login is also possible.

  

- The list of optional properties are available at here.

  

  

# Usage per cases

  

  

## **Login component**

- This component provides login feature.

- This logic consists of two separate functions

- Google login from react-google-login library

- Sandbox login API  

- If the response was successful, this component will proceed following features.

- If host name is "localhost", Set the token in the local storage under the "token" name. use for "Verify API"
and not available for "Refresh API"

- If host name is ".sandworks.co.kr" and protocol is "https", Cookie will used. All APIs are available.

```tsx

<SandboxLogin
	clientId={GOOGLE_CLIENT_ID} // string
	URL={URL} // string, without port.
	sbResponseHandler={loginCallback} //callbackFunction, to handle login response.
	render={renderProps => <button  onClick={renderProps.onClick}>custom Login button</button>}
/>

```

  

  

## **Signup component**


- This component provides sign-up feature.

- This logic consists of two separate functions

- Google login from react-google-login library

- Sandbox signup API

- If the response was successful, this component will proceed following features.

- Return `true` if registration is complete, `false` otherwise.

  

  

```tsx

<SandboxSignup
	clientId={GOOGLE_CLIENT_ID} // string
	URL={URL} // string
	sbResponseHandler={signupCallback} //callbackFunction, to handle signup response.
	render={renderProps => <button  onClick={renderProps.onClick}>custom Login button</button>}
/>

```

  

  

## Verify **API**

  

  

- This API provides verification feature.

  

- User’s token will be checked by Sandbox API.

  

- If the token is still valid, [response.data](http://response.data/) will be `true`. Otherwise, it will return `false`.

  

  

```tsx

const  verifyAPI(URL: string);

```

  

  

## Refresh **API**

 

This API provides reauthentication function.

- The user's token is verified with the Sandbox API.

- After sending the existing token if the request is successful, [response.data](http://response.data/) will be a `new token.`

  
```tsx

const  refreshAPI(URL: string);

```

  

  

## Logout **function**


This function doesn’t call any API, merely clean up the saved token in local storage.


- If the operation was performed correctly, it returns `true` with a message indicating that the operation was successful, otherwise `false`.

 
```tsx

const  logoutAPI();

```

  

  

## Response

- Example success callback value


```tsx

//Signup componennt or varify API
{data: true, status: 200, message: "success message"}

//Login component
{data: {token: "user token", eamil : "sandbox@sandboxnetwork.net", name : "sandbox", imageUrl : "https://google.com/wefg/e23f3"}, status: 200, message: "success message"}

//Refresh API
{data : {token : "refresh token"}, status: 200, message: "success message"}
```

- Example fail callback value


```tsx

{status: 400, message: "Error message"}

```



# How to Run

  

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.


## Prerequisites



- node: more then v16
- vscode: more then v1.63
- npm: more then v8

## Installation


- code

    ```
    git clone https://github.com/sandboxnetwork/sw-frame-auth.git
    ```

- npm install

    ```
    cd sw-frame-auth
    npm install
    ```

## Environment Variables



Copy the contents of the env.template file to create a .env file and fill in the variable values below.

- SB_AUTH_URL: API URL to send a request
- GOOGLE_CLIENTID: GCP client_id for google login



## Dev server



```
npm run start
```

Default dev server runs at localost:3000 in browser. You can set IP and PORT in webpack.config.dev.js


## Running the tests



```
npm run test
```

### Test range
- API Test case : It was written based on messages received from Sandbox API.
- Component Test case : Check if there is a mandatory props value through snapshot.

  

  

### Built With

  

  

-  [Jest](https://jestjs.io) - Testing Framework

  

-  [Enzyme](https://enzymejs.github.io/enzyme/) - Testing utility for React

  

-  [react-google-login](https://www.npmjs.com/package/react-google-login) - Google Social Login Library

  
 # Local package test

Developers can test locally before publishing the package

build the package with the following command,
```

npm run build

```
Then package it with the command below,
```

npm pack

```
Next, move the tests into a directory in the desired environment. Then run the following command to install the local package
```

npm install [packageName] 

```

# Pre Commit
- Test cases and eslints are inspected using husky.
- Target : git add file list

# How to Deploy
- You should have permission to access the https://github.com/sandboxnetwork/sw-frame-auth
- When you merge into the master or stage branch, the deployment proceeds automatically.

**Note. Once published to a specific version, it cannot be modified.**



# License

  

  

This project is licensed under the MIT License - see the [LICENSE.md](notion://www.notion.so/sandboxinc/LICENSE.md) file for details
