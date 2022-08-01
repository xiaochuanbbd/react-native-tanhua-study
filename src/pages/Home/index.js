import React, { Component } from 'react'
import { View,Text,SafeAreaView,ScrollView,FlatList,TouchableOpacity,StyleSheet,ImageBackground,Image } from 'react-native'
import {pxToDp} from '../../utils/stylesKits';
export default class Home extends Component {
    state = {
      data:[
        {
          id:1,
          src :require('./img/photo.png'),
        },
        {
          id:2,
          src :require('./img/tiaowu.png'),
        },
        {
          id:3,
          src :require('./img/jiashi.png'),
        },
        {
          id:4,
          src :require('./img/jiguang.png'),
        },
      ]
  }
   

  render() {
    const {data} = this.state
    const  Item = ({ item, onPress }) => (
      <TouchableOpacity onPress={onPress}  style={cardStyles.container} >
        <Image source={item.src} style={cardStyles.cardItem}  ></Image>
      </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
      return (
        <Item
          item={item}
          onPress={() => setSelectedId(item.id)}
        />
      );
    };
    const   setSelectedId=(id)=>{
      console.log(id);
    }
    return (
       <ImageBackground style={ styles.container} source={require('./img/home-bg.png')}>
        <SafeAreaView style={{flex:1}}>
          <ScrollView>
            {/* header部分 */}
            <View style={styles.headWarp}>
              <Image style={styles.userIcon}></Image>
              <TouchableOpacity  style={styles.headBtn}><Text  style={styles.btnText}>点我连接</Text> 
              <Image style={styles.robtIcon}></Image></TouchableOpacity>
            </View>
            {/* header结束 */}
            {/* card */}
            <FlatList
            horizontal={true}
              data={data}
              renderItem={renderItem}
              keyExtractor={item => item}
            />
            {/* <View style={cardStyles.container}>
                
                <TouchableOpacity  style={cardStyles.cardItem}><Image source={require('./img/tiaowu.png')}></Image></TouchableOpacity>
                <TouchableOpacity style={cardStyles.cardItem}><Image source={require('./img/jiashi.png')}></Image></TouchableOpacity>
                <TouchableOpacity style={cardStyles.cardItem}><Image source={require('./img/jiguang.png')}></Image></TouchableOpacity>
            </View> */}
          </ScrollView>
        </SafeAreaView> 
       </ImageBackground>   
       )
  }
}
const styles = StyleSheet.create({
  container:{
  flex:1,
  paddingTop: pxToDp(15),
  paddingRight:pxToDp(122),
  paddingLeft:pxToDp(56)
  },
  headWarp:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
  },
  userIcon:{
    width:pxToDp(40),
    height:pxToDp(40),
    backgroundColor:'#eee',
    borderRadius:'50%',
    
  },
  headBtn:{
    // width:100,
    // height:50,
    paddingTop:pxToDp(3),
    paddingBottom:pxToDp(3),
    paddingRight:pxToDp(10),
    paddingLeft:pxToDp(10),
    borderRadius:pxToDp(26),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    borderColor:'#fff',
    borderWidth:1,
  // borderImage: 'linear-gradient(147deg, rgba(255, 255, 255, 0.29), rgba(255, 255, 255, 0.07)) 1 1',
  // shadowColor: '#47A4FF',  //设置阴影色
  //   shadowOffset:{width:0,height:0},  //设置阴影偏移,该值会设置整个阴影的偏移，width可以看做x,height可以看做y,x向右为正，y向下为正
  //   shadowOpacity: 1,
  //   shadowRadius: 1.5,  
  //   // backdropFilter:'blur(10px)'
  },
  btnText:{
    fontSize: 12,
    lineHeight:14,
    fontWeight:'bold',
    color: '#C2D0FF',
    marginRight:pxToDp(5)
  },
  robtIcon:{
    width:pxToDp(36),
    height:pxToDp(36),
    backgroundColor:'#eee',
    borderRadius:'50%'
  }

})
const cardStyles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginTop:pxToDp(20),
    overflow:'auto',
    
  },
   cardItem:{
    marginRight:pxToDp(20)
   }
})

