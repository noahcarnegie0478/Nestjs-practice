import mongoose from 'mongoose';

export interface User extends mongoose.Document {
  readonly id: string;
  readonly name: string;
  readonly username: string;
  readonly password: string;
  readonly age: number;
  readonly birthday: Date;
}
