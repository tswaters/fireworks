
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
