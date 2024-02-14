import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './custom.css';
import Routing from './components/Routing';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            < div className="app-container">
                <Routing/>
            </div>
        );
    }
}