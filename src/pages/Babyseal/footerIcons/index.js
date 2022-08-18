import React, { Component } from 'react'
import { View ,ImageBackground,Image} from 'react-native'

export default class index extends Component {
  render() {
    return (
      <View style={{}}>
       <ImageBackground style={{width:440,height:70,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:25}} source={require('../img/footer_middle.png')}>
           <ImageBackground  style={{padding:5, marginRight:28, width:50,height:50,alignItems:'center',justifyContent:'center'}} source={require('../img/svgicon/btn_control_bg_foot.png')}>
             <Image style={{width:'100%',height:'100%'}}  source={require('../img/svgicon/action_1.png')} />
           </ImageBackground>
           <ImageBackground  style={{padding:5, marginRight:28,  width:50,height:50,alignItems:'center',justifyContent:'center'}} source={require('../img/svgicon/btn_control_bg_foot.png')}>
             <Image style={{width:'100%',height:'100%'}}  source={require('../img/svgicon/action_2.png')} />
           </ImageBackground>
           <ImageBackground  style={{padding:5, marginRight:28,  width:50,height:50,alignItems:'center',justifyContent:'center'}} source={require('../img/svgicon/btn_control_bg_foot.png')}>
             <Image style={{width:'100%',height:'100%'}}  source={require('../img/svgicon/action_3.png')} />
           </ImageBackground>
           <ImageBackground  style={{padding:5,  width:50,height:50,alignItems:'center',justifyContent:'center'}} source={require('../img/svgicon/btn_control_bg_foot.png')}>
             <Image style={{width:'100%',height:'100%'}}  source={require('../img/svgicon/action_4.png')} />
           </ImageBackground>
       </ImageBackground>
       </View>
    )
  }
}
