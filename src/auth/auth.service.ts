import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/users/types/user.interface';
import { Role } from 'src/auth/role.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<{ access_token: string, user: IUser }> {
    const user = await this.usersService.findOneByEmailAndPassword(email, pass);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    
    const payload = {
      sub: { id: user._id },
      email: user.email,
      roles: user.roles,
    };

    const newUser: IUser = {
      email: user.email,
      roles: user.roles,
      orders: user.orders
    }

    
    
    return {
      access_token: await this.jwtService.signAsync(payload), user: newUser
    };
  }

  async signUp(email: string, pass: string): Promise<{ access_token: string, user: IUser}> {
    const findUser = await this.userModel.findOne({ email }).exec();

    if (findUser) throw new UnauthorizedException('User already exist!');

    const user: IUser = {
      
      email,
      password: pass,
      roles: [Role.User],
      orders: []
    };

    const newUser = await this.userModel.create(user);

    
    const newUserSignUp: IUser = {
      email: user.email,
      roles: [Role.User],
      orders: []
    }



    const payload = { sub: newUser.id, email: newUser.email };
    delete user.password
    return {
      access_token: await this.jwtService.signAsync(payload), user: newUserSignUp

    };
  }
}
