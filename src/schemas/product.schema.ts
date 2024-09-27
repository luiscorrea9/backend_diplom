import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({trim: true})
  name: string;

  @Prop({trim: true})
  price: number;

  @Prop({trim: true})
  description: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
