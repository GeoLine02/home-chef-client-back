import { Module } from '@nestjs/common';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { RestaurantModule } from 'src/restaurant/restaurant.module';

@Module({
  controllers: [SearchController],
  providers: [SearchService],
  imports: [RestaurantModule],
})
export class SearchModule {}
