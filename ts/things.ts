import Particle, { Point } from './particle'
import { random } from './util'

type ThingOptions = {
  cw: number
  ch: number
  maxRockets: number
  numParticles: number
  rocketInitialPoint: number
  cannons: Point[]
}

export default class Things {
  private _set: Set<Particle>
  private maxRockets: number
  private numParticles: number
  public cw: number
  public ch: number
  public rockets: number
  public rocketInitialPoint: number
  private cannons: Point[]

  constructor({
    maxRockets,
    numParticles,
    cw,
    ch,
    rocketInitialPoint,
    cannons,
  }: ThingOptions) {
    this._set = new Set()
    this.rockets = 0
    this.maxRockets = maxRockets
    this.numParticles = numParticles
    this.cw = cw
    this.ch = ch
    this.rocketInitialPoint = rocketInitialPoint

    this.cannons = cannons

    if (this.rocketInitialPoint) {
      this.cannons.push({ x: this.rocketInitialPoint, y: this.ch })
    }
  }

  size(): number {
    return this._set.size
  }

  entries(): Set<Particle> {
    return this._set
  }

  clear(): void {
    this._set.clear()
    this.rockets = 0
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
    const cannonIndex = Math.floor(random(0, this.cannons.length))
    const cannon = this.cannons[cannonIndex] || ({} as Point)
    this.add(
      new Particle({
        isRocket: true,
        position: {
          ...cannon,
          ...(cannon.x == null && { x: random(0, this.cw) }),
          ...(cannon.y == null && { y: this.ch }),
        },
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
