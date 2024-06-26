// session.controller.ts

import { Controller, Post, Body, Session, Res } from '@nestjs/common';
import { Response } from 'express';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Post('add-meal')
  addMeal(
    @Body() meal: any,
    @Session() session: Record<string, any>,
    @Res() res: Response,
  ) {
    this.sessionService.addMeal(meal, session);
    res.cookie('order', session.order, { httpOnly: true, secure: false });
    res.status(201).send();
  }
}
