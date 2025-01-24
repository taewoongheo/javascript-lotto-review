class LottoMachineController {
  /** @type {LottoMachineService} */
  #service;

  /** @type {LottoMachineView} */
  #view;

  constructor({ services, views }) {
    const { LottoMachineService: service } = services;
    const { LottoMachineView: view } = views;

    this.#service = service;
    this.#view = view;
  }

  async init() {
    const purchaseAmount = await this.#view.getLotteryPurchaseAmount();
    this.#service.inputPurchaseAmount(purchaseAmount);
  }
}

export default LottoMachineController;
