/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UesersService } from 'src/uesers/uesers.service';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  JwtService: any;
  constructor(
    private userService: UesersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user && user.password === password) {
      const { password, username, ...rest } = user;
      return rest;
    }

    return 'Not found';
  }
  async login(user: any) {
    const payload = { name: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
