/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UesersService } from 'src/uesers/uesers.service';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/uesers/user.model';
import { Encodepassword } from 'src/utils/brcypt';
@Injectable()
export class AuthService {
  constructor(
    private userService: UesersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findOne(username);
    if (user) {
      const matched = Encodepassword(password, user.password);
      if (matched) {
        const { password, username, ...rest } = user;
        return rest;
      } else {
        return null;
      }
    }

    return 'Not found';
  }
  async login(user: any) {
    const mainuser = user._doc;
    const payload = await {
      name: mainuser.name,
      age: mainuser.age,
      birthday: mainuser.birthday,
    };
    console.log(payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
  async getall() {
    const users = await this.userService.findAll();
    console.log(users);
    if (users.length > 0) {
      const sensitiveInformation = users.map((user) => {
        const usrObj = user.toObject();
        const { password, username, __v, ...rest } = usrObj;
        console.log('User object' + usrObj);
        return rest;
      });
      return sensitiveInformation;
    }
    return 'Not Found';
  }
}
