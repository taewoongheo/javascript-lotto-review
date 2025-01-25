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

  /**
   *
   * @param {() => Promise<void>} input
   * @param {() => Promise<void>} onError
   */
  async #safeInput(input, onError) {
    try {
      await input();
    } catch (error) {
      this.#view.printErrorMessage(error.message);
      await onError();
    }
  }

  async #inputPurchaseAmount() {
    await this.#safeInput(
      async () => {
        const purchaseAmount = await this.#view.getLotteryPurchaseAmount();
        this.#service.inputPurchaseAmount(purchaseAmount);
      },
      async () => {
        await this.#inputPurchaseAmount();
      },
    );

    this.#view.printLineBreak();
  }

  async #inputWinningNumbers() {
    await this.#safeInput(
      async () => {
        const winningNumbers = await this.#view.getLotteryWinningNumbers();
        this.#service.inputWinningNumbers(winningNumbers);
      },
      async () => {
        await this.#view.getLotteryWinningNumbers();
      },
    );

    this.#view.printLineBreak();
  }

  async #inputBonusNumbers() {
    await this.#safeInput(
      async () => {
        const bonusNumber = await this.#view.getLotteryBonusNumber();
        this.#service.inputBonusNumber(bonusNumber);
      },
      async () => {
        await this.#view.getLotteryBonusNumber();
      },
    );

    this.#view.printLineBreak();
  }

  #generateLotteryTickets() {
    const { lotteryTicketCounts, lotteryTickets } =
      this.#service.generateLotteryTickets();

    this.#view.printPurchaseLotteryTicketInfo(
      lotteryTicketCounts,
      lotteryTickets,
    );
    this.#view.printLineBreak();
  }

  #generateWinningStatistics() {
    const { winningStatistics, winningAmount } =
      this.#service.generateWinningStatistics();

    this.#view.printWinningStatistics(winningStatistics, winningAmount);

    const totalReturnRate = this.#service.calculateTotalReturnRate(
      winningStatistics,
      winningAmount,
    );

    this.#view.printTotalReturnRate(totalReturnRate);
  }

  async init() {
    await this.#inputPurchaseAmount();

    this.#generateLotteryTickets();

    await this.#inputWinningNumbers();

    await this.#inputBonusNumbers();

    this.#generateWinningStatistics();
  }
}

export default LottoMachineController;
