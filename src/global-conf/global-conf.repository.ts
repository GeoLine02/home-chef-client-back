import { GlobalConfig } from '../models/index';

export const globalConfigRepository = {
  provide: 'GLOBAL_CONFIG_REPO',
  useValue: GlobalConfig,
};
