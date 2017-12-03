
/**
 * Returns a random number between min and max
 * @param {number} min minimum number
 * @param {number} max maximum number
 */
export function random (min: number, max: number): number {
  return Math.random() * (max - min) + min
}

/**
 * Tau is Pi multiplied by two.
 */
export const TAU = Math.PI * 2
