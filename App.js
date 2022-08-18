import React, { Component } from 'react'
import { View,Text} from 'react-native'
import Nav from './src/nav'
import {LogBox} from "react-native";
import mock from './src/mock'
import Babyseal from './src/pages/Babyseal/index'
import EngineeringCar from './src/pages/EngineeringCar/index'
import Joystick from './Joystick';
LogBox.ignoreLogs([
"ViewPropTypes will be removed",
"ColorPropType will be removed",
])
 class App extends Component {
  render() {
    return (
      <View style={{flex:1}}>
        <EngineeringCar></EngineeringCar>
      </View>
    )
  }
}
export default App
