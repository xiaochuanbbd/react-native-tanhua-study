import React, { useRef, useState } from "react";
import { Animated, View,ImageBackground ,TouchableOpacity,Image, StyleSheet, PanResponder} from "react-native";

 const   Joystick = () =>{
  const [move,setMoving] = useState(false)
  const [goIng,setGoing] = useState(null)
  const [isGoing,setIsGoing] = useState(null)
  const [max,setMax] = useState(0)
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const panResponder = useRef(
    PanResponder.create({       
      onMoveShouldSetPanResponder: () => true,
      //开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
      onPanResponderGrant: (e, gestureState) => {
        setMoving(true)
        let pos = { x: gestureState.dx, y: gestureState.dy }
       
       
      },
      onPanResponderMove: (event, gestureState) => {
        let pos = { x: gestureState.dx, y: gestureState.dy }
        
        if(!isGoing){
            setIsGoing(pos.y)
             console.log(isGoing);

            if(isGoing>0){
              setGoing(true)
            }else{
              setGoing(false)
            }
      }
        let squareDistance = pos.x**2+pos.y**2;
        let distance = Math.sqrt(squareDistance);
        let distanceScale  = (distance/90) *1000 /10
         setMax(distanceScale)
        //使用距离的平方，减少一次开方操作
        if(distance>90){
          let normalizeX= pos.x/distance;
          let normalizeY = pos.y/distance;
          pos.x= normalizeX*90;
          pos.y= normalizeY*90;
          //距离比
        } 
        // console.log(pos.y);
        // if(goIng && pos.y>0){
        //   pos.y = 0
        // } 
        // if(goIng && pos.y<0){
        //   pos.y = 0

        // }
        // pos.x = Math.min(90, Math.max(pos.x, -90));
        // pos.y = Math.min(90, Math.max(pos.y, -90));
        setPan({ x: pos.x, y: pos.y });
       

      },

      onPanResponderRelease: () => {
        setPan({ x: 0, y: 0 });
        setMoving(false)
        setMax(0)
        setIsGoing(null)

      }
    })
  ).current;
    return (
       <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
            <ImageBackground  style={{ width:182,height:  182, position:'relative' }} source={require('./img/bg_steering.png')}>
              {/* <TouchableOpacity activeOpacity={0.6}  
                style={{position:'absolute',left:'50%',transform:[{translateX:-24}], width:48,height:52 }} 
              > */}
               {/* 上下两个icon */}
                <Image  style={{width:46,height:16,position:'absolute',top:-14,left:'50%',transform:[{translateX:-23}],display:move?'none':'flex'}}  source={require('./img/arrow_steering.png')}   />
                <Image  style={{width:46,height:16,position:'absolute',top:-28,left:'50%',transform:[{translateX:-23}],display:move?'flex':'none' }} source={require('./img/arrow_act_steering_activate.png')}   />
                <Image style={{width:46,height:16,position:'absolute',bottom:-14,left:'50%',transform:[{translateX:-23},{rotate:'180deg'}],display:move?'none':'flex' }} source={require('./img/arrow_steering.png')}   />
                <Image style={{width:46,height:16,position:'absolute',bottom:-28,left:'50%',transform:[{translateX:-23},{rotate:'180deg'}],display:move?'flex':'none'  }} source={require('./img/arrow_act_steering_activate.png')}   />
                {/* 上面下面的控制 */}
                <Image style={{width:'100%',height:'50%', position:'absolute',left :0,top:0, display:move?goIng?'none':'flex' :'none'}} source={require('./img/bg_activatie_steering.png')}   />
                <Image style={{width:'100%',height:'50%', position:'absolute',bottom :0,left:0, transform:[{rotate:'180deg'}],display:move?goIng?'flex':'none'  :'none'  }} source={require('./img/bg_activatie_steering.png')}   />

                {/* 中间控制圆点 */}
                <View style={{width:'100%',height:'100%',  alignItems: "center",justifyContent: "center",}}>
                  <Animated.View
                    style={{
                      transform: [{ translateX: pan.x }, { translateY: pan.y }],
                    }}
                    {...panResponder.panHandlers}
                  >
                      <TouchableOpacity activeOpacity={0.8}  
                        style={{  width:50,height:50 }} 
                      >  
                      <Image style={{width:'100%',height:'100%'}} source={move?require('./img/control_steering_b.png' ):require('./img/control_steering_a.png' )} ></Image>
                      </TouchableOpacity>
                </Animated.View>
                </View>
            </ImageBackground>  
            <View style={{height:148,width:47}} >
              <Image style={{position:'absolute',top:-15,left:0,width:25,height:15}} source={max<100?require('./img/bg_speed_max_nor_streering.png'):require('./img/bg_speed_max_active_streering.png')}></Image>
              <Image style={{height:'100%',width:'100%'}} source={require('./img/bg_speed_streering.png')}></Image>
              <View style={{ height:max<100?`${max}%`:'100%',width:'100%',position:'absolute',left:0,bottom:0,overflow:"hidden" }} >
                <Image style={{position:'absolute',left:0,bottom:0,height:148,width:'100%',resizeMode:'cover'}} source={require('./img/bg_speed_streering_active.png')}></Image>
              </View>
            </View>
       </View>
    )
}
export  default  Joystick