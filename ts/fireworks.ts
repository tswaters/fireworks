
import Particle from './particle'
import Graphics from './graphics'
import Things from './things'

import {random} from './util'
import {Point} from './types'

type Options = {
  maxRockets?: number
  numParticles?: number
  explosionMinHeight?: number
  explosionMaxHeight?: number
  explosionChance?: number
  rocketSpawnInterval?: number
}

export default class Fireworks {

  maxRockets: number
  rocketSpawnInterval: number
  graphics: Graphics
  cw: number
  ch: number
  things: Things
  interval: number
  rafInterval: number

  constructor (container: HTMLElement, {
    rocketSpawnInterval = 150,
    maxRockets = 3,
    numParticles = 100,
    explosionMinHeight = 0.2,
    explosionMaxHeight = 0.9,
    explosionChance = 0.08
  }: Options = {}) {
    this.rocketSpawnInterval = rocketSpawnInterval
    this.maxRockets = maxRockets
    this.cw = container.clientWidth
    this.ch = container.clientHeight
    this.graphics = new Graphics(container)
    this.things = new Things({
      maxRockets: this.maxRockets,
      numParticles,
      explosionMinHeight,
      explosionMaxHeight,
      explosionChance,
      cw: this.cw,
      ch: this.ch
    })
    container.appendChild(this.graphics.canvas)
  }

  start (): () => void {
    if (this.maxRockets > 0) {
      this.interval = setInterval(() => this.things.spawnRockets(), this.rocketSpawnInterval)
      this.rafInterval = window.requestAnimationFrame(() => this.update())
    }
    return () => this.stop()
  }

  stop (): void {
    window.clearInterval(this.interval)
    this.interval = null
  }

  fire (): void {
    this.things.spawnRocket()
    if (!this.rafInterval) {
      this.rafInterval = window.requestAnimationFrame(() => this.update())
    }
  }

  update (): void {
    this.graphics.clear()

    let x: number = null

    for (const particle of this.things) {
      this.graphics.drawParticle(particle)

      particle.update()

      if (this.things.shouldRemove(particle)) {
        this.things.delete(particle)
      }
      else if (this.things.shouldExplode(particle)) {
        this.things.explode(particle)
      }
    }

    if (this.interval || this.things.size > 0) {
      this.rafInterval = window.requestAnimationFrame(() => this.update())
    } else {
      this.graphics.clear(true)
      this.rafInterval = null
    }
  }

}
