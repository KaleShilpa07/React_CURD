import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
//import StudentCurd from './components/StudentCurd';
import './custom.css';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';

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