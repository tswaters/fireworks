function random(min, max) {
    return Math.random() * (max - min) + min;
}
const TAU = Math.PI * 2;

class Particle {
    constructor({ isRocket = false, hue = random(1, 360), brightness = random(50, 60), position, }) {
        this.isRocket = isRocket;
        this.position = position;
        this.positions = [this.position, this.position, this.position];
        if (this.isRocket) {
            this.velocity = {
                x: random(-3, 3),
                y: random(-7, -3),
            };
            this.shrink = 0.999;
            this.resistance = 1;
        }
        else {
            const angle = random(0, TAU);
            const speed = Math.cos(random(0, TAU)) * 15;
            this.velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed,
            };
            this.shrink = random(0, 0.05) + 0.93;
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
                y: this.position.y,
            },
            hue: this.hue,
            brightness: this.brightness,
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
        return random(0, 1) <= chance;
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
        ctx.lineCap = 'round';
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.stroke();
    }
}

class Things {
    constructor({ maxRockets, numParticles, cw, ch, rocketInitialPoint, cannons, }) {
        this._set = new Set();
        this.rockets = 0;
        this.maxRockets = maxRockets;
        this.numParticles = numParticles;
        this.cw = cw;
        this.ch = ch;
        this.rocketInitialPoint = rocketInitialPoint;
        this.cannons = cannons;
        if (this.rocketInitialPoint) {
            this.cannons.push({ x: this.rocketInitialPoint, y: this.ch });
        }
    }
    size() {
        return this._set.size;
    }
    entries() {
        return this._set;
    }
    clear() {
        this._set.clear();
        this.rockets = 0;
    }
    delete(thing) {
        this._set.delete(thing);
        if (thing.isRocket)
            this.rockets--;
    }
    add(thing) {
        this._set.add(thing);
    }
    explode(particle) {
        for (let i = 0; i < this.numParticles; i += 1) {
            this.add(particle.clone());
        }
        this.delete(particle);
    }
    spawnRocket() {
        this.rockets++;
        const cannonIndex = Math.floor(random(0, this.cannons.length));
        const cannon = this.cannons[cannonIndex] || {};
        this.add(new Particle({
            isRocket: true,
            position: Object.assign(Object.assign(Object.assign({}, cannon), (cannon.x == null && { x: random(0, this.cw) })), (cannon.y == null && { y: this.ch })),
        }));
    }
    spawnRockets() {
        if (this.rockets < this.maxRockets) {
            this.spawnRocket();
        }
    }
}

class Fireworks {
    constructor(container, { rocketSpawnInterval = 150, maxRockets = 3, numParticles = 100, explosionMinHeight = 0.2, explosionMaxHeight = 0.9, explosionChance = 0.08, width = container.clientWidth, height = container.clientHeight, rocketInitialPoint = null, cannons = [], } = {}) {
        this.finishCallbacks = [];
        this.container = container;
        this.rocketSpawnInterval = rocketSpawnInterval;
        this.maxRockets = maxRockets;
        this.cw = width;
        this.ch = height;
        this.maxH = this.ch * (1 - explosionMaxHeight);
        this.minH = this.ch * (1 - explosionMinHeight);
        this.chance = explosionChance;
        this.pixelRatio = window.devicePixelRatio || 1;
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        container.appendChild(this.canvas);
        this.things = new Things({
            maxRockets: this.maxRockets,
            numParticles,
            cw: this.cw,
            ch: this.ch,
            rocketInitialPoint,
            cannons,
        });
        this.updateDimensions();
    }
    destroy() {
        this.canvas.parentElement.removeChild(this.canvas);
        window.clearInterval(this.interval);
        window.cancelAnimationFrame(this.rafInterval);
    }
    start() {
        if (this.interval != null)
            return;
        this.interval = window.setInterval(() => this.things.spawnRockets(), this.rocketSpawnInterval);
        this.rafInterval = window.requestAnimationFrame(() => this.update());
        return () => this.stop();
    }
    updateDimensions() {
        this.canvas.width = this.cw * this.pixelRatio;
        this.canvas.height = this.ch * this.pixelRatio;
        this.canvas.style.width = `${this.cw}px`;
        this.canvas.style.height = `${this.ch}px`;
        this.ctx.scale(this.pixelRatio, this.pixelRatio);
        this.things.cw = this.cw;
        this.things.ch = this.ch;
    }
    setSize(width, height) {
        this.cw = width;
        this.ch = height;
        this.updateDimensions();
    }
    resetSize() {
        this.cw = this.container.clientWidth;
        this.ch = this.container.clientHeight;
        this.updateDimensions();
    }
    stop() {
        window.clearInterval(this.interval);
        this.interval = null;
    }
    kill() {
        this.things.clear();
        this.stop();
        window.cancelAnimationFrame(this.rafInterval);
        this._finish();
    }
    fire() {
        this.things.spawnRocket();
        if (!this.rafInterval) {
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
    }
    onFinish(cb) {
        this.finishCallbacks.push(cb);
    }
    _clear(force = false) {
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = `rgba(0, 0, 0 ${force ? '' : ', 0.5'})`;
        this.ctx.fillRect(0, 0, this.cw, this.ch);
        this.ctx.globalCompositeOperation = 'lighter';
    }
    _finish() {
        this._clear(true);
        this.rafInterval = null;
        this.finishCallbacks.forEach((cb) => cb());
    }
    update() {
        this._clear();
        for (const particle of this.things.entries()) {
            particle.draw(this.ctx);
            particle.update();
            if (particle.shouldRemove(this.cw, this.ch)) {
                this.things.delete(particle);
            }
            else if (particle.shouldExplode(this.maxH, this.minH, this.chance)) {
                this.things.explode(particle);
            }
        }
        if (this.interval || this.things.size() > 0) {
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
        else {
            this._finish();
        }
    }
}

export default Fireworks;
