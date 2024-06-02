import { Controller, Post, Get, Req, Res, Query, Param } from '@nestjs/common';
import { Request, Response } from 'express';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}
  @Post('/')
  async createRestaurant(@Req() request: Request, @Res() response: Response) {
    const data = request.body;
    const res = await this.restaurantService.create(data);
    response.send(res);
  }

  @Get('/')
  async filter(@Res() response: Response, @Query() query: Request) {
    const res = await this.restaurantService.filter(query);
    response.send(res);
  }

  @Get('/:id')
  async restaurantById(@Param('id') id, @Res() response: Response) {
    const restaurantID = id;
    const res = await this.restaurantService.getRestaurantByID(restaurantID);

    response.send(res);
  }
}
