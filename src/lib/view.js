import { Console } from '@woowacourse/mission-utils';

/**
 *
 * @param {string} query
 * @returns {Promise<string>}
 */
export async function input(query) {
  return await Console.readLineAsync(`${query}\n`);
}

/**
 *
 * @param {string} message
 * @returns {void}
 */
export async function output(message) {
  return Console.print(message);
}
