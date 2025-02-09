import './css/style.css'; // Importar Tailwind
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import AuthProvider from './context/AuthContext';
import Notification from './components/Notifications';
import {Provider} from "react-redux"
import {store }from "./redux/store"
const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
    <Provider store={store}>
        <BrowserRouter>
        <AuthProvider>
            <Notification>
            
            <App />
            </Notification>
            </AuthProvider>
        </BrowserRouter> 

        </Provider> 
);