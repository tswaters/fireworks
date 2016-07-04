
namespace Fireworks {

  export class Rocket extends Particle {

    constructor () {
      super({x: random(0, cw), y: ch})
      this.velocity.y = random(-3, 0) - 4
      this.velocity.x = random(0, 6) - 3
      this.size = 3
      this.shrink = 0.999
      this.gravity = 0.01
      this.fade = 0
    }

    update (index: number) {
      super.update(index)

      if (this.position.y <= ch * (1 - explosionHeight) && random(0, 1) <= explosionChance) {
        this.explode()
        rockets.splice(index, 1)
      }

    }

    explode () {
      const count = random(0, 10) + numParticles

      for (let i = 0; i < count; i += 1) {

        const particle = new Particle(this.position)
        const angle = random(0, TAU)

        const speed = Math.cos(random(0, TAU)) * 15

        particle.velocity.x = Math.cos(angle) * speed
        particle.velocity.y = Math.sin(angle) * speed
        particle.size = 3
        particle.gravity = 0.2
        particle.resistance = 0.92
        particle.shrink = random(0, 0.05) + 0.93
        particle.hue = this.hue
        particle.brightness = this.brightness
        particles.push(particle)

      }
    }
  }

}
