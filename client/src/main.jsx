import React from 'react';

import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthProvider.jsx';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <AuthProvider>
         <Provider store={store}>
            <App />
         </Provider>
      </AuthProvider>
   </React.StrictMode>,
);
