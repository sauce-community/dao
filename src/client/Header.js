import React, { Component } from "react";

export default class Header extends Component {
  render() {
    return (
      <div className={"grid grid-cols-6 p-4 fixed z-10 top-0 bg-black w-full"}>
        <h1 className={"grid-span-2 p-4 text-lg font-bold"}>
          Open Source Society
        </h1>
        <button
          className={
            "col-start-5 col-end-7 md:col-start-6 md:col-end-7 border-solid border-4 border-white rounded-xl p-4"
          }
        >
          Connect Wallet
        </button>
      </div>
    );
  }
}
