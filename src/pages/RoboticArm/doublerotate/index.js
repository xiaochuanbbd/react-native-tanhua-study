import React, { Component, useContext } from "react";
import { ImageBackground, Animated } from "react-native";
import Slider from "./slider";
import layout from "./layoutRef";
import RotateMove from "./RotateMove";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.warpWidth = 0;
    this.warpRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(async () => {
      let warpRef = await layout(this.warpRef);
      this.warpWidth = warpRef.width;
    });
  }

  render() {
    return (
      <Animated.View>
        <ImageBackground
          ref={(ref) => (this.warpRef = ref)}
          style={{
            width: 218,
            height: 215,
            position: "relative",
            padding: 0,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
          source={require("./img/bg_arm.png")}
        >
          <RotateMove
            warpWidth={this.warpWidth}
            actionChange={this.props.actionChange}
          ></RotateMove>
          {/* 滑块 */}
          <Slider actionChange={this.props.actionChange}></Slider>
        </ImageBackground>
      </Animated.View>
    );
  }
}
