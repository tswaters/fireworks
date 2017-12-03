
import Particle from './particle'
import {random} from './util'

type ThingOptions = {
  cw: number,
  ch: number,
  maxRockets: number
}

export default class Things extends Set<Particle> {

  maxRockets: number
  cw: number
  ch: number

  constructor ({
    maxRockets,
    cw,
    ch
  }: ThingOptions) {
    super()
    this.maxRockets = maxRockets
    this.cw = cw
    this.ch = ch
  }

  /**
   * if we have less than required number of rockets, spawn one.
   * this mutates the Set, adding more rockets.
   */
  spawnRockets () {
    const rockets = this.rockets
    if (rockets < this.maxRockets) {
      this.add(new Particle({
        isRocket: true,
        position: {
          x: random(0, this.cw),
          y: this.ch
        }
      }))
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
