class LottoMachineModel {
  /** @type {number} */
  #purchaseAmount;

  /** @type {Array<number>} */
  #lotteryNumbers;

  /**
   *
   * @param {number} purchaseAmount
   */
  setPurchaseAmount(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }

  /**
   *
   * @param {Array<number>} lotteryNumbers
   */
  setWinningNumbers(lotteryNumbers) {
    this.#lotteryNumbers = lotteryNumbers;
  }
}

export default LottoMachineModel;
