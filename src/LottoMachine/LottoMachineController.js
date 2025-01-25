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

    this.#view.printLineBreak();

    const { lotteryTicketCounts, lotteryTickets } =
      this.#service.generateLotteryTickets();
    this.#view.printPurchaseLotteryTicketInfo(
      lotteryTicketCounts,
      lotteryTickets,
    );

    this.#view.printLineBreak();

    const lotteryNumbers = await this.#view.getLotteryWinningNumbers();
    this.#service.inputWinningNumbers(lotteryNumbers);
    const bonusNumber = await this.#view.getLotteryBonusNumber();
    this.#service.inputBonusNumber(bonusNumber);
  }
}

export default LottoMachineController;
