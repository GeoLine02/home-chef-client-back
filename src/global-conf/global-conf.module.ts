import { Module } from '@nestjs/common';
import { GlobalConfService } from './global-conf.service';
import { globalConfigRepository } from './global-conf.repository';

@Module({
  providers: [GlobalConfService, globalConfigRepository],
})
export class GlobalConfModule {}
