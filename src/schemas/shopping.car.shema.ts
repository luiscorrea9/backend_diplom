import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import {Product } from "./product.schema";

export type ShoppingCarDocument = HydratedDocument<ShoppingCar>;

@Schema({ timestamps: true })
export class ShoppingCar {
  @Prop({trim: true})
  total_price: number;

  @Prop({trim: true})
  quantity_items: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Product' }] })
  items: Product[];
}

export const ShoppingCarsSchema = SchemaFactory.createForClass(ShoppingCar);
