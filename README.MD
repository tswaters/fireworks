# Fireworks Canvas Example

[Take a look at the live example!](https://tswaters.github.io/fireworks/)

## install

```sh
bower install --save fireworks-canvas
npm install --save fireworks-canvas
```

## usage

```js
// exports a standard umd boiler:
const Fireworks = require('fireworks-canvas') // cjs
define(['fireworks-canvas'], (FireWorks) =>  {}) // amd
const Fireworks = window.Fireforks // browser global

// needs at least a container element, you can provide options
// (options are optional, defaults defined below)
const container = document.getElementById('container')
const options = {
  maxRockets: 3,            // max # of rockets to spawn
  rocketSpawnInterval: 150, // millisends to check if new rockets should spawn
  numParticles: 100,        // number of particles to spawn when rocket explodes (+0-10)
  explosionMinHeight: 0.2,  // percentage. min height at which rockets can explode
  explosionMaxHeight: 0.9,  // percentage. max height before a particle is exploded
  explosionChance: 0.08     // chance in each tick the rocket will explode
}

// instantiate the class and call start
// this returns a disposable - calling it will stop fireworks.
const fireworks = new Fireworks(container, options)
const stop = fireworks.start()
stop() // stop rockets from spawning
fireworks.stop() // also stops fireworks.
```

## support

Requires es6 in the browser

## development

```sh
npm i
npm run build
# open ./index.html in your favourite evergreen browser
```

