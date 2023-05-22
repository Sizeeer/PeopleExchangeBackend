import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import {
  EthersContract,
  EthersModule,
  EthersSigner,
  GOERLI_NETWORK,
} from 'nestjs-ethers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersRepository } from 'src/users/users.repository';
import { TransactionsRepository } from 'src/transactions/transactions.repository';

@Module({
  imports: [
    EthersModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          network: GOERLI_NETWORK,
          infura: {
            projectId: config.get('INFURA_API_KEY'),
            projectSecret: config.get('INFURA_API_SECRET'),
          },
          useDefaultProvider: false,
        };
      },
    }),
  ],
  controllers: [WalletController],
  providers: [WalletService, UsersRepository, TransactionsRepository],
  exports: [WalletService],
})
export class WalletModule {}
