import React, { Component } from "react";
import "./app.css";
import "animate.css";
import Header from "./Header.js";
import VoteGrid from "./VoteGrid.js";
export default class App extends Component {
  render() {
    return (
      <div id={"App"} className={"h-screen"}>
        <Header />
        <VoteGrid />
      </div>
    );
  }
}
