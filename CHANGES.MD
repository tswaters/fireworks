
## 2.3.2

Bump various devDepedencies

## 2.3.1

Fix busted build with evergreen browsers (oops!).

## 2.3.0

Update build to use rollup, there are now 3 supported bunldes:

- fireworks.node.js - cjs module
- fireworks.mjs - es6 module
- fireworks.js - browser umd bundle
- fireworks.min.js - browser umd bundle (minified)

The browser bundle now has a target of `es3` so it should support older browsers.

## 2.2.4

* OOF, forgot to run build on the last 2 releases.

## 2.2.3

* fix the typings file (for reals this time)

## 2.2.3

* fix the typings file (oops!)

## 2.2.1

* tons of internal refactors
* adding typings file
* added new method, `destroy` which removes the canvas and timers.

## 2.2.0

* adding a kill method that forcibly kills the fireworks
* updating live demo to use all available features
* upgrade devDependencies

## 2.1.0

this should technically be breaking but I get the sense I don't have many consumers so I can get away with it :)

* renamed option "explosionHeight" to "explosionMinHeight"
* new option, "explosionMaxHeight" - max height a rocket will reach before exploding.
* various internal refactors
* new `fire` method to fire a single rocket.
* providing 0 for numRockets will not start rocket respawn timer (you must call `fire`)

## 2.0.1

* update build to use webpack.
* update api - now exports class with `start` and `stop` methods.
* lots of internal refactors.

## 1.0.3

* adding mechanism to stop fireworks

## 1.0.2

* initial release
