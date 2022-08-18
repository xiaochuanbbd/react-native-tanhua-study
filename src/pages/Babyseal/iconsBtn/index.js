import React, { Component } from 'react'
import { View ,TouchableOpacity,ImageBackground,Image} from 'react-native'
import SpinAnimation from '../../../components/spinAnimation'
export default class index extends Component {
  handlerBtnclick=()=>{
   
  }
  render() {
    const {actIndex,actBtnHandler,iconsBtn} = this.props
    return (
      <View style={{ flex:1, justifyContent:'flex-end', flexDirection:'row', }}>
        <ImageBackground   style={{ width:74,height:74,position:'relative',marginRight:54}} source={require('../img/middle_r.png')}>
              <TouchableOpacity activeOpacity={0.8} underlayColor="#fff"  
                style={{ position:'absolute',left:'50%',top:-54,transform:[{translateX:-27}], width:54,height:54,alignItems:'center',justifyContent:'center'}} 
                onPress={()=>{ actBtnHandler(iconsBtn[0].index)} } 
                >
                  <ImageBackground   style={{  width:54,height:54,alignItems:'center',justifyContent:'center'}} source={actIndex?actIndex==iconsBtn[0].index?require('./img/btn_control_bg_active.png'):require('./img/btn_control_bg_disable.png'):require('./img/btn_control_bg.png')}>
                    <Image style={{width:'100%',height:'100%',opacity:actIndex?actIndex==iconsBtn[0].index? 1:0.6:1}}  source={  iconsBtn[0].src  } />
                    <SpinAnimation  styles={{width:70,height:70 }}  isShow={actIndex==iconsBtn[0].index?true:false} ></SpinAnimation>
                  </ImageBackground>
              </TouchableOpacity>

           <TouchableOpacity 
           activeOpacity={0.8}underlayColor="#fff" 
           style={{ top:'50%',position:'absolute',left:-54,transform:[{translateY:-27}], width:54,height:54,alignItems:'center',justifyContent:'center'}} 
            onPress={()=>{ actBtnHandler(iconsBtn[1].index)}}
             >
              <ImageBackground  style={{padding:5 , width:54,height:54,alignItems:'center',justifyContent:'center'}}
                source={actIndex?actIndex==iconsBtn[1].index?require('./img/btn_control_bg_active.png'):require('./img/btn_control_bg_disable.png'):require('./img/btn_control_bg.png')}>
                <Image style={{width:'100%',height:'100%',opacity:actIndex?actIndex==iconsBtn[1].index? 1:0.6:1}}  source={ iconsBtn[1].src  } />
                <SpinAnimation  styles={{width:70,height:70}}  isShow={actIndex== iconsBtn[1].index?true:false} ></SpinAnimation>
              </ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity
            activeOpacity={0.8}underlayColor="#fff"  
            style={{ left:'50%',position:'absolute' ,bottom:-54,transform:[{translateX:-27}], width:54,height:54,alignItems:'center',justifyContent:'center'}} 
            onPress={()=>{ actBtnHandler(iconsBtn[2].index)}}
            >
              <ImageBackground 
               style={{padding:5 ,width:54,height:54, alignItems:'center',justifyContent:'center'}} 
               source={actIndex?actIndex==iconsBtn[2].index?require('./img/btn_control_bg_active.png'):require('./img/btn_control_bg_disable.png'):require('./img/btn_control_bg.png')}
               >
                <Image style={{width:'100%',height:'100%',opacity:actIndex?actIndex==iconsBtn[2].index? 1:0.6:1}}  source={ iconsBtn[2].src  } />
                <SpinAnimation  styles={{width:70,height:70}}  isShow={actIndex== iconsBtn[2].index?true:false} ></SpinAnimation>

              </ImageBackground>
           </TouchableOpacity>
           <TouchableOpacity
            activeOpacity={0.8}underlayColor="#fff"  
            onPress={()=>{ actBtnHandler(iconsBtn[3].index)}}
            style={{ right:-54,top:'50%',position:'absolute',transform:[{translateY:-27}], width:54,height:54,alignItems:'center',justifyContent:'center'}} 
             >
              <ImageBackground  style={{padding:5 , width:54,height:54,alignItems:'center',justifyContent:'center'}} 
              source={actIndex?actIndex==iconsBtn[3].index?require('./img/btn_control_bg_active.png'):require('./img/btn_control_bg_disable.png'):require('./img/btn_control_bg.png')}>
                <Image style={{width:'100%',height:'100%',opacity:actIndex?actIndex==iconsBtn[3].index? 1:0.6:1}}  source={ iconsBtn[3].src  } />
                <SpinAnimation  styles={{width:70,height:70}}  isShow={actIndex== iconsBtn[3].index?true:false} ></SpinAnimation>

              </ImageBackground>
           </TouchableOpacity>
        </ImageBackground>
      </View>     
    )
  }
}
