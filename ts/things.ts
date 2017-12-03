
import Particle from './particle'
import {random} from './util'

type ThingOptions = {
  cw: number,
  ch: number,
  maxRockets: number,
  numParticles: number,
  explosionMinHeight: number,
  explosionMaxHeight: number,
  explosionChance: number
}

export default class Things extends Set<Particle> {

  maxRockets: number
  numParticles: number
  explosionMinHeight: number
  explosionMaxHeight: number
  explosionChance: number
  cw: number
  ch: number

  constructor ({
    maxRockets,
    numParticles,
    explosionMinHeight,
    explosionMaxHeight,
    explosionChance,
    cw,
    ch
  }: ThingOptions) {
    super()
    this.maxRockets = maxRockets
    this.numParticles = numParticles
    this.explosionMaxHeight = explosionMaxHeight,
    this.explosionMinHeight = explosionMinHeight,
    this.explosionChance = explosionChance
    this.cw = cw
    this.ch = ch
  }

  /**
   * Checks if a particle should be removed.
   * @param particle particle to check
   * @returns {boolean} whether or not the particle should be removed.
   */
  shouldRemove (particle: Particle): boolean {
    if (particle.alpha <= 0.1 || particle.size <= 1) {
      return true
    }

    if (particle.position.x > this.cw || particle.position.x < 0) {
      return true
    }

    if (particle.position.y > this.ch || particle.position.y < 0) {
      return true
    }

    return false
  }

  /**
   * Determines if a rocket should explode - based on explosionHeight & explosionChance
   * @param {Particle} particle rocket to check
   * @returns {boolean} whether or not the rocket shoudl explode
   */
  shouldExplode (particle: Particle): boolean {

    if (!particle.isRocket) { return false }

    // make sure things explode once they hit explosionMaxHeight (90% default) of height
    if (particle.position.y <= this.ch * (1 - this.explosionMaxHeight)) {
      return true
    }

    // make sure particle has reached explosionMinHeight (20% default) before explosion chance.
    if (particle.position.y >= this.ch * (1 - this.explosionMinHeight)) {
      return false
    }

    return random(0, 1) <= this.explosionChance
  }

  /**
   * Turn a particle into many articles exploding in different directions.
   * Rocket is deleted afterwards,
   * @param {Particle} particle the rocket to start from.
   */
  explode (particle: Particle): void {
    for (let i = 0; i < this.numParticles; i += 1) {
      this.add(new Particle({
        position: {
          x: particle.position.x,
          y: particle.position.y
        },
        hue: particle.hue,
        brightness: particle.brightness
      }))
    }
    this.delete(particle)
  }

  /**
   * Spawns a single rocket
   */
  spawnRocket (): void {
    this.add(new Particle({
      isRocket: true,
      position: {
        x: random(0, this.cw),
        y: this.ch
      }
    }))
  }

  /**
   * if we have less than required number of rockets, spawn one.
   * this mutates the Set, adding more rockets.
   */
  spawnRockets (): void {
    const rockets = this.rockets
    if (rockets < this.maxRockets) {
      this.spawnRocket()
    }
  }

  /**
   * Returns number of rockets in the set
   * @returns {number} number of rockets
   */
  get rockets (): number {
    return [...this].filter(x => x.isRocket).length
  }

}
