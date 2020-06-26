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