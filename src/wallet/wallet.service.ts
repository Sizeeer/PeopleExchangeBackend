import { Injectable } from '@nestjs/common';
import { Contract, EtherscanProvider, formatEther, parseEther } from 'ethers';
import {
  EthersContract,
  EthersSigner,
  InjectContractProvider,
  InjectEthersProvider,
  InjectSignerProvider,
} from 'nestjs-ethers';
import * as ABI from './contracts/wallet.json';

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
  ) {
    this.contract = this.ethersContract.create(
      '0x75a89C3c46dCF70a1B3138487d870f22DEDaD9f2',
      ABI,
    );
  }

  async create() {
    this.ethersSigner.createRandomWallet();
  }

  async getBalance(address: string) {
    const balanceOfUser = await this.contract.balanceOf(address);

    return formatEther(balanceOfUser.toString());
  }
}
