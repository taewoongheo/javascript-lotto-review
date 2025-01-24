import PurchaseAmountValidationStrategy from '../validation/purchase-amount-validation.strategy.js';

class LottoMachineService {
  /** @type {LottoMachineModel} */
  #lotteryMachineModel;

  /** @type {ValidationContext} */
  #lotteryMachineValidator;

  constructor({ models, providers }) {
    const { LottoMachineModel: lotteryMachineModel } = models;
    const { ValidationContext: lotteryMachineValidator } = providers;

    this.#lotteryMachineModel = lotteryMachineModel;
    this.lotteryMachineValidator = lotteryMachineValidator;
  }

  /**
   *
   * @param {string} purchaseAmount
   */
  inputPurchaseAmount(purchaseAmount) {
    this.lotteryMachineValidator.validate(
      new PurchaseAmountValidationStrategy(purchaseAmount),
    );
    this.#lotteryMachineModel.setPurchaseAmount(Number(purchaseAmount));
  }
}

export default LottoMachineService;
