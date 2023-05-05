import { Optional } from '@nestjs/common';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class CreateUserDto {
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(ROLES)
  roleid: ROLES;
  @IsString()
  @IsNotEmpty()
  walletaddress: string;
}
