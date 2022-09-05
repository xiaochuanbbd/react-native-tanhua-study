import React, { Component } from 'react'
import { View ,TouchableOpacity,Image,ImageBackground} from 'react-native'

export default class index extends Component {
  openCamara=()=>{
  }
  render() {
    const {openCamera,openCameraHanlder} =this.props
    return (
        <ImageBackground style={{width:200,height:46,alignItems:'center',justifyContent:'center',flexDirection:'row'}}  source={require('../img/header_middle.png')}>
         {/* 相机功能 */}
          <TouchableOpacity   onPress={()=>{ openCameraHanlder()} }   activeOpacity={0.8}  style={{flexDirection:'row', }}>
              <Image source={openCamera?require('./img/icon_close.png'):require('./img/icon_camara.png')} style={{ width:32, height:28}}/> 
          </TouchableOpacity> 
          <TouchableOpacity    activeOpacity={0.8}  style={{ display:openCamera?'flex':'none'}}>
              <Image source={ require('./img/icon_record.png')  } style={{ width:30, height:30 ,}}/> 
          </TouchableOpacity>      
        </ImageBackground> 
    )
  }
}
