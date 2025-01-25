/* eslint no-restricted-globals: "off" */

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

/**
 *
 * @param {Array<number>} value
 * @returns {boolean}
 */
export function checkForDuplicateNumbers(value) {
  return value.length === new Set(value).size;
}

/**
 *
 * @param {number} number
 * @param {number} from
 * @param {number} to
 * @returns {boolean}
 */
export function checkNumberRange(number, from, to) {
  return number >= from && number <= to;
}

export function checkStringLength(str, len) {
  return str.split(',').length === len;
}
