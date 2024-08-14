/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Put,
  Res,
  UseGuards,
  Param,
} from '@nestjs/common';
import { UesersService } from './uesers.service';

import { CreateUserDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUsertDto } from 'src/dto/update-user.dto';
import { error } from 'console';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UesersService,
    private readonly authService: AuthService,
  ) {}
  @Post('register')
  async insertUser(@Res() response, @Body() User: CreateUserDto) {
    const generated_user = await this.userService.resgister(User);
    return response
      .status(HttpStatus.CREATED)
      .json({ message: 'new user has been created', generated_user });
  }

  //   @Get()
  //   async getallUser(@Res() response) {
  //     try {
  //       const users = await this.userService.findAll();
  //       return response
  //         .status(HttpStatus.OK)
  //         .json({ message: 'All user are here', users });
  //     } catch (error) {
  //       return response.status(error.status).json(error.response);
  //     }
  //   }

  @Get()
  async getallUser(@Res() response) {
    try {
      const users = await this.authService.getall();
      return response
        .status(HttpStatus.OK)
        .json({ message: 'All user are here', users });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  @Put('update/:id')
  async updateUser(
    @Res() response,
    @Param('id') id: string,
    @Body() updateUserDTO: UpdateUsertDto,
  ) {
    const User_updated = await this.userService.updateUser(id, updateUserDTO);
    try {
      response
        .status(HttpStatus.OK)
        .json({ message: 'The user is updated', User_updated });
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
  @Get(':id')
  async getOne(@Res() response, @Param('id') id: string) {
    try {
      const user = await this.userService.findUser(id);
      const userOj = user.toObject();
      const { password, username, ...rest } = userOj;
      response
        .status(HttpStatus.FOUND)
        .json({ message: 'Found user', user: rest });
    } catch (err) {
      response.status(err.status).json(err.response);
    }
  }
}
