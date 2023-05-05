import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @Optional()
  @IsEmail()
  email?: string;
  @Optional()
  @IsString()
  @IsNotEmpty()
  firstname?: string;
  @Optional()
  @IsString()
  @IsNotEmpty()
  lastname?: string;
  @Optional()
  @IsString()
  @IsNotEmpty()
  walletaddress?: string;
}
