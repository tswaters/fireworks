(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Fireworks"] = factory();
	else
		root["Fireworks"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
const things_1 = __webpack_require__(2);
class Fireworks {
    constructor(container, { rocketSpawnInterval = 150, maxRockets = 3, numParticles = 100, explosionMinHeight = 0.2, explosionMaxHeight = 0.9, explosionChance = 0.08 } = {}) {
        this.rocketSpawnInterval = rocketSpawnInterval;
        this.maxRockets = maxRockets;
        this.cw = container.clientWidth;
        this.ch = container.clientHeight;
        this.max_h = this.ch * (1 - explosionMaxHeight);
        this.min_h = this.ch * (1 - explosionMinHeight);
        this.chance = explosionChance;
        this.canvas = document.createElement('canvas');
        this.canvas.width = this.cw;
        this.canvas.height = this.ch;
        this.ctx = this.canvas.getContext('2d');
        container.appendChild(this.canvas);
        this.things = new things_1.default({
            maxRockets: this.maxRockets,
            numParticles,
            cw: this.cw,
            ch: this.ch
        });
    }
    destroy() {
        this.canvas.parentElement.removeChild(this.canvas);
        window.clearInterval(this.interval);
        window.cancelAnimationFrame(this.rafInterval);
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
    kill() {
        this.things.clear();
        this.stop();
        window.cancelAnimationFrame(this.rafInterval);
        this.rafInterval = null;
        this._clear(true);
    }
    fire() {
        this.things.spawnRocket();
        if (!this.rafInterval) {
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
    }
    _clear(force = false) {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = `rgba(0, 0, 0 ${force ? '' : ', 0.5'})`;
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.globalCompositeOperation = 'lighter';
    }
    update() {
        this._clear();
        for (const particle of this.things) {
            particle.draw(this.ctx);
            particle.update();
            if (particle.shouldRemove(this.cw, this.ch)) {
                this.things.delete(particle);
            }
            else if (particle.shouldExplode(this.max_h, this.min_h, this.chance)) {
                this.things.explode(particle);
            }
        }
        if (this.interval || this.things.size > 0) {
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
        else {
            this._clear(true);
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
const particle_1 = __webpack_require__(3);
const util_1 = __webpack_require__(0);
class Things extends Set {
    constructor({ maxRockets, numParticles, cw, ch }) {
        super();
        this.rockets = 0;
        this.maxRockets = maxRockets;
        this.numParticles = numParticles;
        this.cw = cw;
        this.ch = ch;
    }
    explode(particle) {
        this.rockets--;
        for (let i = 0; i < this.numParticles; i += 1) {
            this.add(particle.clone());
        }
        this.delete(particle);
    }
    spawnRocket() {
        this.rockets++;
        this.add(new particle_1.default({
            isRocket: true,
            position: {
                x: util_1.random(0, this.cw),
                y: this.ch
            }
        }));
    }
    spawnRockets() {
        if (this.rockets < this.maxRockets) {
            this.spawnRocket();
        }
    }
}
exports.default = Things;


/***/ }),
/* 3 */
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
    clone() {
        return new Particle({
            position: {
                x: this.position.x,
                y: this.position.y
            },
            hue: this.hue,
            brightness: this.brightness
        });
    }
    shouldRemove(cw, ch) {
        if (this.alpha <= 0.1 || this.size <= 1) {
            return true;
        }
        if (this.position.x > cw || this.position.x < 0) {
            return true;
        }
        if (this.position.y > ch || this.position.y < 0) {
            return true;
        }
        return false;
    }
    shouldExplode(maxHeight, minHeight, chance) {
        if (!this.isRocket) {
            return false;
        }
        if (this.position.y <= maxHeight) {
            return true;
        }
        if (this.position.y >= minHeight) {
            return false;
        }
        return util_1.random(0, 1) <= chance;
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
    draw(ctx) {
        const lastPosition = this.positions[this.positions.length - 1];
        ctx.beginPath();
        ctx.moveTo(lastPosition.x, lastPosition.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.lineWidth = this.size;
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.stroke();
    }
}
exports.default = Particle;


/***/ })
/******/ ])["default"];
});