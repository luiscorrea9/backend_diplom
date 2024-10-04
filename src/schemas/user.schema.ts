import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../auth/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({})
  id: string;

  @Prop({})
  email: string;

  @Prop({ trim: true })
  password: string;

  @Prop()
  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
