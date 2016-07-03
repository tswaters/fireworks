
namespace Fireworks {

  export const TAU = Math.PI * 2
  const MAX_ROCKETS = 5

  export let canvas: HTMLCanvasElement
  export let ctx: CanvasRenderingContext2D
  export let cw: number
  export let ch: number

  export let rockets: Rocket[]
  export let particles: Particle[]

  export function random (min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  export class Fireworks {

    constructor (container: HTMLElement) {

      rockets = []
      particles = []
      cw = container.clientWidth
      ch = container.clientHeight

      canvas = document.createElement('canvas')
      ctx = canvas.getContext('2d')
      canvas.width = cw
      canvas.height = ch
      container.appendChild(canvas)

      window.requestAnimationFrame(() => this.update())
    }

    update () {

      if (rockets.length < MAX_ROCKETS) {
        rockets.push(new Rocket())
      }

      ctx.globalCompositeOperation = 'destination-out'
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, cw, ch)
      ctx.globalCompositeOperation = 'lighter'

      let x: number = null

      x = rockets.length
      while (x--) {
        rockets[x].render()
        rockets[x].update(x)
      }

      x = particles.length
      while (x--) {
        particles[x].render()
        particles[x].update(x)
      }

      window.requestAnimationFrame(() => this.update())
    }
  }

}
