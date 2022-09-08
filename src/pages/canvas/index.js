import React, { useEffect, useRef } from "react";
import Canvas from "react-native-canvas";
import { View, PanResponder } from "react-native";
import layoutRef from "./layoutRef";
const RulerCanvas = () => {
  const rulerWrap = useRef(rulerWrap);
  const canvasContent = useRef(canvasContent);
  let winWidth = 0;
  let initX = 0; //初始x 距离
  let endX = 0; //结束x 距离
  let distanceX = 0; //移动距离
  let _distanceX = 0; // 判断用的移动距离
  let count = 0;
  let lastX = 0; //上次移动距离
  let rulerWrapInfo = {};
  let cxt = null; //canvas
  let canvas = null;
  let division = 0; //每个刻度的距离 分割线
  let scaleValueList = []; //刻度值数组

  const initParams = {
    el: rulerWrap,
    height: 20,
    maxScale: 600,
    startValue: 20,
    region: false,
    background: "#f5f5f5",
    color: "#000",
    markColor: "#FFCC33",
    isConstant: false,
  };
  useEffect(() => {
    setTimeout(async () => {
      const rulerWrapRef = await layoutRef(rulerWrap.current);
      rulerWrapInfo = rulerWrapRef;
      winWidth = rulerWrapInfo.width;
      lastX = count = initParams.startValue;
      //调用刻度尺方法
      initRuler();
    });
  }, []);
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e) => {
        mousedown(e);
      },
      onPanResponderMove: (e, gestureState) => {},

      onPanResponderRelease: (e) => {
        moveEvent(e);
      },
    })
  ).current;

  /**
   * 初始化刻度尺插件
   * @el 容器 String
   * @height 刻度尺高度 Number
   * @maxScale 最大刻度 Number
   * @startValue 开始的值 Number
   * @region 区间 Array
   * @background 刻度尺背景颜色 String
   * @color 刻度线和字体的颜色 String
   * @markColor  中心刻度标记颜色 String
   * @isConstant 是否不断地获取值 Boolean
   * @success(res) 滑动结束后的回调 Function
   * */
  const initRuler = () => {
    var rulerWrap = initParams.el; //获取容器
    rulerWrap.height = initParams.height < 50 ? 50 : initParams.height;
    initParams.maxScale = initParams.maxScale < 50 ? 50 : initParams.maxScale;

    //最大刻度的小值是50

    if (initParams.startValue > initParams.maxScale) {
      initParams.startValue = initParams.maxScale;
    }

    var minSildeNum = 0; //最小滑动的值
    var maxSildeNum = initParams.maxScale; //最大滑动的值

    if (initParams.region) {
      minSildeNum = Math.floor(initParams.region[0]);
      maxSildeNum = Math.floor(initParams.region[1]);
    }
    division = winWidth / 100; //每个刻度的距离 分割线
    for (var i = 0; i <= initParams.maxScale; i += 10) {
      scaleValueList.push(`${i / 10}s`);
    }
    canvas = canvasContent.current; //获取容器下的canvas标签
    //没有canvas就创建一个
    cxt = canvas.getContext("2d");
    canvas.width = winWidth;
    drawRuler(count, cxt);
  };
  const drawRuler = (count, cxt) => {
    //画刻度尺
    count = count - 25;
    //清空画布
    cxt.clearRect(0, 0, winWidth, initParams.height);

    //刻度尺背景
    if (initParams.background) {
      cxt.fillStyle = initParams.background;
      cxt.fillRect(0, 0, canvas.width, initParams.height);
    }

    //画刻度线
    for (let i = 0; i < initParams.maxScale; i++) {
      cxt.beginPath();
      cxt.save();
      cxt.strokeStyle = initParams.color ? initParams.color : "#bbb";
      cxt.lineWidth = 1;
      cxt.lineCap = "round";
      cxt.moveTo(division * i - count * division, 0);
      cxt.lineTo(
        division * i - count * division,
        Math.floor(initParams.height * 0.3)
      );

      if (i % 2 === 0) {
        cxt.strokeStyle = initParams.color ? initParams.color : "#999";
        cxt.lineTo(
          division * i - count * division,
          Math.floor(initParams.height * 0.35)
        );
      }
      if (i % 10 === 0) {
        cxt.strokeStyle = initParams.color ? initParams.color : "#666";
        cxt.lineTo(
          division * i - count * division,
          Math.floor(initParams.height * 0.52)
        );
      }

      cxt.stroke();
      cxt.restore();
      cxt.closePath();
    }

    //添加体重数字
    cxt.beginPath();
    cxt.font = 18;
    cxt.fillStyle = initParams.color ? initParams.color : "#333";
    cxt.textAlign = "left";
    cxt.textBaseline = "bottom";
    scaleValueList.forEach(function (num, i) {
      cxt.fillText(
        num.toString(),
        division * i * 10 - count * division,
        Math.floor(initParams.height * 0.75)
      );
    });
    cxt.closePath();

    // //中心刻度线
    cxt.beginPath();
    cxt.save();
    cxt.strokeStyle = initParams.markColor;
    cxt.lineWidth = 2;
    cxt.lineCap = "round";
    cxt.moveTo(winWidth / 2, 0);
    cxt.lineTo(winWidth / 2, Math.floor(initParams.height * 0.52));
    cxt.stroke();
    cxt.restore();
    cxt.closePath();
  };
  //鼠标按下
  const mousedown = (e) => {
    initX = e.nativeEvent.pageX;
  };

  //手指&鼠标移动事件
  const moveEvent = (e) => {
    endX = e.nativeEvent.pageX;
    distanceX = Math.floor((endX - initX) / (rulerWrapInfo.width / 50));
    if (distanceX === _distanceX) {
      return false;
    }

    _distanceX = distanceX;
    count = lastX + distanceX;
    lastX = count;
    if (count >= initParams.maxScale || count <= 0) {
      count = count >= initParams.maxScale ? initParams.maxScale : 0;
    }
    console.log(count);

    drawRuler(count, cxt);
    // if (initParams.isConstant) {
    //   params.success && params.success(count);
    // }
  };

  return (
    <View
      ref={rulerWrap}
      style={{ flex: 1, width: 600, height: 300, margin: 20 }}
      {...panResponder.panHandlers}
    >
      <Canvas ref={canvasContent}></Canvas>
    </View>
  );
};
export default RulerCanvas;
