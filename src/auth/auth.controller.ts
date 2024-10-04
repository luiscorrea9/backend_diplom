import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Role } from './role.enum';

import { Public } from './decorators/public.decorator';
import { Roles } from './decorators/roles.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @Public()
  signIn(@Body() signInDto: LoginDto, @Req() req) {
    console.log(req.user);
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Roles(Role.Admin)
  @Get('profile')
  getProfile(@Request() req) {
    console.log(req.user);
    return 'Hola';
  }

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto.email, signUpDto.password);
  }
}
