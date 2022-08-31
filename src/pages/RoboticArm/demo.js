import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { View, StyleSheet, PanResponder } from "react-native";
import layoutRef from "./doublerotate/layoutRef";
import RotateMove from "./RotateMove";
const Demo = () => {
  const [angle, setAngle] = useState(0);
  const [angle2, setAngle2] = useState(0);
  const rotateBox = useRef(null);
  const rotateLine = useRef(null);
  let rotateBoxXY = { pageX: 0, pageY: 0 };
  let rotateBoxXY2 = { pageX: 0, pageY: 0 };
  let angle2Deg = 0;
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
      //根据第一个块的坐标点计算第二个块的初始固定坐标点（会变动）
      rotateBoxXY2 = {
        pageX: rotateBoxXY.pageX,
        pageY: rotateBoxXY.pageY - rotateLineHeight,
      };
    });
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !isChildMove,
      onPanResponderGrant: () => {},
      onPanResponderMove: (e) => {
        let angle = panMove(rotateBoxXY, e, 0);
        setAngle(angle);
        angle2Deg = angle;
      },

      onPanResponderRelease: () => {
        //每次旋转方块1，都需要更新方块2的坐标点
        let sin = Math.sin((Math.PI * angle2Deg) / 180); //sin值根据 第一个块旋转的角度计算出来（需转弧度）
        let cos = Math.cos((Math.PI * angle2Deg) / 180); // cos
        let dx = sin * rotateLineHeight; // sin = 对边 / 斜边 ==》 对边 = sin*斜边
        let dy = cos * rotateLineHeight; // cos = 邻边 / 斜边 ==》 邻边 = cos * 斜边
        rotateBoxXY2.pageX = rotateBoxXY.pageX + dx; //更新方块2的x坐标
        rotateBoxXY2.pageY = rotateBoxXY.pageY - dy; //更新方块2的y坐标
      },
    })
  ).current;
  const panResponder2 = useRef(
    PanResponder.create({
      onStartShouldSetResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        isChildMove = true;
      },
      onPanResponderMove: (e) => {
        let angle = panMove(rotateBoxXY2, e, angle2Deg);
        setAngle2(angle);
      },

      onPanResponderRelease: () => {
        isChildMove = false;
      },
    })
  ).current;
  const panMove = (center, e, offsetPan) => {
    let pos = { x: e.nativeEvent.pageX, y: e.nativeEvent.pageY };
    let x = pos.x - center.pageX; //对边
    let y = pos.y - center.pageY; //邻边
    let tan = Math.atan(x / y); //tan = 对边/邻边
    let angle = -(tan * 180) / Math.PI; //弧度转角度
    //计算偏移量，矫正角度，0-360
    if (pos.y > center.pageY) {
      //在第四象限时为 -89==》 0
      angle = 180 + angle;
    }
    if (pos.y < center.pageY && pos.x < center.pageX) {
      //在第二象限时 -89==》 0
      angle = 360 + angle;
    }
    angle -= offsetPan; //方块2需要减去方块1的角度
    //方块2减去方块1后会有负数的情况，需要矫正
    if (angle < 0) {
      angle = 360 + angle;
    }
    return angle;
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
      <RotateMove></RotateMove>
      <View style={style.container}>
        <View
          style={[
            style.rotateBox,
            { backgroundColor: "pink", transform: [{ rotate: `${angle}deg` }] },
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
                  transform: [{ rotate: `${angle2}deg` }],
                },
              ]}
              {...panResponder.panHandlers}
            >
              <View style={[style.rotateLine]}>
                <View
                  style={[
                    style.rotateBox,
                    { top: -15, backgroundColor: "green" },
                  ]}
                  {...panResponder2.panHandlers}
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
