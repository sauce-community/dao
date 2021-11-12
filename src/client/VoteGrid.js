import React, { Component } from "react";
import VoteCard from "./VoteCard.js";
import company1logo from "./img/square.jpg";
import VoteInfo from "./VoteInfo";

export default class VoteGrid extends Component {
  render() {
    let company1text = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu varius ex, in elementum urna. Curabitur sit amet metus fermentum enim interdum tempor eget non leo. Nunc felis nulla, interdum id cursus vitae, varius quis elit. Quisque cursus in sem eget eleifend. Donec accumsan scelerisque nunc, ut ornare eros. Pellentesque lacinia interdum tincidunt. In hac habitasse platea dictumst. Nulla ultrices hendrerit enim, a sagittis diam molestie sit amet. Maecenas ac faucibus ante. Maecenas in dictum arcu, vel dapibus augue. Mauris tristique porttitor lacus, sit amet mollis elit vehicula eu.
Nunc blandit laoreet tincidunt. `;

    return (
      <div
        className={
          "grid grid-cols-1 xl:grid-cols-4 m-4 mt-64 gap-8 h-screen justify-center animate__animated animate__fadeIn"
        }
      >
        <VoteCard logo={company1logo} name="Square Inc." />
        <VoteInfo text={company1text} />
        <VoteCard logo={company1logo} name="Square Inc." />
        <VoteInfo text={company1text} />
        <VoteCard logo={company1logo} name="Square Inc." />
        <VoteInfo text={company1text} />
      </div>
    );
  }
}
