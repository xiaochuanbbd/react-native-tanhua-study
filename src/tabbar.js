import TabNavigator from 'react-native-tab-navigator';
import React, { Component } from 'react'
import { View,Text,Image,StyleSheet } from 'react-native';
import {pxToDp} from '../src/utils/stylesKits'
import Home from './pages/Home';
import Shequ from './pages/Shequ';
import Biancheng from './pages/Biancheng';
import { color } from '@rneui/base';
export default class tabbar extends Component {
    state = {
      pages:[
        {
          selected:'home',
          title:'首页',
          renderIcon:() => <Image style={styles.icon} source={require('../assets/tabbar/home-d.png')} />,
          renderSelectedIcon:() => <Image style={styles.icon}  source={require('../assets/tabbar/home-a.png')} />,
          onPress:() => this.setState({ selectedTab: 'home' }),
          component:Home,
        },
        {
          selected:'shequ',
          title:'社区',
          renderIcon:() => <Image style={styles.icon} source={require('../assets/tabbar/shequ-d.png')} />,
          renderSelectedIcon:() => <Image style={styles.icon}  source={require('../assets/tabbar/shequ-a.png')} />,
          onPress:() => this.setState({ selectedTab: 'shequ' }),
          component:Shequ,
        },
        {
          selected:'biancheng',
          title:'编程',
          renderIcon:() => <Image style={styles.icon} source={require('../assets/tabbar/biancheng-d.png')} />,
          renderSelectedIcon:() => <Image style={styles.icon}  source={require('../assets/tabbar/biancheng-a.png')} />,
          onPress:() => this.setState({ selectedTab: 'biancheng' }),
          component:Biancheng,
        }
      ],
      selectedTab:'home',
  }
  render() {
    const {pages,selectedTab} = this.state
    return (
     <View  style={{flex:1,width:'100%',height:'100%'}}>
     <TabNavigator   tabBarStyle={styles.container}>
            {/* { pages.map((page,i)=>  <TabNavigator.Item key={i}
                  selected={selectedTab==page.selected}
                  title={page.title}
                  renderIcon={page.renderIcon}
                  renderSelectedIcon={page.renderSelectedIcon}
                  onPress={page.onPress}
                  titleStyle={{color:'#7D93E8',fontSize:'14px'}}
                  selectedTitleStyle={{color:'#DBE2FF',fontSize:'14px'}}
                  >
                </TabNavigator.Item>)}   */}
       <TabNavigator.Item 
          titleStyle={{color:'#7D93E8',fontSize:'14px'}}
          selectedTitleStyle={{color:'#DBE2FF',fontSize:'14px'}}
          selected={this.state.selectedTab === 'home'}
          title="首页"
          renderIcon={() => <Image style={styles.icon} source={require('../assets/tabbar/home-d.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon}  source={require('../assets/tabbar/home-a.png')} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
        <Home/> 
        </TabNavigator.Item>
       <TabNavigator.Item
          titleStyle={{color:'#7D93E8',fontSize:'14px'}}
          selectedTitleStyle={{color:'#DBE2FF',fontSize:'14px'}}
          selected={this.state.selectedTab === 'shequ'}
          title="社区"
          renderIcon={() => <Image style={styles.icon}  source={require('../assets/tabbar/shequ-d.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon}  source={require('../assets/tabbar/shequ-a.png')} />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'shequ' })}>
          <Shequ/> 
        </TabNavigator.Item>
        <TabNavigator.Item
          titleStyle={{color:'#7D93E8',fontSize:'14px'}}
          selectedTitleStyle={{color:'#DBE2FF',fontSize:'14px'}}
          selected={this.state.selectedTab === 'biancheng'}
          title="编程"
          renderIcon={() => <Image style={styles.icon}  source={require('../assets/tabbar/biancheng-d.png')} />}
          renderSelectedIcon={() => <Image style={styles.icon}  source={require('../assets/tabbar/biancheng-a.png')} />}
          // renderBadge={() => <CustomBadgeView />}
          onPress={() => this.setState({ selectedTab: 'biancheng' })}>
          <Biancheng/> 

        </TabNavigator.Item>    
      </TabNavigator>
     </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
     
  },
  icon:{
    width:pxToDp(32),
    height:pxToDp(32),
  }
})