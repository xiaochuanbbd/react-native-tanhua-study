import React, { Component ,useState,useRef, useEffect} from 'react'
import {ImageBackground,Animated,TouchableOpacity,findNodeHandle,UIManager,PanResponder,Image, StyleSheet,View} from 'react-native'
import layoutRef from './layoutRef'
class Slider extends Component{
  // const {actIndex}= props
  constructor(props){
    super(props)
    this.state = {
      pan:-8
    }
    this.sliderInfo  = {
      slideWidth:0,
      sliderX:0,
      sliderY:0,
    }
    this.slideRef = React.createRef()
  }
    componentDidMount(){
      setTimeout(async()=>{
        const ref =await layoutRef(this.slideRef)
        this.sliderInfo  = {
          slideWidth:ref.width/2,
          sliderX:ref.pageX,
          sliderY:ref.pageY,
        }
      })  
    }
    panResponder =   PanResponder.create({       
      onMoveShouldSetPanResponder:()=>{
       return   true
      },
      //开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      onPanResponderGrant: (e, gestureState) => {
      },
      onPanResponderMove: (event, gestureState) => {
        let x =  gestureState.dx - this.sliderInfo.sliderX
        
        //使用距离的平方，减少一次开方操作
        if( x>=this.sliderInfo.width    ){
          x = this.sliderInfo.width  
         
        } 
        if(x<=-this.sliderInfo.width  ){
         x= -this.sliderInfo.width  
        }
        this.setState({pan:x})
      },

      onPanResponderRelease: () => {
      }
    })
 
 render(){
  const {pan} = this.state
    return (
      <View style={{position:'absolute',left:8,bottom:0,flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
        <View ref={ref=>this.slideRef = ref} style={{position:'relative',width:154,height:10,backgroundColor:'#fff',borderRadius:4,borderWidth:2,borderColor:'#b3d1ff',marginRight:8}}>
          <Image style={{position:'absolute',left:'50%',top:'50%',transform:[{translateX:-2},{translateY:-20}],width:4,height:40}} source={require('./img/bg_horizontal_arm_line.png')}></Image>
              {/* 中间滑块 */}
            <Animated.View
              style={{left:'50%',top:'50%',transform: [{ translateX: pan  },{translateY:-14}],}}
              {...this.panResponder.panHandlers}>
                <TouchableOpacity activeOpacity={0.8}   style={{  width:16,height:28 }} >  
                  <Image style={{width:'100%',height:'100%'}} source={ require('./img/control_horizontal_arm.png' ) } ></Image>
                </TouchableOpacity>
            </Animated.View>                    
        </View>                 
        <Image style={{width:40,height:40}} source={require('./img/icon_horizontal_arm.png')}></Image>
     </View>
    
  )
 }
}
export default Slider 