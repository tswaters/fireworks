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
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/fireworks.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ts/fireworks.ts":
/*!*************************!*\
  !*** ./ts/fireworks.ts ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst things_1 = __webpack_require__(/*! ./things */ \"./ts/things.ts\");\nclass Fireworks {\n    constructor(container, { rocketSpawnInterval = 150, maxRockets = 3, numParticles = 100, explosionMinHeight = 0.2, explosionMaxHeight = 0.9, explosionChance = 0.08 } = {}) {\n        this.rocketSpawnInterval = rocketSpawnInterval;\n        this.maxRockets = maxRockets;\n        this.cw = container.clientWidth;\n        this.ch = container.clientHeight;\n        this.max_h = this.ch * (1 - explosionMaxHeight);\n        this.min_h = this.ch * (1 - explosionMinHeight);\n        this.chance = explosionChance;\n        this.canvas = document.createElement('canvas');\n        this.canvas.width = this.cw;\n        this.canvas.height = this.ch;\n        this.ctx = this.canvas.getContext('2d');\n        container.appendChild(this.canvas);\n        this.things = new things_1.default({\n            maxRockets: this.maxRockets,\n            numParticles,\n            cw: this.cw,\n            ch: this.ch\n        });\n    }\n    destroy() {\n        this.canvas.parentElement.removeChild(this.canvas);\n        window.clearInterval(this.interval);\n        window.cancelAnimationFrame(this.rafInterval);\n    }\n    start() {\n        if (this.maxRockets > 0) {\n            this.interval = setInterval(() => this.things.spawnRockets(), this.rocketSpawnInterval);\n            this.rafInterval = window.requestAnimationFrame(() => this.update());\n        }\n        return () => this.stop();\n    }\n    stop() {\n        window.clearInterval(this.interval);\n        this.interval = null;\n    }\n    kill() {\n        this.things.clear();\n        this.stop();\n        window.cancelAnimationFrame(this.rafInterval);\n        this.rafInterval = null;\n        this._clear(true);\n    }\n    fire() {\n        this.things.spawnRocket();\n        if (!this.rafInterval) {\n            this.rafInterval = window.requestAnimationFrame(() => this.update());\n        }\n    }\n    _clear(force = false) {\n        this.ctx.globalCompositeOperation = 'destination-out';\n        this.ctx.fillStyle = `rgba(0, 0, 0 ${force ? '' : ', 0.5'})`;\n        this.ctx.fillRect(0, 0, this.cw, this.ch);\n        this.ctx.globalCompositeOperation = 'lighter';\n    }\n    update() {\n        this._clear();\n        for (const particle of this.things) {\n            particle.draw(this.ctx);\n            particle.update();\n            if (particle.shouldRemove(this.cw, this.ch)) {\n                this.things.delete(particle);\n            }\n            else if (particle.shouldExplode(this.max_h, this.min_h, this.chance)) {\n                this.things.explode(particle);\n            }\n        }\n        if (this.interval || this.things.size > 0) {\n            this.rafInterval = window.requestAnimationFrame(() => this.update());\n        }\n        else {\n            this._clear(true);\n            this.rafInterval = null;\n        }\n    }\n}\nexports.default = Fireworks;\n\n\n//# sourceURL=webpack://Fireworks/./ts/fireworks.ts?");

/***/ }),

/***/ "./ts/particle.ts":
/*!************************!*\
  !*** ./ts/particle.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst util_1 = __webpack_require__(/*! ./util */ \"./ts/util.ts\");\nclass Particle {\n    constructor({ isRocket = false, hue = util_1.random(1, 360), brightness = util_1.random(50, 60), position }) {\n        this.isRocket = isRocket;\n        this.position = position;\n        this.positions = [\n            this.position,\n            this.position,\n            this.position\n        ];\n        if (this.isRocket) {\n            this.velocity = {\n                x: util_1.random(-3, 3),\n                y: util_1.random(-7, -3)\n            };\n            this.shrink = 0.999;\n            this.resistance = 1;\n        }\n        else {\n            const angle = util_1.random(0, util_1.TAU);\n            const speed = Math.cos(util_1.random(0, util_1.TAU)) * 15;\n            this.velocity = {\n                x: Math.cos(angle) * speed,\n                y: Math.sin(angle) * speed\n            };\n            this.shrink = util_1.random(0, 0.05) + 0.93;\n            this.resistance = 0.92;\n        }\n        this.gravity = 0.01;\n        this.size = 3;\n        this.alpha = 1;\n        this.fade = 0;\n        this.hue = hue;\n        this.brightness = brightness;\n    }\n    clone() {\n        return new Particle({\n            position: {\n                x: this.position.x,\n                y: this.position.y\n            },\n            hue: this.hue,\n            brightness: this.brightness\n        });\n    }\n    shouldRemove(cw, ch) {\n        if (this.alpha <= 0.1 || this.size <= 1) {\n            return true;\n        }\n        if (this.position.x > cw || this.position.x < 0) {\n            return true;\n        }\n        if (this.position.y > ch || this.position.y < 0) {\n            return true;\n        }\n        return false;\n    }\n    shouldExplode(maxHeight, minHeight, chance) {\n        if (!this.isRocket) {\n            return false;\n        }\n        if (this.position.y <= maxHeight) {\n            return true;\n        }\n        if (this.position.y >= minHeight) {\n            return false;\n        }\n        return util_1.random(0, 1) <= chance;\n    }\n    update() {\n        this.positions.pop();\n        this.positions.unshift({ x: this.position.x, y: this.position.y });\n        this.velocity.x *= this.resistance;\n        this.velocity.y *= this.resistance;\n        this.velocity.y += this.gravity;\n        this.position.x += this.velocity.x;\n        this.position.y += this.velocity.y;\n        this.size *= this.shrink;\n        this.alpha -= this.fade;\n    }\n    draw(ctx) {\n        const lastPosition = this.positions[this.positions.length - 1];\n        ctx.beginPath();\n        ctx.moveTo(lastPosition.x, lastPosition.y);\n        ctx.lineTo(this.position.x, this.position.y);\n        ctx.lineWidth = this.size;\n        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;\n        ctx.stroke();\n    }\n}\nexports.default = Particle;\n\n\n//# sourceURL=webpack://Fireworks/./ts/particle.ts?");

/***/ }),

/***/ "./ts/things.ts":
/*!**********************!*\
  !*** ./ts/things.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst particle_1 = __webpack_require__(/*! ./particle */ \"./ts/particle.ts\");\nconst util_1 = __webpack_require__(/*! ./util */ \"./ts/util.ts\");\nclass Things extends Set {\n    constructor({ maxRockets, numParticles, cw, ch }) {\n        super();\n        this.rockets = 0;\n        this.maxRockets = maxRockets;\n        this.numParticles = numParticles;\n        this.cw = cw;\n        this.ch = ch;\n    }\n    explode(particle) {\n        this.rockets--;\n        for (let i = 0; i < this.numParticles; i += 1) {\n            this.add(particle.clone());\n        }\n        this.delete(particle);\n    }\n    spawnRocket() {\n        this.rockets++;\n        this.add(new particle_1.default({\n            isRocket: true,\n            position: {\n                x: util_1.random(0, this.cw),\n                y: this.ch\n            }\n        }));\n    }\n    spawnRockets() {\n        if (this.rockets < this.maxRockets) {\n            this.spawnRocket();\n        }\n    }\n}\nexports.default = Things;\n\n\n//# sourceURL=webpack://Fireworks/./ts/things.ts?");

/***/ }),

/***/ "./ts/util.ts":
/*!********************!*\
  !*** ./ts/util.ts ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction random(min, max) {\n    return Math.random() * (max - min) + min;\n}\nexports.random = random;\nexports.TAU = Math.PI * 2;\n\n\n//# sourceURL=webpack://Fireworks/./ts/util.ts?");

/***/ })

/******/ })["default"];
});