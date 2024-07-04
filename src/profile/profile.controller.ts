import {
  Controller,
  Post,
  Param,
  Delete,
  Get,
  Body,
  Patch,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { NewAddressDTO } from './dto/new-address.dto';
import { UpdateAddressDTO } from './dto/update-address.dto';
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  //Favorite Restaurants ///////////////////////////////////////
  @Post('/favorites/:userId/:restaurantId')
  async addToFavorites(
    @Param('userId') userID: string,
    @Param('restaurantId') restaurantID: string,
  ) {
    return await this.profileService.addToFav(+userID, +restaurantID);
  }

  @Delete('/favorites/remove/:userID/:restaurantID')
  async removeFromFavorites(
    @Param('userID') userID: string,
    @Param('restaurantID') restaurantID: string,
  ) {
    return await this.profileService.remove(+userID, +restaurantID);
  }

  @Get('/favorites/:userID')
  async myFavorites(@Param('userID') userID: string) {
    return await this.profileService.getFavorites(+userID);
  }
  //////////////////////////////////////////////////////////

  //Address Features///////////////////////////////////////
  @Post('/new-address/:userID')
  async newAddress(
    @Param('userID') userID: string,
    @Body() newAddress: NewAddressDTO,
  ) {
    console.log('@@@@@@@@@@userID', userID);
    console.log('@@@@@@@@@@@@@@@newAddress', newAddress);
    return await this.profileService.addNewAddress(+userID, newAddress);
  }

  @Get('address/list/:userID')
  async userAddressList(@Param('userID') userID: string) {
    return await this.profileService.getUserAddresses(+userID);
  }

  @Get('address/:userID/:userAddressID')
  async singleUserAddress(
    @Param('userID') userID: string,
    @Param('userAddressID') userAddressID: string,
  ) {
    console.log(userAddressID);
    return await this.profileService.getUserSingleAddress(
      +userID,
      +userAddressID,
    );
  }

  @Patch('/update-address/:userID/:userAddressID')
  async updateMyAddress(
    @Param('userID') userID: string,
    @Param('userAddressID') userAddressID: string,
    @Body() updateAddress: UpdateAddressDTO,
  ) {
    return await this.profileService.updateAddress(
      +userID,
      +userAddressID,
      updateAddress,
    );
  }
  @Delete('remove-address/:userID/:userAddressID')
  async removeMyAddress(
    @Param('userID') userID: string,
    @Param('userAddressID') userAddressID: string,
  ) {
    return await this.profileService.removeAddress(+userID, +userAddressID);
  }
  //////////////////////////////////////////////////////////
}
