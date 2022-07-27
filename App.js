import React, { Component } from 'react'
import { View,Text} from 'react-native'
import Nav from './src/nav'
import second from './src/mock'
 class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <Nav></Nav>
      </View>
    )
  }
}
export default App
