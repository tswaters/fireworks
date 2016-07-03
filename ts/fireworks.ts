
namespace Fireworks {

  export const TAU = Math.PI * 2
  const MAX_PARTICLES = 150
  const MAX_ROCKETS = 1

  export let canvas: HTMLCanvasElement
  export let ctx: CanvasRenderingContext2D
  export let viewPortWidth: number
  export let viewPortHeight: number

  export let rockets: Rocket[]
  export let particles: Particle[]

  export class Fireworks {

    constructor (container: HTMLElement) {

      rockets = []
      particles = []
      viewPortWidth = container.clientWidth
      viewPortHeight = container.clientHeight

      canvas = document.createElement('canvas')
      ctx = canvas.getContext('2d')
      canvas.width = viewPortWidth
      canvas.height = viewPortHeight
      container.appendChild(canvas)

      window.requestAnimationFrame(() => this.spawnRocket())
      window.requestAnimationFrame(() => this.update())
    }

    update () {

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
      ctx.fillRect(0, 0, viewPortWidth, viewPortHeight)

      const newRockets: Rocket[] = []

      for (let x = rockets.length - 1; x >= 0; x -= 1) {
        const rocket = rockets[x]
        rocket.update()

        if (rocket.exists()) {
          rocket.render()
          if (rocket.position.y <= viewPortHeight / 2 && Math.random() <= 0.8) {
            rocket.explode()
          } else {
            newRockets.push(rocket)
          }
        }
      }

      rockets = newRockets

      const newParticles: Particle[] = []

      for (let x = particles.length - 1; x >= 0; x -= 1) {
        const particle = particles[x]
        particle.update()

        if (particle.exists()) {
          particle.render()
          newParticles.push(particle)
        }
      }

      while (newParticles.length > MAX_PARTICLES) {
        newParticles.shift()
      }

      particles = newParticles

      window.requestAnimationFrame(() => this.update())
    }

    spawnRocket () {
      if (rockets.length < MAX_ROCKETS) {
        rockets.push(new Rocket())
      }
      window.requestAnimationFrame(() => this.spawnRocket())
    }

  }

}
