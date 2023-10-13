import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Auth} from "aws-amplify";
import aws_exports from "./aws-exports";

Auth.configure({
    region: aws_exports.REGION,
    userPoolId: aws_exports.USER_POOL_ID,
    userPoolWebClientId: aws_exports.USER_POOL_APP_CLIENT_ID,
    oauth: {
        domain: 'trajector.auth.us-east-2.amazoncognito.com',
        scope: ['email', 'profile', 'openid', 'principal/client', "aws.cognito.signin.user.admin" ],
        redirectSignIn: 'https://dev.d36z70jfur2ljc.amplifyapp.com/loginResult',
        responseType: 'code'
    }
})

ReactDOM.render(
  <React.StrictMode>
          <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
