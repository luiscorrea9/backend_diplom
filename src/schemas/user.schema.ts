import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Role } from '../roles/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true, versionKey: false })
export class User {
  @Prop({trim: true,
     unique: true
  })
  id: string;

  @Prop({trim: true,
    unique:true,
  
  })
  email: string;

  @Prop({trim: true,
  })
  password: string;

  roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
