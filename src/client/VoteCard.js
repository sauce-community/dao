import React, { Component } from "react";

export default class VoteCard extends Component {
  render() {
    return (
      <div className={"grid grid-cols-4 gap-4 justify-center p-8 p-4"}>
        <div className={"border-solid border-4 border-white rounded-lg"}>
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
          <p className="p-4 pt-8">$75 / day</p>
        </div>
        <div className={"col-span-3 p-8"}>
          <p>{this.props.text}</p>
          <div className="m-12 space-x-12">
            <div
              className={
                "inline border-solid border-4 border-green-500 rounded-lg p-6"
              }
            >
              <i
                style={{ fontSize: "32px" }}
                className={"bi bi-piggy-bank"}
              ></i>
              <button className={"p-2"}>Stake Support</button>
            </div>
            <div
              className={
                "inline border-solid border-4 border-blue-500 rounded-lg p-6"
              }
            >
              <i
                style={{ fontSize: "32px" }}
                className={"bi bi-people-fill"}
              ></i>
              <button className={"p-2"}>Join Project</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
