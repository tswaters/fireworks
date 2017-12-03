(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Fireworks"] = factory();
	else
		root["Fireworks"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function random(min, max) {
    return Math.random() * (max - min) + min;
}
exports.random = random;
exports.TAU = Math.PI * 2;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const graphics_1 = __webpack_require__(2);
const things_1 = __webpack_require__(3);
class Fireworks {
    constructor(container, { rocketSpawnInterval = 150, maxRockets = 3, numParticles = 100, explosionMinHeight = 0.2, explosionMaxHeight = 0.9, explosionChance = 0.08 } = {}) {
        this.rocketSpawnInterval = rocketSpawnInterval;
        this.maxRockets = maxRockets;
        this.cw = container.clientWidth;
        this.ch = container.clientHeight;
        this.graphics = new graphics_1.default(container);
        this.things = new things_1.default({
            maxRockets: this.maxRockets,
            numParticles,
            explosionMinHeight,
            explosionMaxHeight,
            explosionChance,
            cw: this.cw,
            ch: this.ch
        });
        container.appendChild(this.graphics.canvas);
        console.log(this.ch * (1 - explosionMaxHeight));
    }
    start() {
        if (this.maxRockets > 0) {
            this.interval = setInterval(() => this.things.spawnRockets(), this.rocketSpawnInterval);
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
        return () => this.stop();
    }
    stop() {
        window.clearInterval(this.interval);
        this.interval = null;
    }
    fire() {
        this.things.spawnRocket();
        if (!this.rafInterval) {
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
    }
    update() {
        this.graphics.clear();
        let x = null;
        for (const particle of this.things) {
            this.graphics.drawParticle(particle);
            particle.update();
            if (this.things.shouldRemove(particle)) {
                this.things.delete(particle);
            }
            else if (this.things.shouldExplode(particle)) {
                this.things.explode(particle);
            }
        }
        if (this.interval || this.things.size > 0) {
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
        else {
            this.graphics.clear(true);
            this.rafInterval = null;
        }
    }
}
exports.default = Fireworks;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Graphics {
    constructor(container) {
        this.cw = container.clientWidth;
        this.ch = container.clientHeight;
        const canvas = document.createElement('canvas');
        canvas.width = this.cw;
        canvas.width = this.ch;
        this._canvas = document.createElement('canvas');
        this.ctx = this._canvas.getContext('2d');
        this.canvas.width = this.cw;
        this.canvas.height = this.ch;
    }
    get canvas() {
        return this._canvas;
    }
    clear(force = false) {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = `rgba(0, 0, 0 ${force ? '' : ', 0.5'})`;
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.globalCompositeOperation = 'lighter';
    }
    drawParticle(particle) {
        const lastPosition = particle.positions[particle.positions.length - 1];
        this.ctx.beginPath();
        this.ctx.moveTo(lastPosition.x, lastPosition.y);
        this.ctx.lineTo(particle.position.x, particle.position.y);
        this.ctx.lineWidth = particle.size;
        this.ctx.strokeStyle = `hsla(${particle.hue}, 100%, ${particle.brightness}%, ${particle.alpha})`;
        this.ctx.stroke();
    }
}
exports.default = Graphics;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const particle_1 = __webpack_require__(4);
const util_1 = __webpack_require__(0);
class Things extends Set {
    constructor({ maxRockets, numParticles, explosionMinHeight, explosionMaxHeight, explosionChance, cw, ch }) {
        super();
        this.maxRockets = maxRockets;
        this.numParticles = numParticles;
        this.explosionMaxHeight = explosionMaxHeight,
            this.explosionMinHeight = explosionMinHeight,
            this.explosionChance = explosionChance;
        this.cw = cw;
        this.ch = ch;
    }
    shouldRemove(particle) {
        if (particle.alpha <= 0.1 || particle.size <= 1) {
            return true;
        }
        if (particle.position.x > this.cw || particle.position.x < 0) {
            return true;
        }
        if (particle.position.y > this.ch || particle.position.y < 0) {
            return true;
        }
        return false;
    }
    shouldExplode(particle) {
        if (!particle.isRocket) {
            return false;
        }
        if (particle.position.y <= this.ch * (1 - this.explosionMaxHeight)) {
            return true;
        }
        if (particle.position.y >= this.ch * (1 - this.explosionMinHeight)) {
            return false;
        }
        return util_1.random(0, 1) <= this.explosionChance;
    }
    explode(particle) {
        for (let i = 0; i < this.numParticles; i += 1) {
            this.add(new particle_1.default({
                position: {
                    x: particle.position.x,
                    y: particle.position.y
                },
                hue: particle.hue,
                brightness: particle.brightness
            }));
        }
        this.delete(particle);
    }
    spawnRocket() {
        this.add(new particle_1.default({
            isRocket: true,
            position: {
                x: util_1.random(0, this.cw),
                y: this.ch
            }
        }));
    }
    spawnRockets() {
        const rockets = this.rockets;
        if (rockets < this.maxRockets) {
            this.spawnRocket();
        }
    }
    get rockets() {
        return [...this].filter(x => x.isRocket).length;
    }
}
exports.default = Things;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = __webpack_require__(0);
class Particle {
    constructor({ isRocket = false, hue = util_1.random(1, 360), brightness = util_1.random(50, 60), position }) {
        this.isRocket = isRocket;
        this.position = position;
        this.positions = [
            this.position,
            this.position,
            this.position
        ];
        if (this.isRocket) {
            this.velocity = {
                x: util_1.random(-3, 3),
                y: util_1.random(-7, -3)
            };
            this.shrink = 0.999;
            this.resistance = 1;
        }
        else {
            const angle = util_1.random(0, util_1.TAU);
            const speed = Math.cos(util_1.random(0, util_1.TAU)) * 15;
            this.velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
            };
            this.shrink = util_1.random(0, 0.05) + 0.93;
            this.resistance = 0.92;
        }
        this.gravity = 0.01;
        this.size = 3;
        this.alpha = 1;
        this.fade = 0;
        this.hue = hue;
        this.brightness = brightness;
    }
    update() {
        this.positions.pop();
        this.positions.unshift({ x: this.position.x, y: this.position.y });
        this.velocity.x *= this.resistance;
        this.velocity.y *= this.resistance;
        this.velocity.y += this.gravity;
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        this.size *= this.shrink;
        this.alpha -= this.fade;
    }
}
exports.default = Particle;


/***/ })
/******/ ])["default"];
});