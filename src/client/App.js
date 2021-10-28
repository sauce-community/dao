import React, { Component } from 'react';
import './app.css';
import NavBar from './NavBar.js'
import Section from './Section.js'
export default class App extends Component {
  render() {
    return (
      <div id={"App"} className={"h-screen"}>
        <NavBar></NavBar>

        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>
        <Section></Section>
      </div>
    );
  }
}
