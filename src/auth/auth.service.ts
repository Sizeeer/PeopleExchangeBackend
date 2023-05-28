import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { TokenPayload } from 'src/auth/interfaces/tokenPayload.interface';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly walletService: WalletService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: RegisterDto) {
    try {
      const hashedPassword = await bcrypt.hash(registrationData.password, 10);

      await this.usersService.create({
        ...registrationData,
        password: hashedPassword,
      });

      const registeredUser = await this.usersService.getByEmail(
        registrationData.email,
      );

      await this.walletService.create(registeredUser.id);

      const jwt = this.getJwtToken(registeredUser.id);

      return { jwt };
    } catch (error: unknown) {
      console.error(error);
      throw new HttpException(
        'Регистрация завершилась неудачей:(',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  public getJwtToken(userId: number) {
    const payload: TokenPayload = { userId };

    const maxAge = this.configService.get('JWT_EXPIRATION_TIME');

    const token = this.jwtService.sign(payload, {
      expiresIn: maxAge,
    });

    return token;
  }

  public async getAuthenticatedUser(email: string, plainTextPassword: string) {
    try {
      const user = await this.usersService.getByEmail(email, { plain: false });

      await this.verifyPassword(plainTextPassword, user.password);

      delete user.password;

      return user;
    } catch (error) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ) {
    const isPasswordMatching = await bcrypt.compare(
      plainTextPassword,
      hashedPassword,
    );
    if (!isPasswordMatching) {
      throw new HttpException(
        'Wrong credentials provided',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
