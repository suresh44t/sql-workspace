import React from 'react';
import App from './App'; 
import { createRoot } from 'react-dom/client'; 
import { Provider } from 'react-redux'; 
import { store } from './store'; 
import { reportWebVitals } from './utils'; 

const container = document.getElementById('root'); 
if (!container) {throw new Error('Failed to find the root element');} 
const root = createRoot(container); 

root.render( 
  <React.StrictMode> 
    <Provider store={store}> 
      <App /> 
    </Provider> 
  </React.StrictMode> 
); 

// If you want to start measuring performance in your app, pass a function 
// to log results (for example: reportWebVitals(console.log)) 
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals 
// Report web vitals with console logging 
reportWebVitals(console.log);
