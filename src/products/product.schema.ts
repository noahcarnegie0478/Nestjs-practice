import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Product {
  @Prop()
  id: string;
  @Prop()
  title: string;
  @Prop()
  description: string;
  @Prop()
  price: number;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
