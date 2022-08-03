
import React, { Component } from 'react'
import { Text} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export class Index extends Component {
  // static defalutProps={
  //   style:{},
  //   title:'获取验证吗',
  //   btnTextColor:{}
  // }
  render() {
    return (
      <LinearGradient
        colors={this.props.colors}
        start={this.props.start}
        style={{...this.props.linearStyle}}>
        <Text
          style={ {...this.props.TextStyle}}>
         {this.props.txt}
        </Text>
      </LinearGradient>
    )
  }
}

export default Index
 