import React, { Component, useState, useRef, useEffect } from "react";
import {
  Animated,
  TouchableOpacity,
  PanResponder,
  Image,
  View,
} from "react-native";
import layoutRef from "./layoutRef";
class Slider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pan: -8,
    };
    this.sliderBlockMaxWidth = 0;
    this.sliderBlockWidth = 0;
    this.lastX = -8;
    this.sliderRef = React.createRef();
    this.sliderBlockRef = React.createRef();
  }
  componentDidMount() {
    setTimeout(async () => {
      const ref = await layoutRef(this.sliderRef);
      const sliderBlockRef = await layoutRef(this.sliderBlockRef);
      this.sliderBlockMaxWidth = ref.width / 2;
      this.sliderBlockWidth = sliderBlockRef.width;
    });
  }
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      return true;
    },
    //开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderMove: (event, gestureState) => {
      let x = gestureState.dx;
      let panX = this.lastX + x;
      if (panX > this.sliderBlockMaxWidth - this.sliderBlockWidth) {
        panX = this.sliderBlockMaxWidth - this.sliderBlockWidth;
      }
      if (panX < -this.sliderBlockMaxWidth) {
        panX = -this.sliderBlockMaxWidth;
      }
      this.setState({ pan: panX });
    },

    onPanResponderRelease: (e, gestureState) => {
      const { pan } = this.state;
      this.lastX = pan;
    },
  });

  render() {
    const { pan } = this.state;
    return (
      <View
        style={{
          position: "absolute",
          left: 8,
          bottom: 2,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderTopColor: "#e2e2e2",
          borderTopWidth: 1,
        }}
      >
        <View
          ref={(ref) => (this.sliderRef = ref)}
          style={{
            position: "relative",
            width: 154,
            height: 10,
            backgroundColor: "#fff",
            borderRadius: 4,
            borderWidth: 2,
            borderColor: "#b3d1ff",
            marginRight: 8,
          }}
        >
          <Image
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: [{ translateX: -2 }, { translateY: -20 }],
              width: 4,
              height: 40,
            }}
            source={require("./img/bg_horizontal_arm_line.png")}
          ></Image>
          {/* 中间滑块 */}
          <Animated.View
            style={{
              left: "50%",
              top: "50%",
              transform: [{ translateX: pan }, { translateY: -14 }],
            }}
            {...this.panResponder.panHandlers}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ width: 16, height: 28 }}
            >
              <Image
                ref={(ref) => (this.sliderBlockRef = ref)}
                style={{ width: "100%", height: "100%" }}
                source={require("./img/control_horizontal_arm.png")}
              ></Image>
            </TouchableOpacity>
          </Animated.View>
        </View>
        <Image
          style={{ width: 40, height: 40 }}
          source={require("./img/icon_horizontal_arm.png")}
        ></Image>
      </View>
    );
  }
}
export default Slider;
