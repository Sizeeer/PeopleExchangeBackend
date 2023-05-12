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
import { EtherscanProvider } from 'ethers';

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
  providers: [WalletService],
  exports: [WalletService],
})
export class WalletModule {}
