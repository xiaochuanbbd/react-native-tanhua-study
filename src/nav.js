//存放路由结构
// In App.js in a new project
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './pages/account/Login'
import UserInfo from './pages/account/userInfo'
import Demo from './pages/account/Demo.js'
import Home from "./pages/Home";
import Tabbar from './tabbar'
 import Babyseal from '../src/pages/Babyseal/index.js'
 

const Stack = createNativeStackNavigator();

function  Nav() {
  return (
    <NavigationContainer>

      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='Babyseal'>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserInfo" component={UserInfo} />
        <Stack.Screen name="Tabbar" component={Tabbar} />
        <Stack.Screen name="Babyseal" component={Babyseal} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;