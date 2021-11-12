import React, { Component } from "react";
import "./app.css";
import "animate.css";
import VoteCard from "./VoteCard.js";
import Header from "./Header.js";
import company1logo from "./img/square.jpg";

export default class App extends Component {
  render() {
    let company1text =
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu varius ex, in elementum urna. Curabitur sit amet metus fermentum enim interdum tempor eget non leo. Nunc felis nulla, interdum id cursus vitae, varius quis elit. Quisque cursus in sem eget eleifend. Donec accumsan scelerisque nunc, ut ornare eros. Pellentesque lacinia interdum tincidunt. In hac habitasse platea dictumst. Nulla ultrices hendrerit enim, a sagittis diam molestie sit amet. Maecenas ac faucibus ante. Maecenas in dictum arcu, vel dapibus augue. Sed augue mi, commodo eu elementum ac, elementum id mauris. Mauris tristique porttitor lacus, sit amet mollis elit vehicula eu.
Nunc blandit laoreet tincidunt. Maecenas ultrices maximus risus non vulputate. Aliquam sem sem, vehicula bibendum odio vitae, efficitur dictum lectus. Duis placerat euismod arcu, vitae consequat libero ullamcorper eget. Sed scelerisque facilisis magna, a sollicitudin diam venenatis a. Quisque ultrices vitae odio sit amet mollis. Vestibulum condimentum lacus at arcu molestie consectetur. Suspendisse porttitor porta volutpat. Praesent congue diam et velit tempor, a sodales ex mollis. Phasellus condimentum turpis vitae dignissim pulvinar. Nam orci tellus, vulputate nec elit vel, convallis elementum lacus. In eget urna at nisl auctor consequat quis eget dolor.` +
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eu varius ex, in elementum urna. Curabitur sit amet metus fermentum enim interdum tempor eget non leo. Nunc felis nulla, interdum id cursus vitae, varius quis elit. Quisque cursus in sem eget eleifend. Donec accumsan scelerisque nunc, ut ornare eros. Pellentesque lacinia interdum tincidunt. In hac habitasse platea dictumst. Nulla ultrices hendrerit enim, a sagittis diam molestie sit amet. Maecenas ac faucibus ante. Maecenas in dictum arcu, vel dapibus augue. Sed augue mi, commodo eu elementum ac, elementum id mauris. Mauris tristique porttitor lacus, sit amet mollis elit vehicula eu.
Nunc blandit laoreet tincidunt. Maecenas ultrices maximus risus non vulputate. Aliquam sem sem, vehicula bibendum odio vitae, efficitur dictum lectus. Duis placerat euismod arcu, vitae consequat libero ullamcorper eget. Sed scelerisque facilisis magna, a sollicitudin diam venenatis a. Quisque ultrices vitae odio sit amet mollis. Vestibulum condimentum lacus at arcu molestie consectetur. Suspendisse porttitor porta volutpat. Praesent congue diam et velit tempor, a sodales ex mollis. Phasellus condimentum turpis vitae dignissim pulvinar. Nam orci tellus, vulputate nec elit vel, convallis elementum lacus. In eget urna at nisl auctor consequat quis eget dolor.`;

    return (
      <div id={"App"} className={"h-screen"}>
        <Header />

        <div
          className={
            "grid grid-cols-1 gap-4 h-screen justify-center m-12 pt-8 animate__animated animate__fadeIn"
          }
        >
          <VoteCard
            logo={company1logo}
            name="Square Inc."
            text={company1text}
          />
          <VoteCard
            logo={company1logo}
            name="Square Inc."
            text={company1text}
          />
          <VoteCard
            logo={company1logo}
            name="Square Inc."
            text={company1text}
          />
        </div>
      </div>
    );
  }
}
