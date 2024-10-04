import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from './types/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<IUser | undefined> {
    return this.userModel.findOne({ email: email, password: password }).exec();
  }
}
