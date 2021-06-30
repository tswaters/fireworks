declare type Point = {
  x: number
  y: number
}

declare class Fireworks {
  constructor(container: HTMLElement, options?: Fireworks.FireworksOptions)
  destroy(): void
  start(): () => void
  stop(): void
  kill(): void
  fire(): void
  update(): void
  setSize(width: number, height: number): void
  resetSize(): void
  onFinish(cb: () => void): void
}

declare namespace Fireworks {
  export type FireworksOptions = {
    maxRockets?: number
    numParticles?: number
    explosionMinHeight?: number
    explosionMaxHeight?: number
    explosionChance?: number
    rocketSpawnInterval?: number
    rocketInitialPoint?: number
    cannons?: Point[]
    width?: number
    height?: number
  }
}

export = Fireworks

export as namespace Fireworks
