import WinningNumbersValidationStrategy from '../validation/winning-numbers-validation.strategy.js';
import PurchaseAmountValidationStrategy from '../validation/purchase-amount-validation.strategy.js';
import BonusNumberValidationStrategy from '../validation/bonus-number-validatoin.strategy.js';
import Lotto from '../Lotto.js';
import { generateUniqueNumbersInRange } from '../lib/utils.js';

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

  /**
   *
   * @param {number} bonusNumber
   */
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

  /**
   *
   * @returns {number}
   */
  #calculateLotteryTicketCount() {
    return this.#lotteryMachineModel.getPurchaseAmount() / 1000;
  }

  /**
   *
   * @returns {boolean}
   */
  #isGeneratingLotteryTickets() {
    return (
      this.#lotteryMachineModel.getLotteryTickets().length !==
      this.#calculateLotteryTicketCount()
    );
  }

  /**
   *
   * @returns {Array<number>}
   */
  #generateLotteryTicket() {
    return generateUniqueNumbersInRange(1, 45, 6);
  }

  /**
   *
   * @returns {{ lotteryTicketCounts: number; lotteryTickets: Array<number[]> }}
   */
  generateLotteryTickets() {
    while (this.#isGeneratingLotteryTickets()) {
      this.#lotteryMachineModel.setLotteryTicket(
        new Lotto(this.#generateLotteryTicket()),
      );
    }
    return {
      lotteryTicketCounts: this.#lotteryMachineModel.getLotteryTicketCounts(),
      lotteryTickets: this.#lotteryMachineModel.getLotteryTicketNumbers(),
    };
  }
}

export default LottoMachineService;
