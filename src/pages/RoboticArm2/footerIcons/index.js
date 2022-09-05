import React, { Component } from "react";
import { View, ImageBackground, Image, TouchableOpacity } from "react-native";

export default class index extends Component {
  render() {
    const { openSteeringBtn, changeopenSteeringBtn } = this.props;
    return (
      <View>
        <ImageBackground
          style={{
            width: 440,
            height: 70,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            paddingBottom: 25,
          }}
          source={require("./img/footer_middle.png")}
        ></ImageBackground>
      </View>
    );
  }
}
