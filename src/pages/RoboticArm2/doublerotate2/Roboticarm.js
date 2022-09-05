import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { View, Image, StyleSheet, PanResponder } from "react-native";
import layoutRef from "./layoutRef";
const Demo = () => {
  const [rootAngle, setRootAngle] = useState(355);
  const [middleAngle, setMiddleAngle] = useState(10);
  const rotateBox = useRef(null);
  const rotate2Box = useRef(null);
  const rotateLine = useRef(null);
  let rotateBoxXY = { pageX: 0, pageY: 0 };
  let rotateLineHeight = 0;
  useEffect(() => {
    setTimeout(async () => {
      const rotateBoxRef = await layoutRef(rotateBox.current);
      const rotateLineRef = await layoutRef(rotateLine.current);
      //计算第一个块的固定坐标点（不会变动）
      rotateBoxXY.pageX = rotateBoxRef.pageX + rotateBoxRef.width / 2;
      rotateBoxXY.pageY = rotateBoxRef.pageY + rotateBoxRef.height / 2;
      rotateLineHeight = rotateLineRef.height; //线的长度即斜边长度
    });
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {},
      onPanResponderMove: async (e) => {
        let pos = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
        let x = pos.x - rotateBoxXY.pageX; //对边
        let y = pos.y - rotateBoxXY.pageY; //邻边
        const rotate2BoxRef = await layoutRef(rotate2Box.current);
        console.log(rotate2BoxRef.pageY + 10, rotateBoxXY.pageY);
        if (y > 0) return;
        let cos2 =
          (x * x +
            y * y -
            rotateLineHeight * rotateLineHeight -
            rotateLineHeight * rotateLineHeight) /
          (2 * rotateLineHeight * rotateLineHeight);
        if (cos2 < -1) {
          cos2 = -1;
        } else if (cos2 > 1) {
          cos2 = 1;
        }
        //Math.Sqrt函数返回一个数的平方根
        let sin2 = Math.sqrt(1 - cos2 * cos2); //正负两个方向

        let sita2 = Math.atan2(sin2, cos2);
        let sita1 =
          Math.atan2(y, x) -
          Math.atan2(
            rotateLineHeight * sin2,
            rotateLineHeight + rotateLineHeight * cos2
          );

        let t1 = (sita1 * 180) / Math.PI;
        let rootAngle = ClampAngle(t1) + 90;
        //限制条件
        if (pos.x > rotateBoxXY.pageX && rootAngle >= 85) {
          rootAngle = 85;
        }
        if (rootAngle < 0) {
          rootAngle = 360 + rootAngle;
        }

        let t2 = (sita2 * 180) / Math.PI;
        let middleAngle = ClampAngle(t2);

        if (middleAngle < 0) {
          middleAngle = 360 + middleAngle;
        }

        if (middleAngle <= 15) {
          middleAngle = 15;
        }
        if (middleAngle >= 165) {
          middleAngle = 165;
        }

        // console.log(middleAngle, "middleAngle");
        // console.log(rootAngle, "rootAngle");
        setMiddleAngle(middleAngle);
        setRootAngle(rootAngle);
      },

      onPanResponderRelease: () => {},
    })
  ).current;
  const ClampAngle = (_angle) => {
    if (_angle > 180) {
      _angle -= 360;
    } else if (_angle < -180) {
      _angle += 360;
    }
    return _angle;
  };
  return (
    <View style={style.container}>
      <View
        style={[
          style.rotateBox,
          {
            transform: [{ rotate: `${rootAngle}deg` }],
          },
        ]}
        ref={rotateBox}
      >
        <View style={[style.rotateLine]} ref={rotateLine}>
          <View style={[style.rotatePoint]}></View>
          <View
            ref={rotate2Box}
            style={[
              style.rotateBox,

              {
                top: -10,
                transform: [{ rotate: `${middleAngle}deg` }],
              },
            ]}
          >
            <View style={[style.rotateLine]}>
              <View style={[style.rotatePoint]}></View>
              <Image
                source={require("./img/control_horizontal_arm.png")}
                style={[{ top: -14, width: 18, height: 28 }]}
                {...panResponder.panHandlers}
              ></Image>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  rotateBox: {
    width: 18,
    height: 18,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    borderColor: "rgba(179, 209, 255,1)",
    borderWidth: 3,
    backgroundColor: "rgba(275, 275, 275, 1)",
  },
  rotateLine: {
    bottom: 40,
    width: 10,
    height: 50,
    borderWidth: 2,
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
});
export default Demo;
