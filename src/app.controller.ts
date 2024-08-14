/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { request } from 'http';
import { LocalStrategy } from './auth/local.strategies';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getHello(@Req() req): string {
    return req.user;
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Req() req): any {
    // return this.authService.login(req.user)
    return this.authService.login(req.user);
  }
}
