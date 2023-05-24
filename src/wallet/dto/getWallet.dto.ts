import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GetWalletDto {
  @IsNumber()
  id: number;
  @IsNumber()
  user_id: number;
  @IsString()
  @IsNotEmpty()
  wallet_address: string;
  @IsString()
  @IsNotEmpty()
  private_key: string;
}
