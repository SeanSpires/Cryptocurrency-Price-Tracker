import * as React from 'react';
import { BrowserRouter, Redirect, Route } from 'react-router-dom';
import App from './App'
import { Header } from './components/Header';
import './css/styles.css';
import CryptoList from './components/CryptoList';

export const AppRouter: React.StatelessComponent<{}> = () => {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <main>
                    <Route exact={true} path="/" component={App} />
                    <Route path="/CryptoList" component={CryptoList} />
                    <Redirect from='*' to='/' />
                </main>
            </div>
        </BrowserRouter>
    );
}