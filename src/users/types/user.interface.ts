import { Types } from 'mongoose';
import { Role } from 'src/auth/role.enum';
import { order } from './order.interface';

export interface IUser {
  _id?: Types.ObjectId;
  email: string;
  password: string;
  roles: Role[];
  orders: order[];
}
