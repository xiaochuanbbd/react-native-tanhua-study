import React, {Component} from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';

const circle = require('../pages/Babyseal/img/svgicon/loading.png');
class Index extends Component {
    constructor(props) {
        super(props);
        this.spinValue = new Animated.Value(0)
        this.state = {
        };
    }
    componentDidMount(){
        this.spin();
    }
    //旋转方法
    spin = () => {
        this.spinValue.setValue(0)
        Animated.timing(this.spinValue,{
          toValue: 1, // 最终值 为1，这里表示最大旋转 360度
          duration: 2000,
          easing: Easing.linear,
          useNativeDriver: false
       }).start(() => this.spin())
    }
    render() {
        const { user, pwd, fadeAnim} = this.state;
        //映射 0-1的值 映射 成 0 - 360 度  
        const spin = this.spinValue.interpolate({
            inputRange: [0, 1],//输入值
            outputRange: ['0deg', '360deg'] //输出值
          })
        return(
            // <View style={styles.container}>
                    <Animated.Image style={[styles.circle,{transform:[{rotate: spin }],
                    display:this.props.isShow?'flex':'none',
                    ...this.props.styles}]} source={circle}/>
            // </View>
        );
    }
}
const styles = StyleSheet.create({
    circle:{
        position:'absolute',
    }
});
export default Index;