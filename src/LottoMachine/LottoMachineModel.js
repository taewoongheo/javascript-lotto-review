class LottoMachineModel {
  /** @type {number} */
  #purchaseAmount;

  /**
   *
   * @param {number} purchaseAmount
   */
  setPurchaseAmount(purchaseAmount) {
    this.#purchaseAmount = purchaseAmount;
  }
}

export default LottoMachineModel;
