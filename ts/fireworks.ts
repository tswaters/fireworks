
namespace Fireworks {

  export const TAU = Math.PI * 2

  export let maxRockets: number
  export let numParticles: number
  export let explosionHeight: number
  export let explosionChance: number
  export let rocketSpawnInterval: number
  export let initialRocketVelocity: Point

  export let canvas: HTMLCanvasElement
  export let ctx: CanvasRenderingContext2D
  export let cw: number
  export let ch: number

  export let rockets: Rocket[]
  export let particles: Particle[]
  export let interval: number

  export function random (min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  export function start (container: HTMLElement, options: Options) {

    if (!options) { options = {} }
    rocketSpawnInterval = options.rocketSpawnInterval || 150
    maxRockets = options.maxRockets || 3
    numParticles = options.numParticles || 100
    explosionHeight = options.explosionHeight || 0.2
    explosionChance = options.explosionChance || 0.08

    rockets = []
    particles = []
    cw = container.clientWidth
    ch = container.clientHeight

    canvas = document.createElement('canvas')
    ctx = canvas.getContext('2d')
    canvas.width = cw
    canvas.height = ch
    container.appendChild(canvas)

    window.requestAnimationFrame(update)
    interval = setInterval(() => {
      if (rockets.length < maxRockets) {
        rockets.push(new Rocket())
      }
    }, rocketSpawnInterval)

    return () => {
      clearInterval(interval)
      interval = null
    }
  }

  function update () {
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

    if (interval) {
      window.requestAnimationFrame(update)
    }
  }

}
