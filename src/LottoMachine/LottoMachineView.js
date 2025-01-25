import { input } from '../lib/view.js';

class LottoMachineView {
  static QUERY = Object.freeze({
    GET_LOTTERY_PURCHASE_AMOUNT: '구입금액을 입력해주세요.',
    GET_LOTTERY_WINNING_NUMBERS: '당첨 번호를 입력해주세요.',
    GET_BONUS_NUMBER: '보너스 번호를 입력하세요.',
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
}

export default LottoMachineView;
