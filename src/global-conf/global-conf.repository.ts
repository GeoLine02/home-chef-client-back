import { GlobalConfigs } from 'src/database/models/index';

export const globalConfigRepository = {
  provide: 'GLOBAL_CONFIG_REPO',
  useValue: GlobalConfigs,
};
