/**
 * Some utilities.
 * @author Johan Svensson
 */
/**
 * @param {number} min Min value 
 * @param {number} max Max value
 * @returns {number} A random value within a range
 */
const range = (min, max) => min + (max - min) * Math.random()