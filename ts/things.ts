import Particle from './particle'
import { random } from './util'

type ThingOptions = {
  cw: number
  ch: number
  maxRockets: number
  numParticles: number,
  rocketInitialPoint: number
}

export default class Things {
  private _set: Set<Particle>
  private maxRockets: number
  private numParticles: number
  public cw: number
  public ch: number
  public rockets: number
  public rocketInitialPoint: number

  constructor({ maxRockets, numParticles, cw, ch, rocketInitialPoint }: ThingOptions) {
    this._set = new Set()
    this.rockets = 0
    this.maxRockets = maxRockets
    this.numParticles = numParticles
    this.cw = cw
    this.ch = ch
    this.rocketInitialPoint = rocketInitialPoint
  }

  size(): number {
    return this._set.size
  }

  entries(): Set<Particle> {
    return this._set
  }

  clear(): void {
    this._set.clear()
  }

  delete(thing: Particle): void {
    this._set.delete(thing)
    if (thing.isRocket) this.rockets--
  }

  add(thing: Particle): void {
    this._set.add(thing)
  }

  /**
   * Turn a particle into many particles exploding in different directions.
   * Rocket is deleted afterwards,
   * @param {Particle} particle the rocket to start from.
   */
  explode(particle: Particle): void {
    for (let i = 0; i < this.numParticles; i += 1) {
      this.add(particle.clone())
    }
    this.delete(particle)
  }

  /**
   * Spawns a single rocket
   */
  spawnRocket(): void {
    this.rockets++
    this.add(
      new Particle({
        isRocket: true,
        position: {
          x: this.rocketInitialPoint ? this.rocketInitialPoint : random(0, this.cw),
          y: this.ch
        }
      })
    )
  }

  /**
   * if we have less than required number of rockets, spawn one.
   * this mutates the Set, adding more rockets.
   */
  spawnRockets(): void {
    if (this.rockets < this.maxRockets) {
      this.spawnRocket()
    }
  }
}
