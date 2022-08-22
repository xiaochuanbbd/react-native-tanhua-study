import React, { Component } from 'react'
import { View ,ImageBackground,Image,TouchableOpacity} from 'react-native'

export default class index extends Component {
  render() {
    const {openSteeringBtn,changeopenSteeringBtn} = this.props
    return (
      <View  >
       <ImageBackground style={{width:440,height:70,flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:25}} source={require('./img/footer_middle.png')}>
           <ImageBackground   style={{width:134,height:50,flexDirection:'row',justifyContent:'flex-start',alignItems:'center' }} source={require('./img/bg_switch.png')}>
              <View style={{width:'50%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Image    style={{display:openSteeringBtn?'flex':"none",position:'absolute',left:0,top:0,width:'100%',height:'100%',flexDirection:'row',justifyContent:'flex-start' }} source={require('./img/bg_switch_selected.png')}></Image>
                <TouchableOpacity  onPress={()=>{changeopenSteeringBtn(true)}} style={{width:40,height:40,}} >
                   <Image style={{width:'100%',height:'100%'}} source={openSteeringBtn?require('./img/icon_steeringmode_activate.png'):require('./img/icon_steeringmode_no.png')}></Image>
                </TouchableOpacity>
              </View>
              <View style={{width:'50%',height:'100%',justifyContent:'center',alignItems:'center'}}>
                <Image   style={{display:!openSteeringBtn?'flex':"none",position:'absolute',right:0,top:0,width:'100%',height:'100%',flexDirection:'row',justifyContent:'flex-start' }} source={require('./img/bg_switch_selected.png')}></Image>
                <TouchableOpacity  onPress={()=>{changeopenSteeringBtn(false)}} style={{width:40,height:40,}} >
                  <Image style={{width:'100%',height:'100%'}} source={!openSteeringBtn?require('./img/icon_panmode_activate.png'):require('./img/icon_panmode_no.png')}></Image>
                </TouchableOpacity>
              </View>
           </ImageBackground>
       </ImageBackground>
       </View>
    )
  }
}
