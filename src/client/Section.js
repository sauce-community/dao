import React, { Component } from 'react';
import './app.css';

export default class Section extends Component {
  render() {
    return (
      <section className={"m-24 contrast-150"} id={"Section"}>
          <p>
            {this.props.text}
          </p>
      </section>
    );
  }
}
