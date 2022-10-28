import React from 'react';
import ReactDOM from 'react-dom/client';
import SBProvider from "@sendbird/uikit-react/SendbirdProvider";

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
const APP_ID = "76AE2940-073F-41F6-8C14-0B3C60BABB83";
const USER_ID = "Bob_1";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SBProvider
    appId={APP_ID}
    userId={USER_ID}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </SBProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
