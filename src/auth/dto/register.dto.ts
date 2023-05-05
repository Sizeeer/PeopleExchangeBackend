import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ROLES } from 'src/constants/roles';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
  @IsEnum(ROLES)
  roleid: ROLES;
  @IsString()
  @IsNotEmpty()
  walletaddress: string;
}
