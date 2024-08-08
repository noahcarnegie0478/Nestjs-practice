import * as mongoose from 'mongoose';
// import { Document } from 'mongoose';

export interface Product extends mongoose.Document {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly price: number;
}
