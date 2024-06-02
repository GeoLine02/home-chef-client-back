import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { profileProviders } from './profile.repository';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, ...profileProviders],
  exports: [ProfileService, ...profileProviders],
})
export class ProfileModule {}
