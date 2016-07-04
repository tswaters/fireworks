
namespace Fireworks {

  export class Particle {

    positions: Point[]
    position: Point
    velocity: Point
    resistance: number
    gravity: number
    fade: number
    shrink: number
    size: number
    alpha: number
    hue: number
    brightness: number

    constructor (position: Point) {

      this.position = {
          x: position ? position.x : 0,
          y: position ? position.y : 0
      }

      this.velocity = {
          x: 0,
          y: 0
      }

      this.shrink = 0.75
      this.size = 2
      this.resistance = 1
      this.gravity = 0
      this.alpha = 1
      this.fade = 0
      this.hue = random(0, 360)
      this.brightness = random(50, 60)

      this.positions = []
      let positionCount = 3
      while (positionCount--) {
        this.positions.push(position)
      }
    }

    update (index: number) {
      this.positions.pop()
      this.positions.unshift({x: this.position.x, y: this.position.y})
      this.velocity.x *= this.resistance
      this.velocity.y *= this.resistance
      this.velocity.y += this.gravity
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      this.size *= this.shrink
      this.alpha -= this.fade
      if (!this.exists()) {
        particles.splice(index, 1)
      }
    }

    render () {
      const lastPosition = this.positions[this.positions.length - 1]
      ctx.beginPath()
      ctx.moveTo(lastPosition.x, lastPosition.y)
      ctx.lineTo(this.position.x, this.position.y)
      ctx.lineWidth = this.size
      ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`
      ctx.stroke()
    }

    exists () {
      if (this.alpha <= 0.1 || this.size <= 1) {
        return false
      }

      if (this.position.x > cw || this.position.x < 0) {
        return false
      }

      if (this.position.y > ch || this.position.y < 0) {
        return false
      }

      return true
    }

  }

}
