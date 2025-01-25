import {
  checkForDuplicateNumbers,
  checkNumberRange,
} from '../../src/lib/utils.js';

describe('utils', () => {
  describe('checkForDuplicateNumericString', () => {
    it('중복 숫자가 존재할 시 false를 반환한다', () => {
      const input = [1, 2, 3, 2];

      const result = checkForDuplicateNumbers(input);

      expect(result).toBe(false);
    });
    it('중복 숫자가 없다면 true를 반환한다', () => {
      const input = [1, 2, 3];

      const result = checkForDuplicateNumbers(input);

      expect(result).toBe(true);
    });
  });
  describe('checkNumberRange', () => {
    it('숫자가 범위안에 존재하면 true를 반환한다', () => {
      const from = 1;
      const to = 45;
      const number = 20;

      const result = checkNumberRange(number, from, to);

      expect(result).toBe(true);
    });
    it('숫자가 범위안에 존재하지 않으면 false를 반환한다', () => {
      const from = 1;
      const to = 45;
      const number = 46;

      const result = checkNumberRange(number, from, to);

      expect(result).toBe(false);
    });
  });
});
