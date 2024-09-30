import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Category } from "./category.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema({ timestamps: true })
export class Product {
  @Prop({trim: true, required: true})
  name: string;

  @Prop({trim: true, required: true})
  price: number;

  @Prop({trim: true, required: true})
  description: string;

  @Prop({trim: true, required: true})
  category : Category
}

export const ProductSchema = SchemaFactory.createForClass(Product);
