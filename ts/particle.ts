
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

    this.velocity = {x: null, y: null}

    if (this.isRocket) {
      this.velocity = {
        x: random(0, 6) - 3,
        y: random(-3, 0) - 4
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
   * Returns whether or not a rocket will explode.
   * @param {number} ch available height
   * @param {number} explosionHeight min height at which particles explode
   * @param {number} explosionChance % change a rocket will explode
   * @returns {boolean} whether or not the rocket will explode
   */
  shouldExplode (ch: number, explosionHeight: number, explosionChance: number): boolean {
    if (!this.isRocket) { return false }

    const inRange = this.position.y <= ch * (1 - explosionHeight)
    if (!inRange) { return false }

    const shouldExplode = random(0, 1) <= explosionChance
    return shouldExplode
  }

  /**
   * Turns a particle into many different particles exploding in different directions
   * @param {number} count number of particles to spawn
   * @returns {Set<Particle>} set of particles that were created.
   */
  explode (count: number): Set<Particle> {
    const newParticles = new Set()
    for (let i = 0; i < count; i += 1) {
      newParticles.add(new Particle({
        position: {
          x: this.position.x,
          y: this.position.y
        },
        hue: this.hue,
        brightness: this.brightness
      }))
    }
    return newParticles
  }

  /**
   * Update the position of the particle.
   * For rockets, has a potential to explode.
   */
  update () {
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
