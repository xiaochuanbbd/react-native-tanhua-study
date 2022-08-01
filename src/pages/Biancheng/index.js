import React, { Component } from 'react'
import { View,Text,StyleSheet } from 'react-native'

export default class Home extends Component {
  render() {
    return (
      <View style={styles.container}><Text>编程</Text></View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    width:'100%',
    height:'100%',
    flex:1,
    backgroundColor: '#2d418f',
    backdropFilter:' blur(15px)'
  }
})
