import { input, output } from '../lib/view.js';

class LottoMachineView {
  static QUERY = Object.freeze({
    GET_LOTTERY_PURCHASE_AMOUNT: '구입금액을 입력해주세요.',
    GET_LOTTERY_WINNING_NUMBERS: '당첨 번호를 입력해주세요.',
    GET_BONUS_NUMBER: '보너스 번호를 입력하세요.',
  });

  static MESSAGE = Object.freeze({
    PURCHASE_LOTTERY_TICKET_COUNTS: (lotteryTicketCounts) =>
      `${String(lotteryTicketCounts)}개를 구매했습니다.`,
    PURCHASE_LOTTERY_TICKET: (lotteryTicket) => `[${lotteryTicket.join(', ')}]`,
  });

  /**
   *
   * @param {string} value
   * @returns {string}
   */
  #parse(value) {
    return value.trim();
  }

  /**
   *
   * @returns {Promise<string>}
   */
  async getLotteryPurchaseAmount() {
    const result = await input(
      LottoMachineView.QUERY.GET_LOTTERY_PURCHASE_AMOUNT,
    );
    return this.#parse(result);
  }

  /**
   *
   * @returns {Promise<string>}
   */
  async getLotteryWinningNumbers() {
    const result = await input(
      LottoMachineView.QUERY.GET_LOTTERY_WINNING_NUMBERS,
    );
    return this.#parse(result);
  }

  /**
   *
   * @returns {Promise<string>}
   */
  async getLotteryBonusNumber() {
    const result = await input(LottoMachineView.QUERY.GET_BONUS_NUMBER);
    return this.#parse(result);
  }

  printLineBreak() {
    output('');
  }

  /**
   *
   * @param {number} lotteryTicketCounts
   */
  printPurchaseLotteryTicketCounts(lotteryTicketCounts) {
    output(
      LottoMachineView.MESSAGE.PURCHASE_LOTTERY_TICKET_COUNTS(
        lotteryTicketCounts,
      ),
    );
  }

  /**
   *
   * @param {Array<number[]>} lotteryTickets
   */
  printPurchaseLotteryTickets(lotteryTickets) {
    lotteryTickets.forEach((lotteryTicket) => {
      output(LottoMachineView.MESSAGE.PURCHASE_LOTTERY_TICKET(lotteryTicket));
    });
  }

  /**
   *
   * @param {number} lotteryTicketCounts
   * @param {Array<number[]>} lotteryTickets
   */
  printPurchaseLotteryTicketInfo(lotteryTicketCounts, lotteryTickets) {
    this.printPurchaseLotteryTicketCounts(lotteryTicketCounts);
    this.printPurchaseLotteryTickets(lotteryTickets);
  }
}

export default LottoMachineView;
