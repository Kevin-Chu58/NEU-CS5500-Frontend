import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import './index.scss';
import App from './App';

let domain = process.env.REACT_APP_AUTH0_DOMAIN;
let clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
let audience = process.env.REACT_APP_AUTH0_AUDIENCE;

// 自定义重定向回调
const onRedirectCallback = (appState) => {
  // 如果有保存的URL，则导航到该URL，否则导航到根路径
  window.history.replaceState({}, 
    document.title,
    appState?.returnTo || window.location.pathname
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
            domain={domain}
            clientId={clientId}
            audience={audience}
            authorizationParams={{
                redirect_uri: window.location.origin + window.location.pathname,
            }}
            onRedirectCallback={onRedirectCallback}
            useRefreshTokens={true}
            cacheLocation="localstorage"
        >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>
);
