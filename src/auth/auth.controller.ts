import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthGuard as jwtGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('vkontakte'))
  @Get('vkontakte/callback')
  async authWithVk(@Req() request: Request, @Res() response: Response) {
    response.redirect(
      `http://localhost:5173/social/?token=${request.user as string}`,
    );
  }

  @UseGuards(AuthGuard('google'))
  @Get('google/callback')
  async authWithGoogle(@Req() request: Request, @Res() response: Response) {
    response.redirect(
      `http://localhost:5173/social/?token=${request.user as string}`,
    );
  }

  @UseGuards(jwtGuard)
  @Get('/login')
  async login(@Req() request: Request, @Res() response: Response) {
    response.send(request.user);
  }
}
