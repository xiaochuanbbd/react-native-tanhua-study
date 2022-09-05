import React, { Component } from "react";
import {
  ImageBackground,
  Animated,
  TouchableOpacity,
  findNodeHandle,
  UIManager,
  PanResponder,
  Image,
  StyleSheet,
  View,
} from "react-native";

export default class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deg: 0,
      rotateBoxPageX: 0,
      rotateBoxPageY: 0,
      rotateBoxWidth: 0,
      point: { x: 0, y: 0 },
    };
    this.bagRef = React.createRef();
  }
  layout(ref) {
    const handle = findNodeHandle(ref);

    return new Promise((resolve) => {
      UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
        resolve({
          x,
          y,
          width,
          height,
          pageX,
          pageY,
        });
      });
    });
  }
  componentDidMount() {
    setTimeout(async () => {
      let res = await this.layout(this.bagRef);
      this.setState({ rotateBoxPageX: res.pageX });
      this.setState({ rotateBoxPageY: res.pageY });
      this.setState({ rotateBoxWidth: res.width });
    });
  }
  panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      return true;
    },
    //开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant: (e, gestureState) => {},

    onPanResponderMove: (e, gestureState) => {
      const { rotateBoxPageX, rotateBoxPageY, rotateBoxWidth } = this.state;
      // 转换坐标系得到以 （ox, oy） 为圆心的相对坐标
      let x = e.nativeEvent.pageX - (rotateBoxPageX + rotateBoxWidth / 2);
      let y = rotateBoxWidth / 2 - e.nativeEvent.pageY + rotateBoxPageY;
      // 根据两点间距离公式计算出鼠标点到圆心的距离
      let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      // 根据三角函数 sinA 对边/斜边 x/r， 反推出a的值，得到旋转的弧度
      let a = Math.asin(x / r);

      // 不同的坐标系中角度变化不同，需要做一下判断
      if (y <= 0) {
        if (x >= 0) {
          a = Math.PI - a;
        } else {
          a = -Math.PI - a;
        }
      }
      this.setState({ deg: a });
    },
  });

  render() {
    const { deg } = this.state;
    return (
      <Animated.View>
        <ImageBackground
          ref={(ref) => (this.bagRef = ref)}
          style={{
            width: 182,
            height: 182,
            alignItems: "center",
            justifyContent: "center",
          }}
          source={require("../img/middle_left.png")}
        >
          {/* <View style={{...style.dotateWarp,transform:[{translateX:-10}, ]}}> */}
          <View
            style={{
              ...style.dotateWarp,
              transform: [{ rotateZ: `${deg}deg}` }],
            }}
          >
            <View style={style.dotateInner}>
              <View style={[style.rotatePoint]}></View>

              <Animated.View
                style={{
                  position: "absolute",
                  zIndex: 99,
                }}
                {...this.panResponder.panHandlers}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={{
                    position: "relative",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <Image
                    style={{ top: -10, width: 16, height: 24 }}
                    source={require("./img/control_horizontal_arm.png")}
                  ></Image>
                  <View style={[style.point]}></View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </View>
        </ImageBackground>
      </Animated.View>
    );
  }
}
const style = StyleSheet.create({
  dotateWarp: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    borderColor: "rgba(179, 209, 255,1)",
    borderWidth: 3,
    backgroundColor: "rgba(275, 275, 275, 1)",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  dotateInner: {
    bottom: 57,
    width: 13,
    height: 70,
    borderWidth: 3,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderColor: "rgba(179, 209, 255, 1)",
    position: "relative",
    zIndex: 99,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  rotatePoint: {
    width: 4,
    height: 4,
    borderRadius: "50%",
    backgroundColor: "rgba(179, 209, 255, 1)",
    position: "absolute",
    bottom: 2,
  },
  point: {
    width: 6,
    height: 6,
    borderRadius: "50%",
    backgroundColor: "#3287FE",
    position: "absolute",
    top: -20,
  },
});
