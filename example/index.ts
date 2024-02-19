import { Fireworks } from '../ts/fireworks'

const container = document.getElementById('container')
const spawn = document.getElementById('spawn')
const kill = document.getElementById('kill')
const stopButton = document.getElementById('stop')
const start = document.getElementById('start')
const width = container.clientWidth
const fireworks = new Fireworks(container, {
  maxRockets: 15, // max # of rockets to spawn
  rocketSpawnInterval: 50, // millisends to check if new rockets should spawn
  numParticles: 200, // number of particles to spawn when rocket explodes (+0-10)
  explosionMinHeight: 0.2, // percentage. min height at which rockets can explode
  explosionMaxHeight: 0.9, // percentage. max height before a particle is exploded
  explosionChance: 0.02, // chance in each tick the rocket will explode

  // array of points, defaults to {}
  // when x is null or not defined, uses random position between 0 -> container width
  // when y is null or not defined, uses container height
  cannons: [{ x: width * 0.2 }, { x: width * 0.8 }],

  // defines a single cannon with null for height and provided value for X.
  // will be apended to provided cannons
  rocketInitialPoint: width * 0.5,
})

startFireworks()

document.addEventListener('keydown', (e) => e.which === 27 && stopFireworks())
spawn.addEventListener('click', () => fireworks.fire())
kill.addEventListener('click', () => stopFireworks(true))
stopButton.addEventListener('click', () => stopFireworks(false))
start.addEventListener('click', () => startFireworks())
window.addEventListener('resize', () => fireworks.resetSize())

function stopFireworks(force: boolean = false) {
  kill.style.display = 'none'
  stopButton.style.display = 'none'
  start.style.display = ''
  if (force) fireworks.kill()
  else fireworks.stop()
}

function startFireworks() {
  kill.style.display = ''
  stopButton.style.display = ''
  start.style.display = 'none'
  fireworks.start()
}
