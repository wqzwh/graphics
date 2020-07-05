class Ball {
  constructor(x = 0, y = 0, r = 12, color = 'red') {
    this.x = x // 小球中心x坐标
    this.y = y // 小球中心y坐标
    this.r = r // 小球半径
    this.color = color // 小球颜色

    this.scaleX = 1
    this.scaleY = 1
  }

  // 绘制描边小球
  stroke(ctx) {
    ctx.save()
    ctx.scale(this.scaleX, this.scaleY)
    ctx.strokeStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 360 * Math.PI / 180, false)
    ctx.closePath()
    ctx.stroke()
    ctx.restore()
  }

  // 绘制填充小球
  fill(ctx) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.scale(this.scaleX, this.scaleY)
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(0, 0, this.r, 0, 360 * Math.PI / 180, false)
    ctx.closePath()
    ctx.fill()
    ctx.restore()
  }
}