import React, { Component, createContext } from "react";
import { View, Text, ImageBackground, Image, StyleSheet } from "react-native";
import Camera from "./camera/index";
import FooterIcons from "./footerIcons/index";
import Rotate from "./rotate/index";
import Doublerotate from "./doublerotate/index";
import arm from "./arm.json";
export default class RoboticArm extends Component {
  state = {
    structure: arm.STRUCTURE,
    actions: arm.ACTIONS,
    officialbuttons: arm.OFFICIALBUTTONS,
    actIndex: null,
  };

  //滑动方向盘， 添加actinidex
  actionChange = (angle, index) => {
    console.log(angle, index);
  };
  //打开摄像头
  openCameraHanlder = (flag) => {
    this.setState({ openCamera: !this.state.openCamera });
  };

  render() {
    const { openCamera, openSteeringBtn } = this.state;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "flex-start",
        }}
      >
        {/* hedder */}
        <ImageBackground
          style={{ width: "100%", height: 64, alignItems: "center" }}
          source={require("./img/header_bottom.png")}
        >
          {/* 相机功能 */}
          <Camera
            openCamera={openCamera}
            openCameraHanlder={this.openCameraHanlder}
          ></Camera>
        </ImageBackground>
        {/* middle */}
        <View style={styles.middleContainer}>
          <Rotate
            actionChange={this.actionChange}
            actionSteeringWheel={this.actionSteeringWheel}
          ></Rotate>
          <Doublerotate actionChange={this.actionChange}></Doublerotate>
        </View>
        {/* footer */}
        <View style={styles.footerContainer}>
          <Image
            style={{
              width: 55,
              height: 110,
              position: "absolute",
              left: 0,
              bottom: 0,
            }}
            source={require("./img/footer_left.png")}
          ></Image>
          <View style={styles.positonFotterWarp}>
            <Image
              style={{ height: 21 }}
              source={require("./img/footer_left2.png")}
            ></Image>
            <FooterIcons
              openSteeringBtn={openSteeringBtn}
              changeopenSteeringBtn={this.changeopenSteeringBtn}
            ></FooterIcons>
            <Image
              style={{ height: 21 }}
              source={require("./img/footer_left2.png")}
            ></Image>
          </View>
          <Image
            style={{
              width: 55,
              height: 110,
              position: "absolute",
              right: 0,
              bottom: 0,
              transform: [{ rotateY: "180deg" }],
            }}
            source={require("./img/footer_left.png")}
          ></Image>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  middleContainer: {
    flex: 1,
    marginBottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  footerContainer: {
    position: "relative",
    height: 21,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3287FE",
  },
  positonFotterWarp: {
    position: "relative",
    flex: 1,
    bottom: 0,
    flexDirection: "row",
    alignItems: "flex-end",
  },
});
