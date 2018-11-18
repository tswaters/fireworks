function random(min, max) {
    return Math.random() * (max - min) + min;
}
const TAU = Math.PI * 2;

class Particle {
    constructor({ isRocket = false, hue = random(1, 360), brightness = random(50, 60), position }) {
        this.isRocket = isRocket;
        this.position = position;
        this.positions = [
            this.position,
            this.position,
            this.position
        ];
        if (this.isRocket) {
            this.velocity = {
                x: random(-3, 3),
                y: random(-7, -3)
            };
            this.shrink = 0.999;
            this.resistance = 1;
        }
        else {
            const angle = random(0, TAU);
            const speed = Math.cos(random(0, TAU)) * 15;
            this.velocity = {
                x: Math.cos(angle) * speed,
                y: Math.sin(angle) * speed
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
        ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
        ctx.stroke();
    }
}

class Things {
    constructor({ maxRockets, numParticles, cw, ch }) {
        this._set = new Set();
        this.rockets = 0;
        this.maxRockets = maxRockets;
        this.numParticles = numParticles;
        this.cw = cw;
        this.ch = ch;
    }
    size() {
        return this._set.size;
    }
    entries() {
        return this._set;
    }
    clear() {
        this._set.clear();
    }
    delete(thing) {
        this._set.delete(thing);
    }
    add(thing) {
        this._set.add(thing);
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
        this.add(new Particle({
            isRocket: true,
            position: {
                x: random(0, this.cw),
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
        this.things = new Things({
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
            this.interval = window.setInterval(() => this.things.spawnRockets(), this.rocketSpawnInterval);
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
        for (const particle of this.things.entries()) {
            particle.draw(this.ctx);
            particle.update();
            if (particle.shouldRemove(this.cw, this.ch)) {
                this.things.delete(particle);
            }
            else if (particle.shouldExplode(this.max_h, this.min_h, this.chance)) {
                this.things.explode(particle);
            }
        }
        if (this.interval || this.things.size() > 0) {
            this.rafInterval = window.requestAnimationFrame(() => this.update());
        }
        else {
            this._clear(true);
            this.rafInterval = null;
        }
    }
}

export default Fireworks;
