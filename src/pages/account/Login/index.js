import React, { Component } from 'react'
import { View, Text,Image ,StatusBar, Button,StyleSheet} from 'react-native';
import {pxToDp} from "../../../utils/stylesKits"
import validator from "../../../utils/validator"
import { Input } from "@rneui/themed";
import request from '../../../utils/request.js'
import ThButton from '../../../components/ThButton'
import Toast from 'react-native-easy-toast';


import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
 
export default class Login extends Component {
  state={
    phoneNumber :"18229999999",
    phoneValid:true,
    loadding:false,
    showLogin:true,
    vCodeText:'',
    btnText:'重新获取',
    isCountDown:false
  }
  onVcodeChangeText = (vCodeText)=>{
    this.setState({vCodeText})
  }
  phoneNumChangeText = (phoneNumber)=>{
      this.setState({phoneNumber})
  }
  //重新获取
  repGetcode=()=>{
    this.countDown()
  }
  countDown= ()=>{
    if(this.state.isCountDown){
      return
    }
    this.setState({isCountDown:true})
    let  seconds = 5
    this.setState({btnText:`重新获取(${seconds}s)`})

    let timeId = setInterval(()=>{
      seconds--
      this.setState({btnText:`重新获取(${seconds}s)`})
      if(seconds==0){
        clearInterval(timeId)
        this.setState({btnText:`重新获取`,isCountDown:false})
      }
    },1000)
  }
  // 点击验证码输入完毕事件
  onSubmitEditing =async ()=>{
      // 对验证码进行校验 长度
    const {vCodeText,phoneNumber} = this.state
    if(vCodeText.length!=6){
      this.toast.show('请输入正确的验证码',2000);
      return
    }
    const res = await request.post('/loginVerification',{
      phone:phoneNumber,
      vcode:vCodeText
    })
    if(res.code!=='10000'){
      this.toast('请求失败')
      return
    }
    if(res.isNew){
     //新用户 去用户页面
     this.props.navigation.navigate('UserInfo')

    }else{
      alert('1')
    }


      //将手机号码和验证码发送给后台
      //返回值 isNew
      // 新用户去完善个人信息页面
      //老用户去首页
  }
  //点击手机号输入完成触发该时间
  phoneNumberSubmit=async ()=>{
    const {phoneNumber} =this.state
    const phoneValid = validator.validatePhone(phoneNumber)
    //1.手机号验证未通过
    if(!phoneValid){
      this.setState({phoneValid})
      return
    }
    this.setState({loadding:true})
    //开启获取验证码定时器
  try{
    const res = await request.post('/login',{phone:phoneNumber})
    if(res.code =='10000'){
      this.setState({loadding:false,showLogin:false})
      this.countDown()
    }
  } catch(e){
    console.log(e);
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
    const {phoneNumber,vCodeText,btnText,isCountDown} = this.state
    return(
     <View>
      <View><Text style={{fontSize:pxToDp(25),color:'#888',fontWeight:'bold'}}>输入六位验证码</Text></View>

        <View><Text style={{marginTop:pxToDp(15),color:'#888' }}>已发送：+86{phoneNumber}</Text></View>
        <View>
        <CodeField
        value={vCodeText}
        onChangeText={this.onVcodeChangeText}
        onSubmitEditing={this.onSubmitEditing}
        cellCount={6}
        rootStyle={styles.codeFiledRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
          >
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
        </View>
        <View style={{width:'70%',height:pxToDp(40),marginTop:pxToDp(20),alignSelf:'center',}}>
          <ThButton disabled={isCountDown}  onPress={this.repGetcode} title={btnText} style={{backgroundColor:'#e07089',borderRadius:pxToDp(30),}} btnTextColor='#fff'></ThButton>
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
        <Image  style={{width:'100%',height:pxToDp(300)}} source={require('../../../img/tiqiu-pc.png')}>
        </Image>
        {/* 登陆 */}
        <View style={{padding:pxToDp(20)}} >
          {showLogin?this.renderLogin()
          :this.renderCode()}
        </View>
        <Toast ref={(toast) => this.toast = toast}     
/>

      </View>

    )
  }
}
 

const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderWidth:2,
    borderColor: '#7d53ea',
    // borderBottomWidth:2,
    color:'#7d53ea',
    textAlign:'center'

  },
  focusCell: {
    borderColor: '#7d53ea',
  },
});
 
 