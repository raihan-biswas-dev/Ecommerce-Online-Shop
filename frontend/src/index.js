import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import { StoreProvider } from './Store';
import App from './App';

ReactDOM.render(
    <StoreProvider>
        <HelmetProvider>
            <App />
        </HelmetProvider>
    </StoreProvider>, document.getElementById('root'));
