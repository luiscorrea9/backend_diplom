import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';


export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true, versionKey: false })
export class Product {
  @Prop()
  name: string;

  @Prop()
  price: number;

  @Prop()
  description: string;

  @Prop()
  category : string

  @Prop()
  image: string
}

export const ProductSchema = SchemaFactory.createForClass(Product);
