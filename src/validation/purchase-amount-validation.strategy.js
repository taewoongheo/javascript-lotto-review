import {
  isNotEmptyString,
  isDivisible,
  isNumericString,
  isPositiveNumericString,
  isIntegerNumericString,
} from '../lib/utils.js';
import Validator from '../lib/Validator.js';
import ValidationStrategy from './validation.strategy.js';

class PurchaseAmountValidationStrategy extends ValidationStrategy {
  /** @type {number} */
  #purchaseAmount;

  static ERROR_MESSAGE = Object.freeze({
    INPUT_CAN_NOT_BE_EMPTY: '[ERROR] 빈 값은 입력할 수 없습니다.',
    INPUT_MUST_BE_POSITIVE_INTEGER: '[ERROR] 구입금액은 양의 정수여야 합니다',
    // 변수명이 LOTTO_UNIT에 의존하면서 응집도가 떨어짐
    INPUT_MUST_BE_DIVISION_BY_LOTTO_UNIT:
      '[ERROR] 로또 구입금액은 1000원 단위여야 합니다.',
  });

  static LOTTO_UNIT = 1000;

  /**
   *
   * @param {number} purchaseAmount
   */
  constructor(purchaseAmount) {
    super();

    this.#purchaseAmount = purchaseAmount;
  }

  /**
   *
   * @param {string} purchaseAmount
   * @returns {boolean}
   */
  #isNotEmpty(purchaseAmount) {
    return isNotEmptyString(purchaseAmount);
  }

  #isDivisibleByLottoUnit(purchaseAmount) {
    return isDivisible(
      purchaseAmount,
      PurchaseAmountValidationStrategy.LOTTO_UNIT,
    );
  }

  #isPositiveInteger(purchaseAmount) {
    return (
      isNumericString(purchaseAmount) &&
      isPositiveNumericString(purchaseAmount) &&
      isIntegerNumericString(purchaseAmount)
    );
  }

  #validatePurchaseAmount() {
    new Validator()
      .validate(this.#purchaseAmount)
      .with(this.#isNotEmpty, {
        message:
          PurchaseAmountValidationStrategy.ERROR_MESSAGE.INPUT_CAN_NOT_BE_EMPTY,
      })
      .with(this.#isPositiveInteger, {
        message:
          PurchaseAmountValidationStrategy.ERROR_MESSAGE.INPUT_MUST_BE_NUMBER,
      })
      .with(this.#isDivisibleByLottoUnit, {
        message:
          PurchaseAmountValidationStrategy.ERROR_MESSAGE
            .INPUT_MUST_BE_DIVISION_BY_LOTTO_UNIT,
      });
  }

  validate() {
    this.#validatePurchaseAmount();
  }
}

export default PurchaseAmountValidationStrategy;
