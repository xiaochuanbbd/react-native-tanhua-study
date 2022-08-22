import React, { useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder} from "react-native";

const Joystick = () => {
  const [highlight, setHighlight] = useState("red");
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panResponder = useRef(
    PanResponder.create({       
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        setHighlight("green");
      },
      onPanResponderMove: (event, gestureState) => {
        let pos = { x: gestureState.dx, y: gestureState.dy }
        let squareDistance = pos.x**2+pos.y**2;
        let distance = Math.sqrt(squareDistance);
        //使用距离的平方，减少一次开方操作
        if(distance>90){
          let normalizeX= pos.x/distance;
          let normalizeY = pos.y/distance;
          pos.x= normalizeX*90;
          pos.y= normalizeY*90;
        }
        // pos.x = Math.min(90, Math.max(pos.x, -90));
        // pos.y = Math.min(90, Math.max(pos.y, -90));
        setPan({ x: pos.x, y: pos.y });
      },

      onPanResponderRelease: () => {
        setHighlight("yellow");
        setPan({ x: 0, y: 0 });
      }
    })
  ).current;

  return (
    // console.log("位置是", pan.x._value),
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{ translateX: pan.x }, { translateY: pan.y }],

        }}
        {...panResponder.panHandlers}
      >
        <View style={{
          height: 40,
          width: 40,
          backgroundColor: highlight,
          borderRadius: 20,
          borderWidth:1
        }} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    
    alignItems: "center",
    justifyContent: "center",
    width:180,
    height:180,
    backgroundColor:"#00000000",
    borderRadius:90,
    borderWidth:1.5,
    borderColor:"#00FF7F"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 40,
    width: 40,
    backgroundColor: "blue",
    borderRadius: 20
  }
});

export default Joystick;