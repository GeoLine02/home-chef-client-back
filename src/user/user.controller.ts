import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  // @Post('/:userID/favorites')
  // async saveToFavorites(
  //   @Param('userID') userID: string,
  //   @Body() restaurantIDs: string[],
  // ) {
  //   return await this.favoriteRestaurantService.save(userID, restaurantIDs);
  // }
  @Get('/single/:id')
  async getUser(@Param('id') id: string) {
    try {
      return await this.userService.findUser(+id);
    } catch (error) {
      console.log(error);
    }
  }

  @Get('list')
  async getUserList() {
    try {
      return await this.userService.findUserList();
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
