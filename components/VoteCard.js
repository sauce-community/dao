import React, { Component } from "react";

export default class VoteCard extends Component {
  render() {
    return (
      <div className={"border-solid border-2 border-white rounded-xl p-8"}>
        <h1 style={{ fontSize: "32px" }} className={"p-8"}>
          {this.props.name}
        </h1>
        <div class="grid place-items-center m-4">
          <img
            src={this.props.logo}
            className={"object-center"}
            style={{ maxWidth: "128px", maxHeight: "128px" }}
            alt="Logo"
          />
        </div>
        <i
          style={{
            fontSize: "64px",
            width: "50%",
            color: "DarkSeaGreen",
          }}
          className={"m-4 bi bi-chevron-double-up"}
        ></i>
        <i
          style={{ fontSize: "64px", width: "50%", color: "FireBrick" }}
          className={"m-4 bi bi-chevron-double-down"}
        ></i>
        <p className="p-4">$75 / day</p>
      </div>
    );
  }
}
