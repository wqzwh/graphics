class Arrow {
    constructor(x, y, color, angle) {
        // 箭头中心x坐标，默认值为0
        this.x = x || 0
        // 箭头中心y坐标，默认值为0
        this.y = y || 0
        // 颜色，默认值为red
        this.color = color || 'red'
        // 旋转角度，默认值为0
        this.angle = angle || 0
    }

    stroke(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.moveTo(-20, -10)
        ctx.lineTo(0, -10)
        ctx.lineTo(0, -20)
        ctx.lineTo(20, 0)
        ctx.lineTo(0, 20)
        ctx.lineTo(0, 10)
        ctx.lineTo(-20, 10)
        ctx.closePath()
        ctx.stroke()
        ctx.restore()
    }

    fill(ctx) {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.angle)
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.moveTo(-20, -10)
        ctx.lineTo(0, -10)
        ctx.lineTo(0, -20)
        ctx.lineTo(20, 0)
        ctx.lineTo(0, 20)
        ctx.lineTo(0, 10)
        ctx.lineTo(-20, 10)
        ctx.closePath()
        ctx.fill()
        ctx.restore()
    }
}