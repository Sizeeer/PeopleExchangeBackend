import { Inject, Injectable, forwardRef } from '@nestjs/common';
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
    private readonly usersRepository: UsersRepository,
  ) {
    this.contract = this.ethersContract.create(
      '0x75a89C3c46dCF70a1B3138487d870f22DEDaD9f2',
      ABI,
    );
  }

  async create() {
    return this.ethersSigner.createRandomWallet();
  }

  async recreateWallet(userId: number) {
    const newWallet = this.ethersSigner.createRandomWallet();

    await this.usersRepository.update(userId, {
      walletaddress: newWallet.address,
    });
  }

  async getBalance(userId: number) {
    const currentUser = await this.usersRepository.getById(userId);

    const balanceOfUser = await this.contract.balanceOf(
      currentUser.walletaddress,
    );

    return formatEther(balanceOfUser.toString());
  }

  async returnInvestements(
    userId: number,
    returnInvestementsDto: ReturnInvestementsBodyDto,
  ) {
    const { walletaddress } = await this.usersRepository.getById(userId);
    console.log('walletaddress', walletaddress);
    // const inverstorsOfTalentPerson =
    // await this.transactionsRepository.getInvestorsByTalentPersonId(userId);
    // console.log('inverstorsOfTalentPerson', inverstorsOfTalentPerson);
    const { amount } = returnInvestementsDto;
  }

  async investIn(investInBody: InvestInBodyDto) {}
}
