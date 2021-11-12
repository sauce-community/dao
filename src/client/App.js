import React, { Component } from "react";
import { render } from "react-dom";
import { Router, Link } from "@reach/router";
import "animate.css";

import "./app.css";
import Header from "./Header.js";
import VoteGrid from "./VoteGrid.js";
import Home from "./Home";
export default class App extends Component {
  render() {
    return (
      <div id={"App"} className={"h-screen"}>
        <Router>
          <Home path="/" />
          <Vote path="vote" />
          <Propose path="propose" />
        </Router>
      </div>
    );
  }
}

function Vote() {
  return (
    <div>
      <Header />
      <div className={"grid grid-cols-8 gap-4"}>
        <div className="flex flex-col h-screen bg-black fixed items-center p-2 space-y-12">
          {/* <Link/> */}
          <div className={"flex-grow"}></div>
          <Link to="/vote">
            <i style={{ fontSize: "32px" }} className={"bi bi-bank m-2"}></i>
          </Link>
          <Link to="/">
            <i style={{ fontSize: "32px" }} className={"bi bi-house m-2"}></i>
          </Link>
          <Link to="/propose">
            <i
              style={{ fontSize: "32px" }}
              className={"bi bi-pencil-square m-2"}
            ></i>
          </Link>
          <div className={"flex-grow"}></div>
        </div>
        <div className={"col-start-2 col-end-9"}>
          <VoteGrid />
        </div>
      </div>
    </div>
  );
}

function Propose() {
  return (
    <div>
      <Header />
      <div className={"grid grid-cols-8 gap-4"}>
        <div className="flex flex-col h-screen bg-black fixed items-center p-2 space-y-12">
          {/* <Link/> */}
          <div className={"flex-grow"}></div>
          <Link to="/vote">
            <i style={{ fontSize: "32px" }} className={"bi bi-bank m-2"}></i>
          </Link>
          <Link to="/">
            <i style={{ fontSize: "32px" }} className={"bi bi-house m-2"}></i>
          </Link>
          <Link to="/propose">
            <i
              style={{ fontSize: "32px" }}
              className={"bi bi-pencil-square m-2"}
            ></i>
          </Link>
          <div className={"flex-grow"}></div>
        </div>
        <div className={"col-start-2 col-end-9"}>
          <p>Content</p>
        </div>
      </div>
    </div>
  );
}
