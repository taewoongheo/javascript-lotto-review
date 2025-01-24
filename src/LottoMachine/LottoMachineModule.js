import Module from '../lib/Module.js';
import ValidationContext from '../validation/validation.context.js';
import LottoMachineController from './LottoMachineController.js';
import LottoMachineModel from './LottoMachineModel.js';
import LottoMachineService from './LottoMachineService.js';
import LottoMachineView from './LottoMachineView.js';

const lottoMachineModule = new Module({
  models: [LottoMachineModel],
  views: [LottoMachineView],
  controllers: [LottoMachineController],
  services: [LottoMachineService],
  providers: [ValidationContext],
});

export default lottoMachineModule;
