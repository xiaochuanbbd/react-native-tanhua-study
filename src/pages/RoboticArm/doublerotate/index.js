import React, { Component } from 'react'
import {ImageBackground,Animated,TouchableOpacity,findNodeHandle,UIManager,PanResponder,Image, StyleSheet,View} from 'react-native'
import Rocker from './rocker'
let x1,y1
export default class index extends Component {
  constructor(props){
    super(props)
    this.state = {
      deg1 :0,
      rotateBoxPageX:0,
      rotateBoxPageY:0,
      rotateBoxWidth:0,
      isMove1:'none',
      deg2 :0,
      isMove2:'none',
      rotateBoxPageY2:0,
      rotateBoxPageX2:0,
      rotateBoxWidth2:0,
      rotateBoxHeight2:0,

    }
    this.rocker1 = React.createRef();
    this.rocker2 = React.createRef();
this.rockerImg = React.createRef()
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
        let res =await this.layout(this.rocker)
        this.setState({rotateBoxPageX:res.pageX})
        this.setState({rotateBoxPageY:res.pageY})
        this.setState({rotateBoxWidth:res.width})
        //第二个遥感的坐标
        let res2 = await this.layout(this.rockerImg)
        this.setState({rotateBoxPageX2:res2.pageX})
        this.setState({rotateBoxPageY2:res2.pageY})
        this.setState({rotateBoxWidth2:res2.width})
        this.setState({rotateBoxHeight2:res2.width})

  });

  }
  //移动手势时
  panResponderMove = async(e, type) => {
        const {rotateBoxPageX,rotateBoxPageY,rotateBoxWidth,rotateBoxPageX2,rotateBoxPageY2,rotateBoxWidth2,rotateBoxHeight2,deg1} = this.state
        this.setState({[`isMove${type}`]:'flex'})
        
      // 转换坐标系得到以 （ox, oy） 为圆心的相对坐标
      let  x,y
      if(type==1){
          x= e.nativeEvent.pageX -(rotateBoxPageX +( rotateBoxWidth/2) )   
          y=( (rotateBoxWidth/2)- e.nativeEvent.pageY  ) + rotateBoxPageY
      
      }else{
        // console.log(rotateBoxPageX2,rotateBoxPageY2);
        x= e.nativeEvent.pageX -(rotateBoxPageX2 +( rotateBoxWidth2/2) )   
        y= e.nativeEvent.pageY -(rotateBoxPageY2 +( rotateBoxHeight2/2) )   
      }
       
        // 根据两点间距离公式计算出鼠标点到圆心的距离
        let r = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2))
        // 根据三角函数 sinA 对边/斜边 x/r， 反推出a的值，得到旋转的弧度
        let a = (Math.asin(( x / r)))
        // 不同的坐标系中角度变化不同，需要做一下判断
        if(type==2){
          a = a-deg1
        }
      if(type==1){
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
        console.log(a*180/Math.PI);

      }else{
        // console.log(deg1 * 180/Math.PI);
        if (e.nativeEvent.pageY > y1) {//判断是在下半球
          console.log(a*180/Math.PI);

          a = (Math.PI-2*deg1)-a
          // if(x>=0){
          // // a =  Math.PI-a
          // }else{
          // a =  -Math.PI-a
          // }
        }
      // if(a>=(Math.PI/2)){
      //   a = Math.PI/2
      // }
      // if(a<=(-(Math.PI/2))){
      //   a = -Math.PI/2
      // }
      }
        
        // console.log(a*180/Math.PI);

        this.setState({[`deg${type}`]:a})
        
  }
  //结束手势时
  panResponderRelease =async(e,type)=>{
    console.log(e);
    this.setState({[`isMove${type}`]:'none'})
    if(type==1){

    let res2 = await this.layout(this.rockerImg)
    this.setState({rotateBoxPageX2:res2.pageX})
    this.setState({rotateBoxPageY2:res2.pageY})
    this.setState({rotateBoxWidth2:res2.width})
  
  }


  }
  panResponder1 = PanResponder.create({       
    onMoveShouldSetPanResponder:()=>{
      return true
    },
    //开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant: (e, gestureState) => {
    },
    
    onPanResponderMove: (e, gestureState) => {
     this.panResponderMove(e,1)
     },
     onPanResponderRelease:(e)=>{
      x1 = e.nativeEvent.pageX
      y1 = e.nativeEvent.pageY
      this.panResponderRelease(e,1)
     }
  })
  panResponder2 = PanResponder.create({       
    onMoveShouldSetPanResponder:()=>{
      return true
    },
    //开始手势操作。给用户一些视觉反馈，让他们知道发生了什么事情！
    onPanResponderGrant: (e, gestureState) => {
    },
    
    onPanResponderMove: (e, gestureState) => {
     this.panResponderMove(e,2)
     },
     onPanResponderRelease:(e)=>{
      this.panResponderRelease(2)
    }
  })
  

    
  render() {
    const {deg1,deg2,isMove1,isMove2}  = this.state
    return (
     <Animated.View>
       <ImageBackground 
       style={{ width:218,height:  215, 
       position:'relative',padding:1,position:'relative',alignItems:'center',justifyContent:'center' }}
        source={require('./img/bg_arm.png')}>
          {/* 第一个遥杆 */}
         <View  ref={(ref)=>this.rocker=ref} 
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
                  {/* 第2个遥杆 */}
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
           
         </View>
       </ImageBackground>
     </Animated.View>
      )
  }
}
const style = StyleSheet.create({
   
})
