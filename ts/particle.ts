
namespace Fireworks {

  export class Particle {

    position: IPoint
    velocity: IPoint
    resistance: number
    gravity: number
    fade: number
    shrink: number
    size: number
    alpha: number
    color: number

    constructor (position: IPoint) {

      this.position = {
          x: position ? position.x : 0,
          y: position ? position.y : 0
      }

      this.velocity = {
          x: 0,
          y: 0
      }

      this.shrink = .75
      this.size = 2
      this.resistance = 1
      this.gravity = 0
      this.alpha = 1
      this.fade = 0
      this.color = 0
    }

    update () {
      this.velocity.x = this.velocity.x * this.resistance
      this.velocity.y = (this.velocity.y * this.resistance) + this.gravity
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.size *= this.shrink
      this.alpha -= this.fade
    }

    render () {
      if (!this.exists()) {
        return
      }
      ctx.save()
      ctx.globalCompositeOperation = 'lighter'
      ctx.fillStyle = this.gradient
      ctx.beginPath()
      this.arc()
      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    arc () {
      const x = this.position.x
      const y = this.position.y
      const radius = this.size
      ctx.arc(x, y, radius, 0, TAU, true)
    }

    get gradient (): CanvasGradient {
      const x = this.position.x
      const y = this.position.y
      const radius = this.size / 2
      const gradient = ctx.createRadialGradient(x, y, 0.1, x, y, radius)
      gradient.addColorStop(0.1, `rgba(255, 255, 255, ${this.alpha})`)
      gradient.addColorStop(0.8, `hsla(${this.color}, 100%, 50%, ${this.alpha})`)
      gradient.addColorStop(1, `hsla(${this.color}, 100%, 50%, 0.1)`)
      return gradient
    }

    exists () {
      if (this.alpha <= 0.1 || this.size <= 1) {
        return false
      }

      if (this.position.x > viewPortWidth || this.position.x < 0) {
        return false
      }

      if (this.position.y > viewPortHeight || this.position.y < 0) {
        return false
      }

      return true
    }

  }

}
