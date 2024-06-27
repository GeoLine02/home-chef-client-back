import { Controller, Get, Post, Body, Res, Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionService } from './session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly sessionService: SessionService) {}

  @Get('get-meal')
  getMeal(@Req() req: Request, @Res() res: Response) {
    const sessionId = req.sessionID; // Get the session ID
    console.log(`Session ID: ${sessionId}`); // Logging session ID for debugging
    if (req.session.order) {
      return res.json({ order: req.session.order });
    }
    return res.json({ order: [] });
  }

  @Post('add-meal')
  addMeal(@Body() meal: any, @Req() req: Request, @Res() res: Response) {
    const sessionId = req.sessionID;
    console.log(`Session ID: ${sessionId}`);
    if (!req.session.order) {
      req.session.order = [];
    }
    req.session.order.push(meal);
    res.cookie('connect.sid', sessionId, { httpOnly: true, secure: false });
    res.status(201).send();
  }
}
