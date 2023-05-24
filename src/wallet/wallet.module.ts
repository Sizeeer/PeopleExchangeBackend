import { Global, Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { EthersModule, SEPOLIA_NETWORK } from 'nestjs-ethers';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { WalletRepository } from 'src/wallet/wallet.repository';

@Global()
@Module({
  imports: [
    EthersModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          network: SEPOLIA_NETWORK,
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
  providers: [WalletService, WalletRepository],
  exports: [WalletService],
})
export class WalletModule {}
