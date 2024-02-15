import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import NewsRoute from './components/NewsRoute';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            < div className="app-container">

                <NewsRoute />
            </div>
        );
    }
}