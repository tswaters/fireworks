
import Particle from './particle'
import {random} from './util'

type ThingOptions = {
  cw: number,
  ch: number,
  maxRockets: number,
  numParticles: number
}

export default class Things extends Set<Particle> {

  private maxRockets: number
  private numParticles: number
  private cw: number
  private ch: number
  private rockets: number

  constructor ({
    maxRockets,
    numParticles,
    cw,
    ch
  }: ThingOptions) {
    super()
    this.rockets = 0
    this.maxRockets = maxRockets
    this.numParticles = numParticles
    this.cw = cw
    this.ch = ch
  }

  /**
   * Turn a particle into many particles exploding in different directions.
   * Rocket is deleted afterwards,
   * @param {Particle} particle the rocket to start from.
   */
  explode (particle: Particle): void {
    this.rockets--
    for (let i = 0; i < this.numParticles; i += 1) {
      this.add(particle.clone())
    }
    this.delete(particle)
  }

  /**
   * Spawns a single rocket
   */
  spawnRocket (): void {
    this.rockets++
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
    if (this.rockets < this.maxRockets) {
      this.spawnRocket()
    }
  }

}
