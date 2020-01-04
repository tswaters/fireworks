
function example(Fireworks, container) {
  const fireworks = new Fireworks(container, {
    maxRockets: 3,            // max # of rockets to spawn
    rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
    numParticles: 100,        // number of particles to spawn when rocket explodes (+0-10)
    explosionMinHeight: 0.2,  // percentage. min height at which rockets can explode
    explosionMaxHeight: 0.9,  // percentage. max height before a particle is exploded
    explosionChance: 0.08     // chance in each tick the rocket will explode
  })

  start()

  document.addEventListener('keydown', e => e.which === 27 && stop())
  document.getElementById('spawn').addEventListener('click', () => fireworks.fire())
  document.getElementById('kill').addEventListener('click', () => stop(true))
  document.getElementById('stop').addEventListener('click', () => stop(false))
  document.getElementById('start').addEventListener('click', () => start())

  function stop (force) {
    document.getElementById('kill').style.display = 'none'
    document.getElementById('stop').style.display = 'none'
    document.getElementById('start').style.display = ''
    if (force) fireworks.kill()
    else fireworks.stop()
  }

  function start () {
    document.getElementById('kill').style.display = ''
    document.getElementById('stop').style.display = ''
    document.getElementById('start').style.display = 'none'
    fireworks.start()
  }
}
