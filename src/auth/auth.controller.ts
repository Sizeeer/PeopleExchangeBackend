import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { LocalAuthenticationGuard } from 'src/auth/guards/localAuthentication.guard';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { HTTP_STATUS_CODES } from 'src/constants/httpStatusCodes';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    const payload = await this.authService.register(registrationData);

    return payload;
  }

  @HttpCode(HTTP_STATUS_CODES.OK)
  @UseGuards(LocalAuthenticationGuard)
  @Post('login')
  async login(@Req() request: RequestWithUser) {
    const { user } = request;

    const jwt = this.authService.getJwtToken(user.id);

    return { jwt };
  }
}
