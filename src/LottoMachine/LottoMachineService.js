import WinningNumbersValidationStrategy from '../validation/winning-numbers-validation.strategy.js';
import PurchaseAmountValidationStrategy from '../validation/purchase-amount-validation.strategy.js';
import BonusNumberValidationStrategy from '../validation/bonus-number-validatoin.strategy.js';

class LottoMachineService {
  /** @type {LottoMachineModel} */
  #lotteryMachineModel;

  /** @type {ValidationContext} */
  #lotteryMachineValidator;

  constructor({ models, providers }) {
    const { LottoMachineModel: lotteryMachineModel } = models;
    const { ValidationContext: lotteryMachineValidator } = providers;

    this.#lotteryMachineModel = lotteryMachineModel;
    this.#lotteryMachineValidator = lotteryMachineValidator;
  }

  /**
   *
   * @param {string} purchaseAmount
   * @returns {number}
   */
  #parsePurchaseAmount(purchaseAmount) {
    return Number(purchaseAmount);
  }

  /**
   *
   * @param {string} purchaseAmount
   */
  inputPurchaseAmount(purchaseAmount) {
    this.#lotteryMachineValidator.validate(
      new PurchaseAmountValidationStrategy(
        purchaseAmount,
        this.#parsePurchaseAmount,
      ),
    );
    this.#lotteryMachineModel.setPurchaseAmount(
      this.#parsePurchaseAmount(purchaseAmount),
    );
  }

  /**
   *
   * @param {string} winningNumbers
   * @returns {Array<number>}
   */
  #parseWinningNumbers(winningNumbers) {
    return winningNumbers.split(',').map(Number);
  }

  /**
   *
   * @param {string} winningNumbers
   */
  inputWinningNumbers(winningNumbers) {
    this.#lotteryMachineValidator.validate(
      new WinningNumbersValidationStrategy(
        winningNumbers,
        this.#parseWinningNumbers,
      ),
    );
    this.#lotteryMachineModel.setWinningNumbers(
      this.#parseWinningNumbers(winningNumbers),
    );
  }

  /**
   *
   * @param {string} bonusNumber
   * @returns {number}
   */
  #parseBonusNumber(bonusNumber) {
    return Number(bonusNumber);
  }

  inputBonusNumber(bonusNumber) {
    this.#lotteryMachineValidator.validate(
      new BonusNumberValidationStrategy(
        bonusNumber,
        this.#parseBonusNumber,
        this.#lotteryMachineModel.getWinningNumbers(),
      ),
    );

    this.#lotteryMachineModel.setBonusNumber(
      this.#parseBonusNumber(bonusNumber),
    );
  }
}

export default LottoMachineService;
