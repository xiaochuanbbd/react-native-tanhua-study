
import React, { Component } from 'react'
import { View ,Button,StyleSheet} from 'react-native';
import { pxToDp } from '../../utils/stylesKits';

export class Index extends Component {
  static defalutProps={
    style:{},
    title:'获取验证吗',
    btnTextColor:{}
  }
  render() {
    return (
      <View   style={{width:'100%',height:'100%' ,overflow:'hidden',...this.props.style}}>
        <Button disabled={this.props.disabled} onPress={this.props.onPress}   title={this.props.title}  color={this.props.btnTextColor}> </Button>
      </View>
    )
  }
}

export default Index
// Later on in your styles..
const styles = StyleSheet.create({
  buttonText: {
    textAlign: 'center',
    alignItem:'center',
    backgroundColor: 'transparent',
  },
})