import { input } from '../lib/view.js';

class LottoMachineView {
  static QUERY = Object.freeze({
    GET_LOTTERY_PURCHASE_AMOUNT: '구입금액을 입력해주세요.',
  });

  /**
   *
   * @returns {Promise<string>}
   */
  async getLotteryPurchaseAmount() {
    return await input(LottoMachineView.QUERY.GET_LOTTERY_PURCHASE_AMOUNT);
  }
}

export default LottoMachineView;
