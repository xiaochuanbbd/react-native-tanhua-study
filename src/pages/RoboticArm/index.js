import React, { Component } from 'react'
import { View,Text, ImageBackground,Image ,StyleSheet} from 'react-native'
import { pxToDp } from '../../utils/stylesKits'
import Camera from "./camera/index"
import IconsBtn from "./iconsBtn/index"
import FooterIcons from './footerIcons/index'
import babysealData from "../../../babyseal.json"
import SteeringWheel from './SteeringWheel/index'
import Rotate from "./rotate/index"
export default class RoboticArm extends Component {
  
    state = {
    } 
   
    //滑动方向盘， 添加actinidex 
    actionSteeringWheel = (index)=>{
      this.setState({actIndex:index})
    }
    //打开摄像头
    openCameraHanlder=(flag)=>{
       this.setState({openCamera:!this.state.openCamera})
    }
    
  render() {
     const { btnForbidden,actIndex,iconsBtn,openCamera,openSteeringBtn,steeringWheelBtn}  = this.state
    return (
      <View style={{flex:1,justifyContent:'space-between'}}>
      {/* hedder */}
        <ImageBackground style={{width:'100%',height:64,alignItems:'center', }} source={require('./img/header_bottom.png')}>
        {/* 相机功能 */}
        <Camera openCamera={openCamera} openCameraHanlder={this.openCameraHanlder}></Camera>
        </ImageBackground>
        {/* middle */}
        <View style={styles.middleContainer}>
        <Rotate></Rotate>
         
        </View>
        {/* footer */}
        <View style={styles.footerContainer}> 
        <Image style={{width:55,height:110,position:'absolute',left:0,bottom:0}} source={require('./img/footer_left.png')}></Image>
          <View style={styles.positonFotterWarp}>
            <Image style={{height:21}} source={require('./img/footer_left2.png')}></Image>
            <Image style={{height:21}} source={require('./img/footer_left2.png')}></Image>
          </View>
        <Image style={{width:55,height:110,position:'absolute',right:0,bottom:0,transform:[ {rotateY:'180deg'}]}} source={require('./img/footer_left.png')}></Image>

         </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  middleContainer:{
    flex:1,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft:57,
    paddingRight:57
   
  },
  footerContainer:{
     position:'relative',
      height:21,
      alignItems:'center',
      justifyContent:'center',
      backgroundColor:'#3287FE',
    
  },
  positonFotterWarp:{
    position:'relative',
    flex:1,
    bottom:0,
    flexDirection:'row',
    alignItems:'flex-end',
  }

})
