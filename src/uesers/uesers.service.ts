import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import { CreateUserDto } from './user.dto';
import { UpdateUsertDto } from 'src/dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UesersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  //find one user
  async findOne(username: string): Promise<User> {
    const result = this.userModel.findOne({ username: username }).exec();
    return result;
  }
  async findUser(id: string): Promise<User> {
    const result = this.userModel.findById(id).exec();
    return result;
  }

  //find all user
  async findAll(): Promise<User[]> {
    const result = this.userModel.find().exec();
    return result;
  }
  //delete user

  //update
  async updateUser(id: string, updateuser: UpdateUsertDto): Promise<User> {
    const updated = this.userModel
      .findByIdAndUpdate(id, updateuser, { new: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('user is not found to update');
    }
    return updated;
  }
  //create user
  async resgister(createUserDto: CreateUserDto): Promise<User> {
    const salt = bcrypt.genSaltSync();
    createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
    const newuser = new this.userModel(createUserDto);
    const result = await newuser.save();
    console.log(createUserDto.password);
    return result;
  }
}
