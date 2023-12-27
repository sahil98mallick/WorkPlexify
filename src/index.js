import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthManager } from './Components/AuthManager/AuthManager';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthManager>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </AuthManager>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
