// @ts-check
import {
  isIntegerNumericString,
  isNotEmptyString,
  isNumericString,
  isPositiveNumericString,
} from '../lib/utils.js';
import Validator from '../lib/Validator.js';
import ValidationStrategy from './validation.strategy.js';

class WinningNumbersValidationStrategy extends ValidationStrategy {
  /** @type {string} */
  #winningNumbers;

  /** @type {(winningNumbers: string) => Array<number>} */
  #parse;

  static STRATEGY = Object.freeze({
    WINNING_NUMBERS_LENGTH: 6,
    WINNING_NUMBERS_RANGE: {
      START: 1,
      END: 45,
    },
  });

  static ERROR_MESSAGE = Object.freeze({
    WINNING_NUMBERS_CAN_NOT_BE_EMPTY: '[ERROR] 빈 값은 입력할 수 없어요',
    WINNING_NUMBERS_LENGTH_IS_NOT_VALID: `[ERROR] 당첨 번호는 ${WinningNumbersValidationStrategy.STRATEGY.WINNING_NUMBERS_LENGTH}개만 입력할 수 있어요`,
    WINNING_NUMBERS_RANGE_IS_NOT_VALID: `[ERROR] 당첨 번호는 ${WinningNumbersValidationStrategy.STRATEGY.WINNING_NUMBERS_RANGE.START} ~ ${WinningNumbersValidationStrategy.STRATEGY.WINNING_NUMBERS_RANGE.END} 범위의 숫자만 입력할 수 있어요`,
    WINNING_NUMBERS_MUST_BE_POSITIVE_INTEGER:
      '[ERROR] 당첨 번호는 양의 정수만 입력할 수 있어요',
    WINNING_NUMBERS_HAVE_NO_DUPLICATED_NUMBER:
      '[ERROR] 당첨 번호는 중복된 숫자를 가질 수 없어요',
  });

  /**
   *
   * @param {string} winningNumbers
   * @param {(winningNumbers: string) => Array<number>} parseWinningNumbers
   */
  constructor(winningNumbers, parseWinningNumbers) {
    super();

    this.#winningNumbers = winningNumbers;
    this.#parse = parseWinningNumbers;
  }

  /**
   *
   * @param {string} winningNumbers
   * @returns {boolean}
   */
  #isNotEmpty(winningNumbers) {
    return isNotEmptyString(winningNumbers);
  }

  /**
   *
   * @param {Array<number>} winningNumbers
   * @returns  {boolean}
   */
  #isValidRange(winningNumbers) {
    return winningNumbers.every(
      (winningNumber) =>
        WinningNumbersValidationStrategy.STRATEGY.WINNING_NUMBERS_RANGE.START <=
          winningNumber &&
        winningNumber <=
          WinningNumbersValidationStrategy.STRATEGY.WINNING_NUMBERS_RANGE.END,
    );
  }

  /**
   *
   * @param {Array<number>} winningNumbers
   * @returns {boolean}
   */
  #isValidLength(winningNumbers) {
    return (
      winningNumbers.length ===
      WinningNumbersValidationStrategy.STRATEGY.WINNING_NUMBERS_LENGTH
    );
  }

  /**
   *
   * @param {Array<number>} winningNumbers
   * @returns {boolean}
   */
  #isNotDuplicated(winningNumbers) {
    const winningNumbersNoDuplicated = [...new Set(winningNumbers)];

    return winningNumbers.length === winningNumbersNoDuplicated.length;
  }

  /**
   *
   * @param {Array<number>} winningNumbers
   * @returns {boolean}
   */
  #isPositiveInteger(winningNumbers) {
    return winningNumbers.every(
      (winningNumber) =>
        isNumericString(String(winningNumber)) &&
        isIntegerNumericString(String(winningNumber)) &&
        isPositiveNumericString(String(winningNumber)),
    );
  }

  /**
   *
   * @param {Validator} validator
   * @returns {Validator}
   */
  #validateWinningNumbers(validator) {
    return validator.validate(this.#winningNumbers).with(this.#isNotEmpty, {
      message:
        WinningNumbersValidationStrategy.ERROR_MESSAGE
          .WINNING_NUMBERS_CAN_NOT_BE_EMPTY,
    });
  }

  /**
   *
   * @param {Validator} validator
   */
  #validateParsedWinningNumber(validator) {
    validator
      .validate(this.#parse(this.#winningNumbers))
      .with(this.#isValidRange, {
        message:
          WinningNumbersValidationStrategy.ERROR_MESSAGE
            .WINNING_NUMBERS_RANGE_IS_NOT_VALID,
      })
      .with(this.#isValidLength, {
        message:
          WinningNumbersValidationStrategy.ERROR_MESSAGE
            .WINNING_NUMBERS_LENGTH_IS_NOT_VALID,
      })
      .with(this.#isPositiveInteger, {
        message:
          WinningNumbersValidationStrategy.ERROR_MESSAGE
            .WINNING_NUMBERS_MUST_BE_POSITIVE_INTEGER,
      })
      .with(this.#isNotDuplicated, {
        message:
          WinningNumbersValidationStrategy.ERROR_MESSAGE
            .WINNING_NUMBERS_HAVE_NO_DUPLICATED_NUMBER,
      });
  }

  validate() {
    const validator = new Validator();

    this.#validateWinningNumbers(validator);
    this.#validateParsedWinningNumber(validator);
  }
}

export default WinningNumbersValidationStrategy;
