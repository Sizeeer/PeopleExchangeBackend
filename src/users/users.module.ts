import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from 'src/users/users.repository';
import { WalletModule } from 'src/wallet/wallet.module';
import { WalletRepository } from 'src/wallet/wallet.repository';

@Module({
  imports: [WalletModule],
  providers: [UsersService, UsersRepository, WalletRepository],
  controllers: [UsersController],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
