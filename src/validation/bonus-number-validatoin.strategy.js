import {
  isIntegerNumericString,
  isNotEmptyString,
  isNumericString,
  isPositiveNumericString,
} from '../lib/utils.js';
import Validator from '../lib/Validator.js';
import ValidationStrategy from './validation.strategy.js';

class BonusNumberValidationStrategy extends ValidationStrategy {
  /** @type {string} */
  #bonusNumber;

  /** @type {(bonusNumber: string) => number} */
  #parse;

  /** @type {Array<number>} */
  #winningNumbers;

  static STRATEGY = Object.freeze({
    BONUS_RANGE: {
      START: 1,
      END: 45,
    },
  });

  static ERROR_MESSAGE = Object.freeze({
    BONUS_CAN_NOT_BE_EMPTY: '[ERROR] 빈 값은 입력할 수 없어요',
    BONUS_CAN_NOT_BE_ZERO: '[ERROR] 0은 입력할 수 없어요',
    BONUS_RANGE_IS_NOT_VALID: `[ERROR] 당첨 번호는 ${BonusNumberValidationStrategy.STRATEGY.BONUS_RANGE.START} ~ ${BonusNumberValidationStrategy.STRATEGY.BONUS_RANGE.END} 범위의 숫자만 입력할 수 있어요`,
    BONUS_MUST_BE_POSITIVE_INTEGER:
      '[ERROR] 보너스 번호는 양의 정수만 입력할 수 있어요',
    BONUS_HAS_NO_DUPLICATED_NUMBER:
      '[ERROR] 보너스 번호는 당첨 번호와 중복된 숫자를 가질 수 없어요',
  });

  /**
   *
   * @param {string} bonusNumber
   * @param {(bonusNumber: string) => number} parsebonusNumber
   * @param {Array<number>} winningNumbers
   */
  constructor(bonusNumber, parsebonusNumber, winningNumbers) {
    super();
    this.#bonusNumber = bonusNumber;
    this.#parse = parsebonusNumber;
    this.#winningNumbers = winningNumbers;
  }

  /**
   *
   * @param {string} bonusNumber
   * @returns {boolean}
   */
  #isNotEmpty(bonusNumber) {
    return isNotEmptyString(bonusNumber);
  }

  /**
   *
   * @param {string} bonusNumber
   * @returns {boolean}
   */
  #isPositiveInteger(bonusNumber) {
    return (
      isNumericString(bonusNumber) &&
      isIntegerNumericString(bonusNumber) &&
      isPositiveNumericString(bonusNumber)
    );
  }

  /**
   *
   * @param {number} bonusNumber
   * @returns {boolean}
   */
  #isNotZero(bonusNumber) {
    return bonusNumber !== 0;
  }

  /**
   *
   * @param {number} bonusNumber
   * @returns {boolean}
   */
  #isValidRange(bonusNumber) {
    return (
      BonusNumberValidationStrategy.STRATEGY.BONUS_RANGE.START <= bonusNumber &&
      bonusNumber <= BonusNumberValidationStrategy.STRATEGY.BONUS_RANGE.END
    );
  }

  /**
   *
   * @param {number} bonusNumber
   * @returns {boolean}
   */
  #isNotDuplicated(bonusNumber) {
    return this.#winningNumbers.every(
      (winningNumber) => winningNumber !== bonusNumber,
    );
  }

  /**
   *
   * @param {Validator} validator
   * @returns {Validator}
   */
  #validateBonusNumber(validator) {
    return validator
      .validate(this.#bonusNumber)
      .with(this.#isNotEmpty, {
        message:
          BonusNumberValidationStrategy.ERROR_MESSAGE.BONUS_CAN_NOT_BE_EMPTY,
      })
      .with(this.#isPositiveInteger, {
        message:
          BonusNumberValidationStrategy.ERROR_MESSAGE
            .BONUS_MUST_BE_POSITIVE_INTEGER,
      });
  }

  /**
   * @param {Validator} validator
   * @returns {Validator}
   */
  #validateParsedBonusNumber(validator) {
    return validator
      .validate(this.#parse(this.#bonusNumber))
      .with(this.#isNotZero, {
        message:
          BonusNumberValidationStrategy.ERROR_MESSAGE.BONUS_CAN_NOT_BE_ZERO,
      })
      .with(this.#isValidRange, {
        message:
          BonusNumberValidationStrategy.ERROR_MESSAGE.BONUS_RANGE_IS_NOT_VALID,
      })
      .with(this.#isNotDuplicated.bind(this), {
        message:
          BonusNumberValidationStrategy.ERROR_MESSAGE
            .BONUS_HAS_NO_DUPLICATED_NUMBER,
      });
  }

  validate() {
    const validator = new Validator();
    this.#validateBonusNumber(validator);
    this.#validateParsedBonusNumber(validator);
  }
}
export default BonusNumberValidationStrategy;
