import React, { Component } from 'react';
import './app.css';

export default class NavBar extends Component {
  render() {
    return (
    <div className={"container mx-auto space-x-12 pt-12 sticky top-0"}>
            <a href="/">Home</a>
            <a href="/">Mint</a>
            <a href="/">Team</a>
    </div>
    );
  }
}



