# Fireworks Canvas Example

[Take a look at the live example!](https://tswaters.github.io/fireworks/)

## install

```sh
bower install --save fireworks-canvas
npm install --save fireworks-canvas
```

## usage

```js

import * as Fireworks from 'fireworks-canvas' // mjs

const Fireworks = require('fireworks-canvas') // cjs

requirejs(['Fireworks'], (Fireworks) =>  {}) // amd

const Fireworks = window.Fireworks // browser global

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
fireworks.kill() // forcibly stop fireworks
fireworks.fire() // fire a single rocket.
```

## usage with typscript

```ts
import * as FireworksCanvas from 'fireworks-canvas'
const fireworks = new FireworksCanvas(container)
```

OR

```ts
import FireworksCanvas = require('fireworks-canvas')
const fireworks = new FireworksCanvas(container)
```

## support

Should work in most browsers.

Note that you'll need a polyfill for `Set` to support iexplore 11.

## development

```sh
npm i
npm run build:dev
# edit ./gh-pages/index.html, change reference to '../dist/fireworks.umd.js`
# open ./gh-pages/index.html in your favourite browser
```

