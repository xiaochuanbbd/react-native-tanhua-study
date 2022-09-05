## 属性介绍
* fillStyle设置或返回用于填充绘画的颜色、渐变或模式。 ctx.fillStyle = 'red'
* fillRect 绘制被填充的矩形 ctx.fillRect(100, 50, 400, 200)
* strokeStyle 设置或返回用于笔触的颜色、渐变或模式。ctx.strokeStyle = 'red';
* lineWidth 设置或返回当前的线条宽度。ctx.lineWidth = 10;
*	strokeRect 绘制矩形（无填充）。ctx.strokeRect(100, 50, 400, 200)
* clearRect 在给定的矩形内清除指定的像素。 clearRect
路径
* moveTo 把路径移动到画布中的指定点，不创建线条。 moveTo() 类似线的起点
* lineTo 添加一个新点，然后在画布中创建从该点到最后指定点的线条。ctx.lineTo(50, 50);
* closePath 创建从当前点回到起始点的路径。
* 绘制已定义的路径。 storke()
* quadraticCurveTo 创建二次贝塞尔曲线。
* bezierCurveTo()	创建三次贝塞尔曲线。
* arc 创建弧/曲线（用于创建圆形或部分圆）。
context.arc(x,y,r,sAngle,eAngle,counterclockwise);
x:圆的中心的x坐标
y:圆的中心的 y 坐标。
r:圆的半径。
sAngle:起始角，以弧度计（弧的圆形的三点钟位置是 0 度）。
eAngle:结束角，以弧度计。
counterclockwise:可选。规定应该逆时针还是顺时针绘图。False = 顺时针，true = 逆时针。
  中心：arc(**100,75,**50,0* Math.PI,1.5 *Math.PI)
  起始角：arc(100,75,50,**0**,1.5*Math.PI)
  结束角：arc(100,75,50,0*Math.PI,**1.5*Math.PI**)
* arcTo 在画布上创建介于两个切线之间的弧：
arcTo(x1,y1,x2,y2,r)
x1:	两切线交点的横坐标。
y1:	两切线交点的纵坐标。
x2:第二条切线上一点的横坐标。
y2:第二条切线上一点的纵坐标。
r:弧的半径。 （类似radius)

* scale 缩放 
context.scale(scalewidth,scaleheight);
详解：scalewidth	缩放当前绘图的宽度（1=100%，0.5=50%，2=200%，依次类推）。
 scaleheight	缩放当前绘图的高度（1=100%，0.5=50%，2=200%，依次类推）。

 * rotate 旋转
 context.rotate(angle);
 注意：旋转只会影响到旋转完成后的绘图。
angle：旋转角度，以弧度计。如需将角度转换为弧度，请使用 degrees*Math.PI/180 公式进行计算。
实例：如需旋转 5 度，可规定下面的公式：5*Math.PI/180。

* translate (x,y) 
添加到水平坐标（x）上的值。
添加到垂直坐标（y）上的值。
translate() 方法重新映射画布上的 (0,0) 位置。
ps：当 在 translate() 之后调用诸如 fillRect() 之类的方法时，值会添加到 x 和 y 坐标值上。
