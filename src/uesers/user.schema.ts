/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer';
import * as mongoose from 'mongoose';

@Schema()
export class User {
  @Prop()
  id: string;
  @Prop()
  name: string;
  @Prop()
  username: string;
  @Prop()
  password: string;
  @Prop()
  age: number;
  @Prop()
  birthday: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
