import React, { Component } from 'react'
import { View,Text,SafeAreaView,BVLinearGradient,ScrollView,FlatList,TouchableOpacity,StyleSheet,ImageBackground,Image, Button } from 'react-native'
import {pxToDp} from '../../utils/stylesKits';
import LinearGradientBtn from '../../components/LinearGradientBtn'
import Swiper from 'react-native-swiper';

 const App = ()=>{
    const state = {
      data:[
        {
          id:1,
          title:'拍照互动',
          src :require('./img/photo.png'),
        },
        {
          id:2,
          title:'不如跳舞',

          src :require('./img/tiaowu.png'),
        },
        {
          id:3,
          title:'拍照互动',

          src :require('./img/jiashi.png'),
        },
        {
          id:4,
          title:'激光追踪',
          src :require('./img/jiguang.png'),
        },
      ]
  }
    const {data} = state
    const  CardItem = ({ item, onPress }) => (
      <TouchableOpacity onPress={onPress}  style={cardStyles.container} >
        <Image source={item.src} style={cardStyles.cardItem}></Image>
        <Text style={cardStyles.txt}>{item.title}</Text>
      </TouchableOpacity>
    );
    const renderItem = ({ item }) => {
      return (
        <CardItem
          item={item}
          onPress={() => setSelectedId(item.id)}
        />
      );
    };
    const ListItem = ({item,onPress})=>(
      <TouchableOpacity onPress={onPress}   style={listStyles.container} >
      <Image source={item.src} style={listStyles.listItem}></Image>
      <Text style={listStyles.txt}>{item.title}</Text>
    </TouchableOpacity>
    )
    const renderListItem = ({item})=>{
      return (
        <ListItem
          item={item}
          onPress={() => selectList(item.id)}
        />
      );
    }
    const  setSelectedId=(id)=>{
      console.log(id);
    }
    const selectList = (id)=>{
      console.log('list'+id);
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
              keyExtractor={item => item.id}
            />
            {/* card结束 */}
            {/* banner */}
            <View style={bannerStyles.bannerWarp}>
              <ImageBackground style={bannerStyles.killWarp} source={require('./img/jinengshu-bg.png')}>
                <Text style={bannerStyles.killH1}>技能书</Text>
                <Text style={bannerStyles.killP}>今日啥清热哦开口咖啡刀客个任务</Text>
               <TouchableOpacity> 
                <LinearGradientBtn 
                  start={[0.1, 0.1]}
                  linearStyle={bannerStyles.linearWarp}
                  colors={['#FF8636', '#FF8636']}
                  TextStyle={bannerStyles.linearText}
                  txt={'快来看看'}
                  ></LinearGradientBtn>
               </TouchableOpacity>
              </ImageBackground>
              <Swiper
              
                       style={bannerStyles.swiper}
                        height={220}
                        horizontal={true}
                        autoplay={true}
                        loop={true}
                        showsPagination={true} 
                        paginationStyle={{bottom: pxToDp(10)}}
                        dotStyle={{backgroundColor:'#fff',width:pxToDp(6),height:pxToDp(6)}}
                        activeDotStyle={{backgroundColor:'#ef8b4a',width:pxToDp(16),height:pxToDp(6)}}
                        showsButtons={false}
                      >
                  <Image source={require('./img/jiashi.png')}></Image>
                  <Image source={require('./img/jiguang.png')}></Image>
                  <Image source={require('./img/jiashi.png')}></Image>
                  <Image source={require('./img/tiaowu.png')}></Image>
              </Swiper>
            </View>
            {/* banner结束 */}
            {/* 列表 */}
            <View style={ListStyle.ListWarp}>
            <FlatList
               numColumns={2}
              horizontal={false}
              data={data}
              renderItem={renderListItem}
              keyExtractor={item => item.id}
              columnWrapperStyle={{marginBottom:pxToDp(20)}}
            />
            </View>

          </ScrollView>
        </SafeAreaView> 
       </ImageBackground>   
       )
 
}
const styles = StyleSheet.create({
   
  container:{
  flex:1,
  paddingTop: pxToDp(15),

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
    borderRadius:50,
    
  },
  headBtn:{
    paddingTop:pxToDp(3),
    paddingBottom:pxToDp(3),
    paddingLeft:pxToDp(10),
    paddingRight:pxToDp(10),
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
    borderRadius:50
  }

})
const cardStyles = StyleSheet.create({
  container:{
    flexDirection:'row',
    marginTop:pxToDp(20),
    overflow:'auto',
    position:'relative',
  },
   cardItem:{
    marginRight:pxToDp(20)
   },
   txt:{
    position:'absolute',
    left:pxToDp(17),
    top:pxToDp(29),
    color:"#fff",
    fontSize:pxToDp(32),
    fontWeight:'bold'
   }
})
const bannerStyles = StyleSheet.create({
  bannerWarp:{
    marginTop:pxToDp(40),
    flexDirection:'row',
    alignItems:'center',
    justifyContent:"space-between",
    height:pxToDp(194)
  },
  killWarp:{
    width:pxToDp(226),
    height:pxToDp(194),
    justifyContent:'space-between',
    paddingTop:pxToDp(25),
    paddingLeft:pxToDp(20),
    paddingRight:pxToDp(38),
    paddingBottom:pxToDp(38),
    marginRight:pxToDp(20)
    
  },
  killH1:{
    color:"#fff",
    fontSize:pxToDp(32),
    fontWeight:'bold'
  },
  killP:{
    fontSize:pxToDp(14),
    color:' rgba(255,255,255,0.9500)',
    lineHeight: pxToDp(21)
  },
  linearWarp:{
     padding: 10, 
    marginTop:pxToDp(5),
    alignItems: 'center',
   borderRadius: pxToDp(26) 
  },
  linearText:{
    backgroundColor: 'transparent',
    fontSize: pxToDp(16),
    color: '#fff',
    fontWeight:'bold'
  },
  swiperWarp:{
    flex:1,
  }
 
})
const ListStyle =StyleSheet.create({
  ListWarp:{
    marginTop:pxToDp(20)
  }
})
const listStyles = StyleSheet.create({
  container:{
    width:'48%',
    backgroundColor:'#4662ce',
    borderRadius:pxToDp(24),
    padding:pxToDp(12),
    marginRight:pxToDp(20),

    justifyContent:'space-between'
  },
  listItem:{
    width:'100%',
    height:pxToDp(160),
  },
  txt:{
    fontSize:pxToDp(14),
    color:'#e7ecff',
    textAlign:'center',

  }
}) 

export default App

