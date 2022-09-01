import React, { Component } from "react";
import { ImageBackground, View } from "react-native";
import Slider from "./slider";
import layout from "./layoutRef";
import Roboticarm from "./Roboticarm";
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
      <View>
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
          <Roboticarm warpWidth={this.warpWidth}></Roboticarm>
          {/* 滑块 */}
          <Slider></Slider>
        </ImageBackground>
      </View>
    );
  }
}
