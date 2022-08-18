import React, { Component } from 'react'
import { View,Text, SafeAreaView ,TouchableOpacity,StyleSheet} from 'react-native'
import { pxToDp } from '../../../utils/stylesKits'
import SvgUri from 'react-native-svg-uri'
export default class UserInfo extends Component {
    state = {
      svgList:[
        {
           imgSrc:require('./img/male.svg'),
        },
        {
           imgSrc:require('./img/famale.svg'),
        }
      ],
      gender:''

  }
  changeGender = (gender)=>{
     this.setState({gender})
  }
  render() {
    const {svgList} = this.state

    return (
      <SafeAreaView style={{backgroundColor:'#fff',flex:1,paddingLeft:pxToDp(30)}}>
      {/* {标题} */}
        <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold'}} >填写资料</Text>
        <Text style={{fontSize:pxToDp(20),color:'#666',fontWeight:'bold'}}>提升我的魅力</Text>
      {/* 性别 */}
      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:pxToDp(30)}} >
      {
        svgList.map((svg,index)=>{
          return (
            <TouchableOpacity style={svgStyle.svgIcon} key={index} onPress={()=>this.changeGender(index)} >
              <SvgUri onPress={this.changeGender} source={svg.imgSrc} width={pxToDp(40)} height={pxToDp(40)}/>
           </TouchableOpacity>
          )
        })
      }
        </View>
      </SafeAreaView>
    )
  }
}
const svgStyle = StyleSheet.create({
  svgIcon:{width:pxToDp(60),height:pxToDp(60),borderRadius:'50%',backgroundColor:'#eee',alignItems:'center',justifyContent:'center',marginRight:pxToDp(20)} 
})
