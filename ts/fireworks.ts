
import Particle from './particle'
import Graphics from './graphics'
import Things from './things'

import {random} from './util'
import {Point} from './types'

type Options = {
  maxRockets?: number
  numParticles?: number
  explosionHeight?: number
  explosionChance?: number
  rocketSpawnInterval?: number
}

export default class Fireworks {

  maxRockets: number
  numParticles: number
  explosionHeight: number
  explosionChance: number
  rocketSpawnInterval: number
  graphics: Graphics
  cw: number
  ch: number
  things: Things
  interval: number

  constructor (container: HTMLElement, {
    rocketSpawnInterval = 150,
    maxRockets = 3,
    numParticles = 100,
    explosionHeight = 0.2,
    explosionChance = 0.08
  }: Options = {}) {
    this.rocketSpawnInterval = rocketSpawnInterval
    this.maxRockets = maxRockets
    this.numParticles = numParticles
    this.explosionHeight = explosionHeight
    this.explosionChance = explosionChance
    this.cw = container.clientWidth
    this.ch = container.clientHeight
    this.graphics = new Graphics(container)
    this.things = new Things({maxRockets: this.maxRockets, cw: this.cw, ch: this.ch})
    container.appendChild(this.graphics.canvas)
  }

  start (): () => void {
    window.requestAnimationFrame(() => this.update())
    this.interval = setInterval(() => this.things.spawnRockets(), this.rocketSpawnInterval)
    return () => this.stop()
  }

  stop (): void {
    window.clearInterval(this.interval)
    this.interval = null
  }

  update () {
    this.graphics.clear()

    let x: number = null

    for (const particle of this.things) {

      if (!this.graphics.drawParticle(particle)) {
        this.things.delete(particle)
        continue
      }

      particle.update()

      if (particle.shouldExplode(this.ch, this.explosionHeight, this.explosionChance)) {
        particle.explode(this.numParticles).forEach(this.things.add, this.things)
        this.things.delete(particle)
      }
    }

    if (this.interval || this.things.size > 0) {
      window.requestAnimationFrame(() => this.update())
    } else {
      this.graphics.clear(true)
    }
  }

}
