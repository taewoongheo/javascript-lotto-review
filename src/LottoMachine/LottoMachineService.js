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

  /**
   *
   * @param {Array<number>} lotteryTicketNumber
   * @returns {number}
   */
  #countMatchingLotteryNumber(lotteryTicketNumber) {
    return lotteryTicketNumber.filter((ticketNumber) =>
      this.#lotteryMachineModel.getWinningNumbers().includes(ticketNumber),
    ).length;
  }

  /**
   *
   * @param {Array<number>} lotteryTicketNumber
   * @returns {boolean}
   */
  #hasBonusNumber(lotteryTicketNumber) {
    return lotteryTicketNumber.includes(
      this.#lotteryMachineModel.getBonusNumber(),
    );
  }

  /**
   *
   * @param {WinningStatistics} winningStatistics
   * @param {number} matchedLotteryNumber
   * @param {boolean} hasBonusNumber
   * @returns {WinningStatistics}
   */
  #calculateNextWinningStatistics(
    winningStatistics,
    matchedLotteryNumber,
    hasBonusNumber,
  ) {
    if (matchedLotteryNumber < 3) {
      return { ...winningStatistics };
    }
    if (hasBonusNumber && matchedLotteryNumber === 5) {
      return {
        ...winningStatistics,
        bonus: winningStatistics.bonus + 1,
      };
    }
    return {
      ...winningStatistics,
      [matchedLotteryNumber]: winningStatistics[matchedLotteryNumber] + 1,
    };
  }

  /**
   *
   * @param {WinningStatistics} winningStatistics
   * @param {Array<number>} lotteryTicketNumber
   * @returns {WinningStatistics}
   */
  #calculateWinningStatistics(winningStatistics, lotteryTicketNumber) {
    const matchedLotteryNumber =
      this.#countMatchingLotteryNumber(lotteryTicketNumber);
    const hasBonusNumber = this.#hasBonusNumber(lotteryTicketNumber);
    return this.#calculateNextWinningStatistics(
      winningStatistics,
      matchedLotteryNumber,
      hasBonusNumber,
    );
  }

  /**
   *
   * @param {Array<number[]>} lotteryTicketNumbers
   * @returns {WinningStatistics}
   */
  #createWinningStatistics(lotteryTicketNumbers) {
    return lotteryTicketNumbers.reduce(
      (winningStatistics, lotteryTicketNumber) =>
        this.#calculateWinningStatistics(
          winningStatistics,
          lotteryTicketNumber,
        ),
      { 3: 0, 4: 0, 5: 0, 6: 0, bonus: 0 },
    );
  }

  /**
   *
   * @returns {{ winningStatistics: WinningStatistics; winningAmount: WinningAmount }}
   */
  generateWinningStatistics() {
    return {
      winningStatistics: this.#createWinningStatistics(
        this.#lotteryMachineModel.getLotteryTicketNumbers(),
      ),
      winningAmount: {
        3: '5,000',
        4: '50,000',
        5: '1,500,000',
        6: '2,000,000,000',
        bonus: '30,000,000',
      },
    };
  }

  /**
   *
   * @param {string} winningAmount
   * @returns {number}
   */
  #parseWinningAmount(winningAmount) {
    return Number(winningAmount.split(',').join(''));
  }

  /**
   *
   * @param {WinningStatistics} winningStatistics
   * @param {WinningAmount} winningAmount
   * @returns {number}
   */
  #calculateTotalWinningAmount(winningStatistics, winningAmount) {
    return Object.entries(winningStatistics).reduce(
      (totalWinningAmount, [winningNumber, winningCount]) => {
        if (winningCount === 0) {
          return totalWinningAmount;
        }
        return (
          totalWinningAmount +
          this.#parseWinningAmount(winningAmount[winningNumber]) * winningCount
        );
      },
      0,
    );
  }

  /**
   *
   * @param {WinningStatistics} winningStatistics
   * @param {WinningAmount} winningAmount
   * @returns {number}
   */
  calculateTotalReturnRate(winningStatistics, winningAmount) {
    return (
      Math.ceil(
        (this.#calculateTotalWinningAmount(winningStatistics, winningAmount) /
          this.#lotteryMachineModel.getPurchaseAmount()) *
          1000,
      ) / 10
    );
  }
}

export default LottoMachineService;
