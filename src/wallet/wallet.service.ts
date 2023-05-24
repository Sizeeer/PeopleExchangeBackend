import { Injectable } from '@nestjs/common';
import {
  EtherscanProvider,
  ethers,
  formatEther,
  hexlify,
  parseEther,
} from 'ethers';
import {
  EthersContract,
  EthersSigner,
  InjectContractProvider,
  InjectEthersProvider,
  InjectSignerProvider,
  MoralisProvider,
} from 'nestjs-ethers';
import * as ABI from './contracts/wallet.json';
import { InvestInBodyDto } from 'src/wallet/dto/investInBody.dto';
import { ReturnInvestementsBodyDto } from 'src/wallet/dto/returnInvestementsBody.dto';
import { UsersRepository } from 'src/users/users.repository';
import { WalletRepository } from 'src/wallet/wallet.repository';
import { Wallet } from '@ethersproject/wallet';

@Injectable()
export class WalletService {
  private contract: ReturnType<EthersContract['create']> = null;
  private mainWallet: Wallet = null;

  constructor(
    @InjectContractProvider()
    private readonly ethersContract: EthersContract,
    @InjectEthersProvider()
    private readonly ethersProvider: MoralisProvider,
    @InjectSignerProvider()
    private readonly ethersSigner: EthersSigner,
    private readonly usersRepository: UsersRepository,
    private readonly walletRepository: WalletRepository,
  ) {
    this.mainWallet = this.ethersSigner.createWallet(
      '66afed23fd6f0a182885ccdebc40ce6eac20ea690d59eb1f4b05f76f27084785',
    );

    this.contract = this.ethersContract.create(
      '0x792E7FC2454d895c4b989fe38E9dcaCA6829b027',
      ABI,
      this.mainWallet,
    );
  }

  async create(userId: number) {
    const newWallet = this.ethersSigner.createRandomWallet();

    const tx = await this.ethersSigner
      .createWallet(
        '66afed23fd6f0a182885ccdebc40ce6eac20ea690d59eb1f4b05f76f27084785',
      )
      .sendTransaction({
        to: newWallet.address,
        value: parseEther('0.0001'),
        gasLimit: hexlify('0x100000'),
      });

    await tx.wait();

    await this.walletRepository.create({
      userId,
      walletAddress: newWallet.address,
      privateKey: newWallet.privateKey,
    });
  }

  async deposit(userId: number) {
    const currentUserWalletData = await this.walletRepository.getWallet(userId);

    await this.contract
      .connect(
        this.ethersSigner.createWallet(currentUserWalletData.private_key),
      )
      .estimateGas.deposit();
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

    const { amount } = returnInvestementsDto;
  }

  async investIn(investInBody: InvestInBodyDto) {}
}
