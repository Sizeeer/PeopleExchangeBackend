import { IsNumber } from 'class-validator';

export class InvestInBodyDto {
  @IsNumber()
  userId: number;
  @IsNumber()
  amount: number;
}
