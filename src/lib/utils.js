/**
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isNotEmptyString(value) {
  return value !== '';
}

/**
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isNumericString(value) {
  return !isNaN(value);
}

/**
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isPositiveNumericString(value) {
  return Number(value) > 0;
}

/**
 *
 * @param {string} value
 * @returns {boolean}
 */
export function isIntegerNumericString(value) {
  return Number(value) === Math.trunc(Number(value));
}

/**
 *
 * @param {number} value
 * @param {number} divisor
 * @returns {boolean}
 */
export function isDivisible(value, divisor) {
  return value % divisor === 0;
}
