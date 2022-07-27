import React, { Component } from 'react'
import { View, Text,Image ,StatusBar, Button,StyleSheet} from 'react-native';
import {pxToDp} from "../../../utils/stylesKits"
import validator from "../../../utils/validator"
import { Input } from "@rneui/themed";
import request from '../../../utils/request.js'
import ThButton from '../../../components/ThButton'
export default class Login extends Component {
  state={
    phoneNumber :"18229999999",
    phoneValid:true,
    loadding:false,
    showLogin:true
  }
  phoneNumChangeText = (phoneNumber)=>{
      this.setState({phoneNumber})
  }
  //点击完成触发该时间
  phoneNumberSubmit=async ()=>{
    const {phoneNumber} =this.state
    const phoneValid = validator.validatePhone(phoneNumber)
    //1.手机号验证未通过
    if(!phoneValid){
      this.setState({phoneValid})
      return
    }
    this.setState({loadding:true})
    const res = await request.post('/login',{phone:phoneNumber})
    if(res.code =='10000'){
      this.setState({loadding:false,showLogin:false})
    }else{

    }
  }
  renderLogin = ()=>{
    const {phoneNumber,phoneValid,loadding} = this.state
    return (
      <View>
      <View><Text style={{fontSize:pxToDp(25),color:'#888',fontWeight:'bold'}}>手机号登录注册</Text></View>
        {/* 输入框 */}
        
        <View style={{marginTop:pxToDp(30)}}>
            <Input  
                placeholder='请输入手机号'
                maxLength={11}
                value={phoneNumber}
                // keyboardType="phone-pad"
                inputStyle={{color:'#333'}}
                onChangeText={this.phoneNumChangeText}
                errorMessage={phoneValid?'':'手机号码格式不正确'}
                onSubmitEditing={this.phoneNumberSubmit}
                leftIcon={{ type: 'font-awesome', name: 'phone' , color:'#ccc',fontSize:pxToDp(20) }}
              />
        </View>
        <View style={{display:loadding?'block':'none'}}><Text>正在提交...</Text></View>
        <View style={{width:'70%',height:pxToDp(40),marginTop:pxToDp(20),alignSelf:'center',}}>
          <ThButton  onPress={this.phoneNumberSubmit} title="获取验证码" style={{backgroundColor:'#e07089',borderRadius:pxToDp(30),}} btnTextColor='#fff'></ThButton>
        </View>
  </View>
    )
  }
  renderCode=()=>{
    const {phoneNumber} = this.state
    return(
     <View>
      <View><Text style={{fontSize:pxToDp(25),color:'#888',fontWeight:'bold'}}>输入六位验证码</Text></View>

        <View><Text style={{marginTop:pxToDp(15),color:'#888' }}>已发送：+86{phoneNumber}</Text></View>
        <View style={{width:'70%',height:pxToDp(40),marginTop:pxToDp(20),alignSelf:'center',}}>
          <ThButton  onPress={this.phoneNumberSubmit} title="重新获取" style={{backgroundColor:'#e07089',borderRadius:pxToDp(30),}} btnTextColor='#fff'></ThButton>
        </View>
     </View>
    )
  }
  render() {

    const {showLogin} = this.state
    return (
      <View>
      <StatusBar backgroundColor='transparent' translucent={true}></StatusBar>
      {/* 此时的 单位是原生的单位 */}
        <Image  style={{width:'100%',height:pxToDp(300)}} source={require('../../../img/tiqiu-pc.655aab82.png')}>
        </Image>
        {/* 登陆 */}
        <View style={{padding:pxToDp(20)}} >
          {showLogin?this.renderLogin()
          :this.renderCode()}
        </View>
      </View>

    )
  }
}
 