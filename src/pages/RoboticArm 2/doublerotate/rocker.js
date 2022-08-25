import React, { Component } from 'react'
import {ImageBackground,Animated,TouchableOpacity,findNodeHandle,UIManager,PanResponder,Image, StyleSheet,View} from 'react-native'

export default class rocker extends Component {
  constructor(props){
    super(props)
    this.state = {
      deg :0,
      rotateBoxPageX:0,
      rotateBoxPageY:0,
      rotateBoxWidth:0,
      point:{x:0,y:0},
      isMove:'none'
    }
    this.bagRef = React.createRef();

  }
  layout(ref) {
    const handle = findNodeHandle(ref);
     
    return new Promise((resolve) => {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
            resolve({
                x,
                y,
                width,
                height,
                pageX,
                pageY
            });
        });
    });
    
}
  componentDidMount (){ 
    setTimeout(async() => {
        let res =await this.layout(this.bagRef)
        this.setState({rotateBoxPageX:res.pageX})
        this.setState({rotateBoxPageY:res.pageY})
        this.setState({rotateBoxWidth:res.width})

  });

  }
  panResponder = PanResponder.create({       
    onMoveShouldSetPanResponder:()=>{
      return true
    },
    //开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant: (e, gestureState) => {
    },
    
    onPanResponderMove: (e, gestureState) => {
     const {rotateBoxPageX,rotateBoxPageY,rotateBoxWidth} = this.state
     this.setState({isMove:'flex'})
      // 转换坐标系得到以 （ox, oy） 为圆心的相对坐标
      let x = e.nativeEvent.pageX -(rotateBoxPageX +( rotateBoxWidth/2) )   
      let y =( (rotateBoxWidth/2)- e.nativeEvent.pageY  ) + rotateBoxPageY
      // 根据两点间距离公式计算出鼠标点到圆心的距离
      let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
      // 根据三角函数 sinA 对边/斜边 x/r， 反推出a的值，得到旋转的弧度
      let a = (Math.asin(( x / r)))

      // 不同的坐标系中角度变化不同，需要做一下判断
        if (y <= 0) {
          if(x>=0){
          a =  Math.PI-a
          }else{
          a =  -Math.PI-a
          }
        }
     if(a>=(Math.PI/2)){
        a = Math.PI/2
      }
      if(a<=(-(Math.PI/2))){
        a = -Math.PI/2
      }
      this.setState({deg:a})
     },
     onPanResponderRelease:(e)=>{
      this.setState({isMove:'none'})
     }
  })
  render() {
  const {deg,isMove}  = this.state
    return (
      <View  ref={(ref)=>this.bagRef=ref}  style={{width:'100%',height:'100%', position:"relative",alignItems:'center',justifyContent:'center'}}>  
         <View style={{ transform:[ {rotateZ:`${deg}deg}`}]  }}>
       {/* 第一个遥杆 */}
           <View  style={{height:126,position:'relative'}}>
             <Animated.View
                   style={{
                     position:'absolute',zIndex:99}}
                 {...this.panResponder.panHandlers}
               >
                 <TouchableOpacity >
                         <Image style={{width:16,height:24}} source={require('./img/control_horizontal_arm.png')}></Image>
                 </TouchableOpacity>
             </Animated.View>
               <Image style={{ width:16,height:'55%'}} source={require('./img/rotate_arm.png')}></Image>
           </View>
           
         </View>
         <Image
             style={{position:'absolute',  width:133,height:12,display:isMove   }}
              source={require('./img/bg_activatie_arm.png')}></Image>
        
      </View>
    )
  }
}
