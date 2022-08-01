//存放路由结构
// In App.js in a new project
import {Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/account/Login'
// import Demo from './pages/account/Demo.js'
import Home from "./pages/Home";
import Tabbar from './tabbar'
// function HomeScreen({navigation}) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Home Screen</Text>
//       <Button title='go to details' onPress={
//       ()=>navigation.navigate('Details')
//       }></Button>
//     </View>
//   );
// }
function DetailsScreen(){
  return(
    <View>
      <Text>details</Text>
    </View>
  )
}

const Stack = createNativeStackNavigator();

function  Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Tabbar'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Tabbar" component={Tabbar} />
        {/* <Stack.Screen name="Demo" component={Demo} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;