import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import layoutRef from "./layoutRef";
const Demo = () => {
  const [rootAngle, setRootAngle] = useState(0);
  const [middleAngle, setMiddleAngle] = useState(0);
  const rotateBox = useRef(null);
  const rotateLine = useRef(null);
  let rotateBoxXY = { pageX: 0, pageY: 0 };
  let rotateLineHeight = 0;
  let isChildMove = false; //定义一个变量，阻止父级接管子级手势
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
      onMoveShouldSetPanResponder: () => !isChildMove,
      onPanResponderGrant: () => {},
      onPanResponderMove: (e) => {
        let pos = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
        let x = pos.x - rotateBoxXY.pageX; //对边
        let y = pos.y - rotateBoxXY.pageY; //邻边
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
        let t2 = (sita2 * 180) / Math.PI;
        let rootAngle = ClampAngle(t1) + 90;
        let middleAngle = ClampAngle(t2);
        //限制条件 看公司的需求
        if (pos.x > rotateBoxXY.pageX && rootAngle >= 85) {
          rootAngle = 85;
        }
        if (rootAngle < 0) {
          rootAngle = 360 + rootAngle;
        }
        if (pos.x < rotateBoxXY.pageX && rootAngle <= 275) {
          rootAngle = 275;
        }
        if (middleAngle >= 165) {
          middleAngle = 165;
        }
        console.log("====================================");
        console.log(rootAngle, middleAngle);
        console.log("====================================");
        setRootAngle(rootAngle);
        setMiddleAngle(middleAngle);
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
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <View style={style.container}>
        <View
          style={[
            style.rotateBox,
            {
              backgroundColor: "pink",
              transform: [{ rotate: `${rootAngle}deg` }],
            },
          ]}
          ref={rotateBox}
        >
          <View style={[style.rotateLine]} ref={rotateLine}>
            <View
              style={[
                style.rotateBox,
                {
                  top: -15,
                  backgroundColor: "yellow",
                  transform: [{ rotate: `${middleAngle}deg` }],
                },
              ]}
            >
              <View style={[style.rotateLine]}>
                <View
                  style={[
                    style.rotateBox,
                    { top: -15, backgroundColor: "green" },
                  ]}
                  {...panResponder.panHandlers}
                ></View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    width: 180,
    height: 180,
    borderColor: "#000",
    borderWidth: 2,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  rotateBox: {
    width: 30,
    height: 30,
    borderRadius: 8,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rotateLine: {
    bottom: 65,
    width: 1,
    height: 80,
    position: "relative",
    zIndex: 99,
    backgroundColor: "#000",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
export default Demo;
