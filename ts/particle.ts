
import {random, TAU} from './util'
import {Point} from './types'

type ParticleOptions = {
  position: Point
  isRocket?: boolean,
  hue?: number,
  brightness?: number,
}

export default class Particle {

  isRocket: boolean
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

  constructor ({
    isRocket = false,
    hue = random(1, 360),
    brightness = random(50, 60),
    position
  }: ParticleOptions) {

    this.isRocket = isRocket
    this.position = position
    this.positions = [
      this.position,
      this.position,
      this.position
    ]

    if (this.isRocket) {
      this.velocity = {
        x: random(-3, 3),
        y: random(-7, -3)
      }
      this.shrink = 0.999
      this.resistance = 1
    } else {
      const angle = random(0, TAU)
      const speed = Math.cos(random(0, TAU)) * 15
      this.velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed
      }
      this.shrink = random(0, 0.05) + 0.93
      this.resistance = 0.92
    }

    this.gravity = 0.01
    this.size = 3
    this.alpha = 1
    this.fade = 0
    this.hue = hue
    this.brightness = brightness
  }

  /**
   * Update the position of the particle.
   * For rockets, has a potential to explode.
   */
  update (): void {
    this.positions.pop()
    this.positions.unshift({x: this.position.x, y: this.position.y})
    this.velocity.x *= this.resistance
    this.velocity.y *= this.resistance
    this.velocity.y += this.gravity
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.size *= this.shrink
    this.alpha -= this.fade
  }

}
