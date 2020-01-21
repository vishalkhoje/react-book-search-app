import React, { Component } from 'react';
import './App.css';
import Searchbar from './Components/Searchbar';

export default class App extends Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="header clearfix mt-5">
                    <h3 className="text-muted">Book Search</h3>
                </div>
                <div className="container-wrapper">
                    <Searchbar />
                </div>
            </div>
        )
    }
}