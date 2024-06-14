import { Inject, Injectable } from '@nestjs/common';
import { GlobalConfigs } from '../models/index';

@Injectable()
export class GlobalConfService {
  constructor(
    @Inject('GLOBAL_CONFIG_REPO')
    private globalConfigRepo: typeof GlobalConfigs,
  ) {}

  async get(key: string): Promise<GlobalConfigs> {
    try {
      if (!key) {
        throw new Error('provide proper key');
      }

      const config = await this.globalConfigRepo.findOne({ where: { key } });

      return config;
    } catch (error) {
      console.log('error: ', error);
    }
  }

  async set(key: string, value: string): Promise<boolean | GlobalConfigs> {
    try {
      if (!key || !value) {
        throw new Error('please provide correct propertys');
      }

      return await this.globalConfigRepo.create({ key, value });
    } catch (error) {
      console.log('error: ', error);
    }
  }
}
