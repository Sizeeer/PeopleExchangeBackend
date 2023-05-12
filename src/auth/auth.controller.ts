import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LocalAuthenticationGuard } from 'src/auth/guards/localAuthentication.guard';
import RequestWithUser from 'src/auth/interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(
    @Req() request: RequestWithUser,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { user } = request;

    const cookie = this.authService.getCookieWithJwtToken(user.id);

    response.setHeader('Set-Cookie', cookie);

    return user;
  }
}
