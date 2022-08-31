import React, { useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  PanResponder,
  findNodeHandle,
  Animated,
  ImageBackground,
  Image,
  UIManager,
} from "react-native";
import layoutRef from "./layoutRef";
const RotateMove = (props) => {
  let center1Pos = {};
  let center2Pos = {};
  let angle1 = 0;
  let isChildMove = false;
  let lineInfo = {};

  const [rotateAngle, setrotateAngle] = useState({ angle: 0 });
  const [rotateAngle2, setrotateAngle2] = useState({ angle: 90 });
  const [isMoveLine, setMoveLine] = useState(false);
  const [isMoveLine2, setMoveLine2] = useState(false);
  const rotateBlockRef = useRef(null);
  const lineRef = useRef(null);
  useEffect(() => {
    setTimeout(async () => {
      lineInfo = await layoutRef(lineRef.current);
      const blockInfo = await layoutRef(rotateBlockRef.current);
      let pageX = (blockInfo.pageX += blockInfo.width / 2);
      let pageY = (blockInfo.pageY += blockInfo.height / 2);
      center1Pos = { pageX, pageY };
      center2Pos = {
        pageX: center1Pos.pageX,
        pageY: center1Pos.pageY - lineInfo.height,
      };
    });
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => !isChildMove,
      onPanResponderGrant: (e, gestureState) => {
        setMoveLine(true);
      },
      onPanResponderMove: (e, gestureState) => {
        let angle = panMove(center1Pos, e, 0);
        if (angle > 90 && angle < 270) {
          return;
        }
        setrotateAngle({ angle: angle });
        angle1 = angle;
      },
      onPanResponderRelease: (e, gestureState) => {
        console.log(angle1);
        let sin = Math.sin((angle1 * Math.PI) / 180); //求sin
        let cos = Math.cos((angle1 * Math.PI) / 180); //求cos
        let dx = lineInfo.height * sin; //根据sin =对边/斜边   对边 = 斜边 * sin
        let dy = lineInfo.height * cos; // cos = 邻边/斜边  邻边 = 斜边 * cos
        center2Pos.pageX = center1Pos.pageX + dx;
        center2Pos.pageY = center1Pos.pageY - dy;
        setMoveLine(false);
      },
    })
  ).current;
  const panResponder2 = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e, gestureState) => {
        isChildMove = true;
        setMoveLine2(true);
      },
      onPanResponderMove: (e, gestureState) => {
        let angle = panMove(center2Pos, e, angle1 + 90);
        angle += 90;
        if (angle > 180 && angle < 360) {
          return;
        }
        if (angle) setrotateAngle2({ angle: angle });
      },
      onPanResponderRelease: (e, gestureState) => {
        isChildMove = false;
        setMoveLine2(false);
      },
    })
  ).current;

  function panMove(center, event, offsetAngle) {
    let pos = { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY };
    let tan = (pos.x - center.pageX) / (pos.y - center.pageY); //tan  = 对边/邻边
    let angle = -((Math.atan(tan) * 180) / Math.PI); // 根据弧度求角度

    if (pos.y > center.pageY) {
      angle = 180 + angle;
    }
    if (pos.y < center.pageY && pos.x < center.pageX) {
      angle = 360 + angle;
    }
    angle -= offsetAngle;
    //需要修正的angle
    if (angle >= -offsetAngle && angle < 0) {
      angle = 360 + angle;
    }
    //左上象限
    return angle;
  }
  return (
    <View style={styles.container}>
      {isMoveLine ? (
        <Image
          style={[
            styles.moveLine,
            {
              transform: [{ translateX: -66 }, { translateY: -12 }],
            },
          ]}
          source={require("./img/bg_activatie_arm.png")}
        ></Image>
      ) : (
        false
      )}
      <View
        style={[
          {
            transform: [{ rotate: rotateAngle.angle + "deg" }],
          },
        ]}
      >
        <View
          ref={rotateBlockRef}
          style={[
            styles.center1,
            {
              top: "50%",
              transform: [{ translateY: -12 }],
            },
          ]}
        ></View>
        <ImageBackground
          ref={lineRef}
          source={require("./img/rotate_arm.png")}
          style={[
            styles.rod,
            {
              position: "relative",
            },
          ]}
        >
          <View style={[styles.center1]}>
            <Image
              source={require("./img/control_horizontal_arm.png")}
              style={[styles.center1, { position: "absolute", zIndex: 1 }]}
              {...panResponder.panHandlers}
            />
            {isMoveLine2 ? (
              <Image
                style={[
                  styles.moveLine,
                  {
                    top: 6,
                    transform: [{ translateX: -60 }, { rotate: "90deg" }],
                  },
                ]}
                source={require("./img/bg_activatie_arm.png")}
              ></Image>
            ) : (
              false
            )}
            <View
              style={[
                styles.center1,
                {
                  transform: [{ rotate: rotateAngle2.angle + "deg" }],
                },
              ]}
            >
              <ImageBackground
                source={require("./img/rotate_arm.png")}
                style={[styles.rod]}
              >
                <Image
                  source={require("./img/control_horizontal_arm.png")}
                  style={[styles.center1]}
                  {...panResponder2.panHandlers}
                ></Image>
              </ImageBackground>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "100%",
    position: "relative",
  },
  center1: {
    width: 16,
    height: 28,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  rod: {
    width: 16,
    height: 63,
    bottom: 42,
    position: "relative",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  moveLine: {
    position: "absolute",
    width: 133,
    height: 12,
    left: "50%",
    top: "50%",
  },
});
export default RotateMove;
