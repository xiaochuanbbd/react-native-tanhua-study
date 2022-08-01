import {Dimensions} from 'react-native'
//转换单位
// 设计稿宽度/元素的宽度 = 手机屏幕/手机中元素的宽度
//手机中元素的宽度 = 手机屏幕 * 元素的宽度 / 设计稿的宽度
export const screenWidth = Dimensions.get('window').width //手机屏幕宽度
export const screenHeight = Dimensions.get('window').height

export const pxToDp = (elePx)=> screenWidth * elePx / 812