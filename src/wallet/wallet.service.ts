import { Inject, Injectable } from '@nestjs/common';
import { EtherscanProvider, formatEther } from 'ethers';
import {
  EthersContract,
  EthersSigner,
  InjectContractProvider,
  InjectEthersProvider,
  InjectSignerProvider,
} from 'nestjs-ethers';
import * as ABI from './contracts/wallet.json';
import { InvestInBodyDto } from 'src/wallet/dto/investInBody.dto';
import { ReturnInvestementsBodyDto } from 'src/wallet/dto/returnInvestementsBody.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class WalletService {
  private contract: ReturnType<EthersContract['create']> = null;

  constructor(
    @InjectContractProvider()
    private readonly ethersContract: EthersContract,
    @InjectEthersProvider()
    private readonly ethersProvider: EtherscanProvider,
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
    @Inject(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {
    this.contract = this.ethersContract.create(
      '0x75a89C3c46dCF70a1B3138487d870f22DEDaD9f2',
      ABI,
    );
  }

  async create() {
    this.ethersSigner.createRandomWallet();
  }

  async getBalance(userId: number) {
    const currentUser = await this.usersRepository.getById(userId);

    const balanceOfUser = await this.contract.balanceOf(
      currentUser.walletaddress,
    );

    return formatEther(balanceOfUser.toString());
  }

  async returnInvestements(returnInvestementsDto: ReturnInvestementsBodyDto) {}

  async investIn(investInBody: InvestInBodyDto) {}
}
