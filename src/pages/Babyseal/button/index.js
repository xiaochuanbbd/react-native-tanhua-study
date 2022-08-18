import React, { Component } from 'react'
import {ImageBackground,TouchableOpacity,Image, View} from 'react-native'

export default class index extends Component {
  render() {
    const {actIndex,actonPressIn,actonPressOut,steeringWheelBtn} = this.props
    return (
     <View  style={{  flex:1   }}>
       <ImageBackground  style={{ width:182,height:  182,padding:1,position:'relative' }} source={require('../img/middle_left.png')}>
          <TouchableOpacity activeOpacity={0.6}  
                style={{position:'absolute',left:'50%',transform:[{translateX:-24}], width:48,height:52 }} 
                onPressIn={()=>{ actonPressIn(steeringWheelBtn[0].index)} } 
                onPressOut = {()=>{actonPressOut(steeringWheelBtn[0].index)}}
                >
            <Image style={{width:'100%',height:'100%',}}  source={actIndex?actIndex==steeringWheelBtn[0].index?require('./img/btn_control_active.png'):require('./img/btn_control_disable.png'):require('./img/btn_up_white.png')} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}  
              style={{width:48,height:52,position:'absolute',left:0,top:'50%',transform:[{translateY:-26},{rotate:'270deg'}]}} 
              onPressIn={()=>{ actonPressIn(steeringWheelBtn[1].index)} } 
                onPressOut = {()=>{actonPressOut(steeringWheelBtn[1].index)}}
                >
           <Image style={{width:'100%',height:'100%',}} source={actIndex?actIndex==steeringWheelBtn[1].index?require('./img/btn_control_active.png'):require('./img/btn_control_disable.png'):require('./img/btn_up_white.png')} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.6}  
                style={{  width:48,height:52,position:'absolute',left:'50%',bottom:0,transform:[{translateX:-24},{rotate:'180deg'}]}} 
                onPressIn={()=>{ actonPressIn(steeringWheelBtn[2].index)} } 
                onPressOut = {()=>{actonPressOut(steeringWheelBtn[2].index)}}
             >
          <Image  style={{width:'100%',height:'100%',}}  source={actIndex?actIndex==steeringWheelBtn[2].index?require('./img/btn_control_active.png'):require('./img/btn_control_disable.png'):require('./img/btn_up_white.png')} />
          </TouchableOpacity>

          <TouchableOpacity activeOpacity={0.6}  
                 style={{width:48,height:52,position:'absolute',right:0,top:'50%',transform:[{translateY:-26},{rotate:'90deg'}]}}
                 onPressIn={()=>{ actonPressIn(steeringWheelBtn[3].index)} } 
                onPressOut = {()=>{actonPressOut(steeringWheelBtn[3].index)}}
           >
          <Image style={{width:'100%',height:'100%',}}  source={actIndex?actIndex==steeringWheelBtn[3].index?require('./img/btn_control_active.png'):require('./img/btn_control_disable.png'):require('./img/btn_up_white.png')} />
          </TouchableOpacity>
      </ImageBackground>
  </View>
      )
  }
}
