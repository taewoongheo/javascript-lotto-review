import { input, output } from '../lib/view.js';

/** @typedef {{ 3: number; 4: number; 5: number; 6: number; bonus: number }} WinningStatistics */
/** @typedef {{ 3: string; 4: string; 5: string; 6: string; bonus: string }} WinningAmount */

class LotteryMachineView {
  static QUERY = Object.freeze({
    GET_LOTTERY_PURCHASE_AMOUNT: '구입금액을 입력해 주세요.',
    GET_LOTTERY_WINNING_NUMBERS: '당첨 번호를 입력해 주세요.',
    GET_LOTTERY_BONUS_NUMBER: '보너스 번호를 입력해 주세요.',
  });

  static MESSAGE = Object.freeze({
    PURCHASE_LOTTERY_TICKET_COUNTS: (lotteryTicketCounts) =>
      `${String(lotteryTicketCounts)}개를 구매했습니다.`,
    PURCHASE_LOTTERY_TICKET: (lotteryTicket) =>
      `[${lotteryTicket.sort((a, b) => a - b).join(', ')}]`,
    WINNING_STATISTICS: {
      INFO: '당첨 통계\n---',
      BASIC: (number, winningStatistics, winningAmount) =>
        `${number}개 일치 (${winningAmount[number]}원) - ${winningStatistics[number]}개`,
      BONUS: (number, winningStatistics, winningAmount) =>
        `${number}개 일치, 보너스 볼 일치 (${winningAmount.bonus}원) - ${winningStatistics.bonus}개`,
    },
    TOTAL_RETURN_RATE: (returnRate) =>
      `총 수익률은 ${String(returnRate)}%입니다.`,
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
      LotteryMachineView.QUERY.GET_LOTTERY_PURCHASE_AMOUNT,
    );

    return this.#parse(result);
  }

  /**
   *
   * @returns {Promise<string>}
   */
  async getLotteryWinningNumbers() {
    const result = await input(
      LotteryMachineView.QUERY.GET_LOTTERY_WINNING_NUMBERS,
    );

    return this.#parse(result);
  }

  /**
   *
   * @returns {Promise<string>}
   */
  async getLotteryBonusNumber() {
    const result = await input(
      LotteryMachineView.QUERY.GET_LOTTERY_BONUS_NUMBER,
    );

    return this.#parse(result);
  }

  printLineBreak() {
    output('');
  }

  /**
   *
   * @param {string} message
   */
  printErrorMessage(message) {
    output(message);
  }

  /**
   *
   * @param {number} lotteryTicketCounts
   */
  printPurchaseLotteryTicketCounts(lotteryTicketCounts) {
    output(
      LotteryMachineView.MESSAGE.PURCHASE_LOTTERY_TICKET_COUNTS(
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
      output(LotteryMachineView.MESSAGE.PURCHASE_LOTTERY_TICKET(lotteryTicket));
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

  /**
   *
   * @param {WinningStatistics} winningStatistics
   * @param {WinningAmount} winningAmount
   */
  printWinningStatistics(winningStatistics, winningAmount) {
    output(LotteryMachineView.MESSAGE.WINNING_STATISTICS.INFO);
    output(
      LotteryMachineView.MESSAGE.WINNING_STATISTICS.BASIC(
        3,
        winningStatistics,
        winningAmount,
      ),
    );
    output(
      LotteryMachineView.MESSAGE.WINNING_STATISTICS.BASIC(
        4,
        winningStatistics,
        winningAmount,
      ),
    );
    output(
      LotteryMachineView.MESSAGE.WINNING_STATISTICS.BASIC(
        5,
        winningStatistics,
        winningAmount,
      ),
    );
    output(
      LotteryMachineView.MESSAGE.WINNING_STATISTICS.BONUS(
        5,
        winningStatistics,
        winningAmount,
      ),
    );
    output(
      LotteryMachineView.MESSAGE.WINNING_STATISTICS.BASIC(
        6,
        winningStatistics,
        winningAmount,
      ),
    );
  }

  /**
   *
   * @param {number} totalReturnRate
   */
  printTotalReturnRate(totalReturnRate) {
    output(LotteryMachineView.MESSAGE.TOTAL_RETURN_RATE(totalReturnRate));
  }
}

export default LotteryMachineView;
