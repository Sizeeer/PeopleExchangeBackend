import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { RequestWithUser } from 'src/auth/interfaces/requestWithUser.interface';
import { HTTP_STATUS_CODES } from 'src/constants/httpStatusCodes';
import { Response } from 'express';
import { LocalAuthenticationGuard } from 'src/auth/guards/localAuthentication.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HTTP_STATUS_CODES.OK)
  @Post('register')
  async register(@Body() registrationData: RegisterDto, @Res() res: Response) {
    try {
      return res.json(await this.authService.register(registrationData));
    } catch (e) {
      return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json({
        message:
          e?.message?.split(':')?.[2] + ' ' + e?.message?.split(':')?.[3],
      });
    }
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
