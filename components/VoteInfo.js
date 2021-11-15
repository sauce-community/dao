import React, { Component } from "react";

export default class VoteInfo extends Component {
  render() {
    return (
      <div className={"col-span-1 p-8"}>
        <p className={"p-2 text-sm"}>{this.props.text}</p>
        <div className="space-y-2">
          <div className={"border-solid border-4 border-green-500 rounded-lg"}>
            <i style={{ fontSize: "32px" }} className={"bi bi-piggy-bank"}></i>
            <button className={"p-2"}>Stake Support</button>
          </div>
          <div className={"border-solid border-4 border-blue-500 rounded-lg"}>
            <i style={{ fontSize: "32px" }} className={"bi bi-people-fill"}></i>
            <button className={"p-2"}>Join Project</button>
          </div>
        </div>
      </div>
    );
  }
}
