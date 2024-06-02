import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { RestaurantCategoriesService } from './restaurant-types.service';
import { Response } from 'express';

@Controller('restaurant-categories')
export class RestaurantCategoriesController {
  constructor(
    private readonly restaurantCategoriesService: RestaurantCategoriesService,
  ) {}

  @Get('/')
  async getAllCategories(@Res() response: Response) {
    const res = await this.restaurantCategoriesService.getAll();
    response.send(res);
  }

  @Post('/create')
  async createCategory(@Body() body, @Res() response: Response) {
    const req = body;

    await this.restaurantCategoriesService.create(req);
    response.status(200).send();
  }
}
