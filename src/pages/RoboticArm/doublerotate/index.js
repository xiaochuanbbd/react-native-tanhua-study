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
import Slider from "./slider";
import layout from "./layoutRef";
import RotateMove from "./RotateMove";
export default class index extends Component {
  constructor(props) {
    super(props);
    this.warpWidth = 0;
    this.warpRef = React.createRef();
  }

  componentDidMount() {
    setTimeout(async () => {
      let warpRef = await layout(this.warpRef);
      this.warpWidth = warpRef.width;
    });
  }

  render() {
    return (
      <Animated.View>
        <ImageBackground
          ref={(ref) => (this.warpRef = ref)}
          style={{
            width: 218,
            height: 215,
            position: "relative",
            padding: 0,
            position: "relative",
            alignItems: "center",
            justifyContent: "center",
          }}
          source={require("./img/bg_arm.png")}
        >
          {/* 第一个遥杆 */}
          {/* <View  ref={(ref)=>this.rocker=ref} 
           style={{width:'100%',height:'100%', position:"relative",alignItems:'center',justifyContent:'center',}}>  
            <View style={{ transform:[ {rotateZ:`${deg1}deg}`}]  }}>
              <View  style={{height:126,position:'relative'}}>
                <Animated.View
                      style={{
                        position:'absolute',zIndex:100}}
                    {...this.panResponder1.panHandlers}
                  >
                    <View >
                            <Image style={{width:16,height:24}} ref={(ref)=>this.rockerImg = ref} source={require('./img/control_horizontal_arm.png')}></Image>
                    </View>
                </Animated.View>
                <Image style={{ width:16,height:'56%'}} source={require('./img/rotate_arm.png')}></Image>
                <View style={{position:'absolute',top:-53,left:0}}>
                    <View  ref={(ref)=>this.rocker2=ref} 
                        style={{width:'100%',height:'100%', position:'relative',top:0,alignItems:'center',justifyContent:'center',}}>  
                          <View style={{ transform:[ {rotateZ:`${deg2}deg}`}],  }}>
                            <View  style={{height:126,position:'relative',zIndex:98}}>
                              <Animated.View
                                    style={{
                                      position:'absolute',zIndex:99}}
                                  {...this.panResponder2.panHandlers}
                                >
                                  <View >
                                          <Image style={{width:16,height:24}} source={require('./img/control_horizontal_arm.png')}></Image>
                                  </View>
                              </Animated.View>
                              <Image style={{ width:16,height:'55%'}} source={require('./img/rotate_arm.png')}></Image>
                            </View>
                          </View>
                          <Image style={{position:'absolute',  width:133,height:12,display:isMove2}}source={require('./img/bg_activatie_arm.png')}></Image>
                    </View>
                </View>
              </View>
            </View>
            <Image style={{position:'absolute',  width:133,height:12,display:isMove1}}source={require('./img/bg_activatie_arm.png')}></Image>
           
         </View> */}
          <RotateMove warpWidth={this.warpWidth}></RotateMove>
          {/* 滑块 */}
          <Slider></Slider>
        </ImageBackground>
      </Animated.View>
    );
  }
}
