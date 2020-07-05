const C = {}

/**
 * 获取canvas上像素坐标
 * @param object ele 元素dom节点
 */
C.getOffset = (ele) => {
  const mouse = {
    x: 0,
    y: 0
  }
  ele.addEventListener('mousemove', (e) => {
    const { x, y } = C.eventWrapper(e)
    mouse.x = x
    mouse.y = y
  })
  return mouse
}

/**
 * 获取点击事件当前的x、y坐标
 * @param object ev 事件对象
 */
C.eventWrapper = (ev) => {
  const { pageX, pageY, target } = ev
  const { left, top } = target.getBoundingClientRect()
  return {
    x: pageX - left,
    y: pageY - top
  }
}

/**
 * 绘制多边形的方法
 * @param {*} ctx canvas中context上下文
 * @param {*} n n边形
 * @param {*} dx n边形中心点x轴坐标
 * @param {*} dy n边形中心点y轴坐标
 * @param {*} size n边形的大小
 * @param {*} isFill 是否填充
 * @param {*} color 颜色值
 */
C.createPolygon = (ctx, n, dx, dy, size, isFill, color = '#cccccc') => {
  ctx.beginPath()
  const degree = (2  * Math.PI) / n
  for (let i = 0; i < n; i++) {
    const x = Math.cos(i * degree)
    const y = Math.sin(i * degree)
    ctx.lineTo(x * size + dx, y * size + dy)
  }
  ctx.closePath()
  if (isFill) {
    ctx.fillStyle = color
  } else {
    ctx.strokeStyle = color
  }
}

/**
 * 绘制圆角矩形
 * @param {*} ctx canvas中context上下文
 * @param {*} width 圆角矩形宽度
 * @param {*} height 圆角矩阵高度
 * @param {*} r 圆角半径
 * @param {*} offsetX 距离左上角顶点的x坐标
 * @param {*} offsetY 距离左上角顶点的y坐标
 * @param {*} isFill 是否填充
 * @param {*} color 颜色值
 */
C.createRoundedRect = (ctx, width, height, r, offsetX, offsetY, isFill, color = '#cccccc') => {
  ctx.beginPath()
  ctx.moveTo(offsetX + r, offsetY)
  ctx.lineTo(offsetX + width - r, offsetY)
  ctx.arcTo(offsetX + width, offsetY, offsetY + width, offsetY + r, r)
  ctx.lineTo(offsetX + width, offsetY + height -r)
  ctx.arcTo(offsetX + width, offsetY + height, offsetX + width - r, offsetY + height - r)
  ctx.lineTo(offsetX + r, offsetY + height)
  ctx.arcTo(offsetX, offsetY + height, offsetX, offsetY + height -r, r)
  ctx.lineTo(offsetX, offsetY + r)
  ctx.arcTo(offsetX, offsetY, offsetX + r, offsetY, r)
  ctx.closePath()

  if (isFill) {
    ctx.fillStyle = color
  } else {
    ctx.strokeStyle = color
  }
}

/**
 * 绘制N叶草
 * @param {*} ctx canvas中context上下文
 * @param {*} n n片
 * @param {*} dx 叶子中心位置的x坐标
 * @param {*} dy 叶子中心位置的y坐标
 * @param {*} size 叶子的大小
 * @param {*} length 叶子的长度
 * @param {*} isFill 是否填充
 * @param {*} color 颜色值
 */
C.createLeaf = (ctx, n, dx, dy, size, length, isFill, color = '#cccccc') => {
  ctx.beginPath()
  ctx.moveTo(dx, dy + size)
  const degree = 2 * Math.PI / n

  for (let i = 1; i < n; i++) {
    // 计算控制点的坐标
    const cx1 = Math.sin((i -1) * degree) * length + dx
    const cy1 = Math.cos((i - 1) * degree) * length + dy
    const cx2 = Math.sin(i * degree) * length + dx
    const cy2 = Math.cos(i * degree) * length + dy

    // 计算结束点的坐标
    const x = Math.sin(i * degree) * size + dx
    const y = Math.cos(i * degree) * size + dy
    ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y)
  }
  ctx.closePath()

  if (isFill) {
    ctx.fillStyle = color
  } else {
    ctx.strokeStyle = color
  }
}

/**
 * 图片转换效果
 * @param {*} data 图片对应的像素数据 
 */
C.inverseEffect = (data) => {
  for (let i = 0; i < data.length; i+=4) {
    data[i + 0] = 255 - data[i + 0]
    data[i + 1] = 255 - data[i + 1]
    data[i + 2] = 255 - data[i + 2]
  }
  return data
}

/**
 * 黑白效果
 * @param {*} data 图片对应的像素数据 
 * @param array weight 黑白效果对应的权重数据，分别代表红、绿、蓝
 */
C.blackWhiteEffect = (data, weight = [1, 1, 1]) => {
  for (let i = 0; i < data.length; i+=4) {
    const average = (data[i] * weight[0] + data[i + 1] * weight[1] + data[i + 2] * weight[2]+ data[i + 3]) / 3
    data[i + 0] = average
    data[i + 1] = average
    data[i + 2] = average
  }
  return data
}

/**
 * 亮度效果
 * @param {*} data 图片对应的像素数据 
 * @param number weight
 */
C.brightnessEffect = (data, weight = 0) => {
  for (let i = 0; i < data.length; i+=4) {
    data[i + 0] += weight
    data[i + 1] += weight
    data[i + 2] += weight
  }
  return data
}

/**
 * 复古效果
 * @param {*} data 图片对应的像素数据 
 * @param array weight 二维数组
 */
C.retroEffect = (data, weight = [[1, 1, 1], [1, 1, 1], [1, 1, 1]]) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    data[i] = r * weight[0][0] + g * weight[0][1] + b * weight[0][2]
    data[i + 1] = r * weight[1][0] + g * weight[1][1] + b * weight[1][2]
    data[i + 2] = r * weight[2][0] + g * weight[2][1] + b * weight[2][2]
  }
  return data
}

/**
 * 红色效果
 * @param {*} data 图片对应的像素数据 
 */
C.redEffect = (data) => {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    const average = (r + g + b) / 3
    data[i] = average
    data[i + 1] = 0
    data[i + 2] = 0
  }
  return data
}

/**
 * 透明效果
 * @param {*} data 图片对应的像素数据
 * @param number o 透明度设置
 */
C.transparencyEffect = (data, o = 1) => {
  for (let i = 0; i < data.length; i += 4) {
    data[i + 3] = data[i + 3] * o
  }
  return data
}

/**
 * 获取鼠标位置
 * @param {*} ele canvasDom 
 */
C.getMouse = (ele) => {
  const mouse = {
    x: 0,
    y: 0
  }
  ele.addEventListener('mousemove', (_e) => {
    let x, y
    let e = _e || window.event
    if (e.pageX || e.pageY) {
        x = e.pageX
        y = e.pageY
    } else {
      // ie8以下，复杂模式下的谷歌浏览器
        x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft
        y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop
    }
    x -= ele.offsetLeft
    y -= ele.offsetTop

    mouse.x = x
    mouse.y = y
  }, false)
  return mouse
}

/**
 * 获取键盘控制方向
 */
C.getKey = () => {
  const key = {}
  window.addEventListener('keydown', (e) => {
    if (e.keyCode === 38 || e.keyCode === 87) {
      key.direction = 'up'
    } else if (e.keyCode === 39 || e.keyCode === 68) {
      key.direction = 'right'
    } else if (e.keyCode === 40 || e.keyCode === 83) {
      key.direction = 'down'
    } else if (e.keyCode === 37 || e.keyCode === 65) {
      key.direction = 'left'
    } else {
      key.direction = ''
    }
  }, false)
  return key
}

/**
 * 动画循环，兼容各大浏览器
 */
window.requestAnimationFrame = (
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  function (callback) {
      return window.setTimeout(callback, 1000 / 60)
  }
)

/** 
 *
 * 随机颜色 
*/
C.getRandomColor = () => {
  const color = (function(color){
    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length === 6) ? color : arguments.callee(color)
  })('')
  return `#${color}`
}

/**
 * 判断两个矩形是否发生碰撞：两个矩形左上角的坐标范围
 * @param {*} rectA 
 * @param {*} rectB 
 */
C.checkRect = (rectA, rectB) => {
  return !(rectA.x + rectA.width < rectB.x ||
          rectB.x + rectB.width < rectA.x ||
          rectA.y + rectA.height < rectB.y ||
          rectB.y + rectB.height < rectA.y)
}

C.checkCircle = (circleA, circleB) => {
  const dx = circleB.x - circleA.x
  const dy = circleB.y - circleA.y
  const distance = Math.sqrt(dx * dx + dy * dy)
  if (distance < (circleA.r + circleB.r)) {
    return true
  } else {
    return false
  }
}