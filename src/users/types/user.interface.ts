import { Types } from 'mongoose';
import { Role } from 'src/auth/role.enum';

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  roles: Role[];
}
