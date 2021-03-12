import { random, TAU } from './util'

export type Point = {
  x: number
  y: number
}

type ParticleOptions = {
  position: Point
  isRocket?: boolean
  hue?: number
  brightness?: number
}

export default class Particle {
  public isRocket: boolean
  private positions: Point[]
  private position: Point
  private velocity: Point
  private resistance: number
  private gravity: number
  private fade: number
  private shrink: number
  private size: number
  private alpha: number
  private hue: number
  private brightness: number

  constructor({
    isRocket = false,
    hue = random(1, 360),
    brightness = random(50, 60),
    position,
  }: ParticleOptions) {
    this.isRocket = isRocket
    this.position = position
    this.positions = [this.position, this.position, this.position]

    if (this.isRocket) {
      this.velocity = {
        x: random(-3, 3),
        y: random(-7, -3),
      }
      this.shrink = 0.999
      this.resistance = 1
    } else {
      const angle = random(0, TAU)
      const speed = Math.cos(random(0, TAU)) * 15
      this.velocity = {
        x: Math.cos(angle) * speed,
        y: Math.sin(angle) * speed,
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
   * Clones a particle, same hue/brightness/position
   * @returns {Particle} new particle
   */
  clone(): Particle {
    return new Particle({
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      hue: this.hue,
      brightness: this.brightness,
    })
  }

  /**
   * Checks if a particle should be removed.
   * @param particle particle to check
   * @returns {boolean} whether or not the particle should be removed.
   */
  shouldRemove(cw: number, ch: number): boolean {
    if (this.alpha <= 0.1 || this.size <= 1) {
      return true
    }

    if (this.position.x > cw || this.position.x < 0) {
      return true
    }

    if (this.position.y > ch || this.position.y < 0) {
      return true
    }

    return false
  }

  /**
   * Determines if a rocket should explode - based on explosionHeight & explosionChance
   * @param {Particle} particle rocket to check
   * @returns {boolean} whether or not the rocket shoudl explode
   */
  shouldExplode(maxHeight: number, minHeight: number, chance: number): boolean {
    if (!this.isRocket) {
      return false
    }

    // make sure things explode once they hit explosionMaxHeight (90% default) of height
    if (this.position.y <= maxHeight) {
      return true
    }

    // make sure particle has reached explosionMinHeight (20% default) before explosion chance.
    if (this.position.y >= minHeight) {
      return false
    }

    return random(0, 1) <= chance
  }

  /**
   * Update the position of the particle.
   * For rockets, has a potential to explode.
   */
  update(): void {
    this.positions.pop()
    this.positions.unshift({ x: this.position.x, y: this.position.y })
    this.velocity.x *= this.resistance
    this.velocity.y *= this.resistance
    this.velocity.y += this.gravity
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
    this.size *= this.shrink
    this.alpha -= this.fade
  }

  /**
   * Renders a particle. Returns whether or not it should exist.
   * @param {CanvasRenderingContext2D} ctx canvas context
   */
  draw(ctx: CanvasRenderingContext2D): void {
    const lastPosition = this.positions[this.positions.length - 1]
    ctx.beginPath()
    ctx.moveTo(lastPosition.x, lastPosition.y)
    ctx.lineTo(this.position.x, this.position.y)
    ctx.lineWidth = this.size
    ctx.lineCap = 'round'
    ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`
    ctx.stroke()
  }
}
