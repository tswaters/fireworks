
namespace Fireworks {

  export class Rocket extends Particle {

    explosionColor: number

    constructor () {
      super({x: Math.random() * viewPortWidth, y: viewPortWidth})
      this.explosionColor = Math.floor(Math.random() * 360 / 10) * 10
      this.velocity.y = Math.random() * -3 - 4
      this.velocity.x = Math.random() * 6 - 3
      this.size = 8
      this.shrink = 0.999
      this.gravity = 0.01
      this.fade = 0
    }

    explode () {
      const count = Math.random() * 10 + 50

      for (let i = 0; i < count; i += 1) {

        const particle = new Particle(this.position)
        const angle = Math.random() * TAU

        const speed = Math.cos(Math.random() * TAU) * 15

        particle.velocity.x = Math.cos(angle) * speed
        particle.velocity.y = Math.sin(angle) * speed
        particle.size = 10
        particle.gravity = 0.2
        particle.resistance = 0.92
        particle.shrink = Math.random() * 0.05 + 0.93
        particle.color = this.explosionColor
        particles.push(particle)

      }
    }

    arc () {
      const x = this.position.x
      const y = this.position.y
      const radius = Math.random() * this.size / 2 + this.size / 2
      ctx.arc(x, y, radius, 0, TAU, true)
    }

    get gradient(): CanvasGradient {
      const x = this.position.x
      const y = this.position.y
      const r = this.size / 2
      const gradient = ctx.createRadialGradient(x, y, 0.1, x, y, r);
      gradient.addColorStop(0.1, `rgba(255, 255, 255 ,${this.alpha})`)
      gradient.addColorStop(1, `rgba(0, 0, 0, ${this.alpha})`)
      return gradient
    }

  }

}
