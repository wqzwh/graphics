class Ball {
  constructor(x = 0, y = 0, r = 12, color = 'red') {
    this.x = x // 小球中心x坐标
    this.y = y // 小球中心y坐标
    this.r = r // 小球半径
    this.color = color // 小球颜色

    this.scaleX = 1
    this.scaleY = 1

    // x,y方向的速度
    this.vx = 1
    this.vy = 1
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

  // 求出小球的外接矩形
  geRect() {
    const rect = {
      x: this.x - this.r,
      y: this.y - this.r,
      width: this.r * 2,
      height: this.r * 2
    }
    return rect
  }

  // 检测是否被捕获
  checkMouse(mouse) {
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx * dx + dy * dy)
    if (distance < this.r) {
      return true
    } else {
      return false
    }
  }
}