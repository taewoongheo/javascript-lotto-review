import LottoMachineModel from '../../src/LottoMachine/LottoMachineModel.js';

describe('LottoMachineModel', () => {
  describe('constructor', () => {
    it('입력된 구입 금액이 1000원으로 나누어 떨어질 시 에러를 발생하지 않는다.', () => {
      const purchaseAmount = 2000;

      expect(() => new LottoMachineModel(purchaseAmount)).not.toThrow();
    });
    it('입력된 구입 금액이 1000원으로 나누어 떨어지지 않을 시, 에러를 발생한다.', () => {
      const purchaseAmount = 2001;

      expect(() => new LottoMachineModel(purchaseAmount)).toThrow();
    });
  });
});
