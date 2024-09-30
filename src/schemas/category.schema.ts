import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema({ timestamps: true })
export class Category {
  @Prop({trim: true, required: true, unique: true})
  name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);
