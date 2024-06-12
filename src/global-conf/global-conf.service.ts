import { Injectable } from '@nestjs/common';
import { GlobalConfig } from '../models/index';

@Injectable()
export class GlobalConfService {
  constructor(private globalConfigRepo: typeof GlobalConfig) {}

  async get(key: string): Promise<GlobalConfig> {
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

  async set(key: string, value: string): Promise<boolean | GlobalConfig> {
    try {
      if (!key || !value) {
        throw new Error('please provide correct propertys');
      }

      return await this.globalConfigRepo.create({ key, value });
    } catch (error) {
      console.log('error: ', error);
      throw false;
    }
  }
}
