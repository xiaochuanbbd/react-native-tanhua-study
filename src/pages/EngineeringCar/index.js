import React, { Component } from 'react'
import { View,Text, ImageBackground,Image ,StyleSheet} from 'react-native'
import { pxToDp } from '../../utils/stylesKits'
import Camera from "./camera/index"
import Buttons from "./button/index"
import IconsBtn from "./iconsBtn/index"
import FooterIcons from './footerIcons/index'
import babysealData from "../../../babyseal.json"
import SteeringWheel from './SteeringWheel/index'
export default class EngineeringCar extends Component {
  
    state = {
      structure:babysealData.STRUCTURE,
      actions:babysealData.ACTIONS,
      officialbuttons:babysealData.OFFICIALBUTTONS,
      btnForbidden:[],
      actIndex:null,//当前点击的按钮
      iconsBtn:[//右边按钮
        {
          index:5,
          src:require('./img/svgicon/emjor_1.png')
        },
        {
          index:6,
          src:require('./img/svgicon/emjor_2.png')
        },
        {
          index:7,
          src:require('./img/svgicon/emjor_4.png')
        },
        {
          index:8,
          src:require('./img/svgicon/emjor_3.png')
        }
      ],
      steeringWheelBtn:[//右边按钮
      {
        index:1,
      },
      {
        index:3,
      },
      {
        index:2,
      },
      {
        index:4,
      }
      ],
      openCamera:false,
      openSteeringBtn:true,
    }
    //点击icon
    actBtnHandler= (index)=>{
      const {officialbuttons,actions,actIndex} = this.state   
      if(!actIndex ){
        //todo点击按钮，打开按钮动画
          //点击开启动画
        this.setState({actIndex:index})
          //暂停按钮的点击
        //当前的执行数据的数组
        const  nowBtn =  officialbuttons.find(i=>{
        return  i.btnIndex===index
        })
        this.setState({btnForbidden:nowBtn.btnForbidden})
        const actArr = nowBtn.actArr//需要执行的数组
        let newactArr = []//定义一个新数组存储需要发送的acrArr
        for (let i = 0; i < actArr.length; i++) {
          const action = actions.find(a=>{
          return a.actIndex===actArr[i].actIndex
        })
        newactArr.push(action)
        }
          //发送开始的动作 todo
        console.log(newactArr);
        setTimeout(()=>{
          this.setState({actIndex:null})
          this.setState({btnForbidden:[]})
          //发送结束后的动作
          const stopActArr = nowBtn.stopActArr//需要执行的数组
          let newstopActArr = []//定义一个新数组存储需要发送的acrArr
          for (let i = 0; i < stopActArr.length; i++) {
            const action = actions.find(a=>{
              return a.actIndex===stopActArr[i].actIndex
            })
            newstopActArr.push(action)
          }
            //发送停止的的动作 todo
          console.log(newstopActArr);
          //actindex重置
          this.setState({actIndex:null})
        },nowBtn.btnTime*1000)
      }
    }
    //按下方向盘
    actonPressIn =(index)=>{
      console.log(index);
      const {officialbuttons,actions,actIndex, } = this.state  
         if(!actIndex ){ 
        //当前的执行数据的数组
        const  nowBtn =  officialbuttons.find(i=>{
        return  i.btnIndex===index
        })
        this.setState({actIndex:index })
        this.setState({btnForbidden:nowBtn.btnForbidden})
        const actArr = nowBtn.actArr//需要执行的数组
        let newactArr = []//定义一个新数组存储需要发送的acrArr
        for (let i = 0; i < actArr.length; i++) {
          const action = actions.find(a=>{
          return a.actIndex===actArr[i].actIndex
        })
          newactArr.push(action)
        }
          //发送开始的动作 todo
        // console.log(newactArr);
        // this.setState({actIndex:null})
        console.log(actIndex);
      }
    }
    //松开
    actonPressOut = (index)=>{
      const {officialbuttons,actions,actIndex, } = this.state   
      if(actIndex==1||actIndex==2||actIndex==3||actIndex==4){
          const  nowBtn =  officialbuttons.find(i=>{
            return  i.btnIndex===index
            })
            // this.setState({actIndex:index})
          this.setState({btnForbidden:[]})
          //发送结束后的动作
          const stopActArr = nowBtn.stopActArr//需要执行的数组
          let newstopActArr = []//定义一个新数组存储需要发送的acrArr
          for (let i = 0; i < stopActArr.length; i++) {
            const action = actions.find(a=>{
              return a.actIndex===stopActArr[i].actIndex
            })
           if(action===undefined) {
            console.log('这里是stopActArr为100');
            continue
           }
             
            newstopActArr.push(action)
          }
            //发送停止的的动作 todo
          console.log(newstopActArr);
          //actindex重置
          this.setState({actIndex:null})
          console.log(this.state.actIndex);
     } 
    }
    //滑动方向盘， 添加actinidex 
    actionSteeringWheel = (index)=>{
      this.setState({actIndex:index})
    }
    //打开摄像头
    openCameraHanlder=(flag)=>{
       this.setState({openCamera:!this.state.openCamera})
    }
    changeopenSteeringBtn = (flag)=>{
      this.setState({openSteeringBtn:flag})
    }
    SteeringWheel = ()=>{
      const {  actIndex}  = this.state
      return  <SteeringWheel  actIndex={actIndex}  actionSteeringWheel={this.actionSteeringWheel}/> 
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
        {/* 左边方向盘*/}
          {openSteeringBtn
          ?<SteeringWheel  actIndex={actIndex}  actionSteeringWheel={this.actionSteeringWheel}/> 
          :<Buttons actonPressOut={this.actonPressOut} actonPressIn={this.actonPressIn} btnForbidden={btnForbidden}  actIndex={actIndex}  steeringWheelBtn={steeringWheelBtn}/>
          }
          {/* 右边的active */}
          <IconsBtn actBtnHandler={this.actBtnHandler} btnForbidden={btnForbidden} actIndex={actIndex} iconsBtn={iconsBtn}></IconsBtn>
        </View>
        {/* footer */}
        <View style={styles.footerContainer}> 
        <Image style={{width:55,height:110,position:'absolute',left:0,bottom:0}} source={require('./img/footer_left.png')}></Image>

          <View style={styles.positonFotterWarp}>
            <Image style={{height:21}} source={require('./img/footer_left2.png')}></Image>
            <FooterIcons changeopenSteeringBtn={this.changeopenSteeringBtn} openSteeringBtn={openSteeringBtn}></FooterIcons>
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
