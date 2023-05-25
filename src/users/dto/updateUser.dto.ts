import { Optional } from '@nestjs/common';
import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  @Optional()
  @IsEmail()
  email?: string;
  @Optional()
  firstname?: string;
  @Optional()
  lastname?: string;
}
