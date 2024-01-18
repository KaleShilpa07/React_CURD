import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import StudentCurd from './components/StudentCurd';
import './custom.css';
import { Layout } from './components/Layout';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <>
           
                <StudentCurd></StudentCurd>          </>
        );
    }
}