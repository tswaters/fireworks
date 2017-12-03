
import Particle from './particle'

export default class Graphics {

  _canvas: HTMLCanvasElement
  ctx: CanvasRenderingContext2D
  ch: number
  cw: number

  constructor (container: HTMLElement) {
    this.cw = container.clientWidth
    this.ch = container.clientHeight

    const canvas = document.createElement('canvas')
    canvas.width = this.cw
    canvas.width = this.ch

    this._canvas = document.createElement('canvas')
    this.ctx = this._canvas.getContext('2d')
    this.canvas.width = this.cw
    this.canvas.height = this.ch
  }

  /**
   * Returns the current canvas
   * @returns {HTMLCanvasElement} canvas element
   */
  get canvas (): HTMLCanvasElement {
    return this._canvas
  }

  /**
   * Clears out the canvas & prepares for next iteration of drawing
   * @param {boolean} force won't use alpha, blacks canvas out totally
   */
  clear (force: boolean = false): void {
    this.ctx.globalCompositeOperation = 'destination-out'
    this.ctx.fillStyle = `rgba(0, 0, 0 ${force ? '' : ', 0.5'})`
    this.ctx.fillRect(0, 0, this.cw, this.ch)
    this.ctx.globalCompositeOperation = 'lighter'
  }

  /**
   * Renders a particle. Returns whether or not it should exist.
   * @param {Particle} particle particle to render
   */
  drawParticle (particle: Particle): void {
    const lastPosition = particle.positions[particle.positions.length - 1]
    this.ctx.beginPath()
    this.ctx.moveTo(lastPosition.x, lastPosition.y)
    this.ctx.lineTo(particle.position.x, particle.position.y)
    this.ctx.lineWidth = particle.size
    this.ctx.strokeStyle = `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${particle.alpha})`
    this.ctx.stroke()
  }

}
