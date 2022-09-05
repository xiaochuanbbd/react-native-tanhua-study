import React, { Component } from "react";
import Canvas from "react-native-canvas";
export default class index extends Component {
  handleCanvas = (canvas) => {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "red";
    ctx.fillRect(100, 50, 400, 200);
  };
  render() {
    return <Canvas ref={this.handleCanvas}></Canvas>;
  }
}
