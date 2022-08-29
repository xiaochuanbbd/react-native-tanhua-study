import React, { useRef, useState, useEffect } from "react";
import { View, StyleSheet, PanResponder, findNodeHandle, Animated, UIManager } from "react-native";
const RotateMove = () => {
    let center1Pos={};
    let center2Pos = {};
    let angle1 = 0;
    let isChildMove = false;
    const [rotateAngle, setrotateAngle] = useState({ angle: 0 });
    const [rotateAngle2, setrotateAngle2] = useState({ angle: 0 });
    const center1Ref = useRef(null);
    useEffect(() => {
        setTimeout(() => {
            UIManager.measure(findNodeHandle(center1Ref.current), (x, y, width, height, pageX, pageY) => {
                console.log(x, y, width, height, pageX, pageY);
                pageX += 15;
                pageY += 15;
                center1Pos = { pageX, pageY };
                center2Pos = { pageX: center1Pos.pageX, pageY: center1Pos.pageY - 80 };
            });

        });
    }, []);

    const panResponder = useRef(
        PanResponder.create(
            {
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: (e, gestureState) => {

                },
                onPanResponderMove: (e, gestureState) => {

                    let angle = panMove(center1Pos, e, 0);
                    setrotateAngle({ angle: angle });
                    // console.log("rotateAngle.angle",rotateAngle.angle);
                    angle1 = angle;
                },
                onPanResponderRelease: (e, gestureState) => {
                    let sin = Math.sin(angle1 * Math.PI / 180);
                    let cos = Math.cos(angle1 * Math.PI / 180);
                    let dx = 80 * sin;
                    let dy = 80 * cos;
                    
                    center2Pos.pageX = center1Pos.pageX + dx;
                    center2Pos.pageY = center1Pos.pageY - dy;
                    console.log(sin,cos,center2Pos,angle1);
                }
            }
        )
    ).current;
    const panResponder2 = useRef(
        PanResponder.create(
            {
                onMoveShouldSetPanResponder: () => true,
                onPanResponderGrant: (e, gestureState) => {
                    // isChildMove=true;
                    // e.stopPropagation();
                    // const target = e.currentTarget;
                },
                onPanResponderMove: (e, gestureState) => {
                    let angle = panMove(center2Pos, e, angle1);
                    setrotateAngle2({ angle: angle });
                },
                onPanResponderRelease: (e, gestureState) => {
                    isChildMove= false;
                }
            }
        )
    ).current;

    function panMove(center, event, offsetAngle) {
        let pos = { x: event.nativeEvent.pageX, y: event.nativeEvent.pageY }
        // console.log("offsetAngle",offsetAngle);
        // let distance = Math.sqrt((pos.x - center.pageX) ** 2 + (pos.y - center.pageY) ** 2);
        // let sin = (pos.x - center.pageX) / distance;
        // let angle = (Math.asin(sin) * 180 / Math.PI);

        let tan = (pos.x - center.pageX) / (pos.y - center.pageY);
        let angle = -(Math.atan(tan) * 180 / Math.PI);

        if (pos.y > center.pageY) {
            // console.log("下半圆");
            angle = 180+ angle;
        }
        // if (pos.y > center.pageY) {
        //     // console.log("下半圆");
        //     angle = 180 - angle;
        // }
        angle -= offsetAngle;
        console.log("angle", angle);
        return angle;
    }
    return (
        < View style={styles.container}>

            <View ref={center1Ref} style={[styles.center1, { transform: [{ rotate: rotateAngle.angle + "deg" }] }]}>
                <View  style={styles.rod
                }>
                    <View style={[styles.center1, 
                    { backgroundColor: "rgba(0, 0, 255, 0.5)",top:-15, transform: [{ rotate: rotateAngle2.angle + "deg" }] }]}
                    {...panResponder.panHandlers}
                    >
                    <View style={[styles.rod, { backgroundColor: "rgba(0, 255, 255, 0.5)" }]}
                    >
                        <View style={[styles.center1,{ top:-15,backgroundColor: "rgba(0, 255, 255, 0.5)" }]} 
                        {...panResponder2.panHandlers}></View>
                    </View>
                </View>
                </View>
                
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {

        alignItems: "center",
        justifyContent: "center",
        width: 180,
        height: 180,
        backgroundColor: "#00000000",
        borderRadius: 40,
        borderWidth: 1.5,
        borderColor: "#00007F",
    },
    center1: {
        width: 30,
        height: 30,
        backgroundColor: "green",
        borderRadius: 5,
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center"
    },
    rod: {
        width: 1,
        height: 80,
        backgroundColor: "yellow",
        position: "relative",
        bottom: 65,
        display: 'flex',
        justifyContent: "flex-start",
        alignItems: "center"
    }
});
export default RotateMove;