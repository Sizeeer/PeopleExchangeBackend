import { Injectable } from '@nestjs/common';
import { formatEther, hexlify, parseEther } from 'ethers';
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
    private readonly walletRepository: WalletRepository,
  ) {
    this.mainWallet = this.ethersSigner.createWallet(
      '66afed23fd6f0a182885ccdebc40ce6eac20ea690d59eb1f4b05f76f27084785',
    );

    this.contract = this.ethersContract.create(
      '0xe4B0a9851a17fB17271ad4dEfFaA5489e1eBD483',
      ABI,
      this.mainWallet,
    );
  }

  async create(userId: number) {
    const newWallet = this.ethersSigner.createRandomWallet();

    const tx = await this.mainWallet.sendTransaction({
      to: newWallet.address,
      value: parseEther('0.0008'),
      gasLimit: hexlify('0x200000'),
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

    const gasPrice = await this.ethersProvider.getGasPrice();

    const tx = await this.contract.deposit(
      currentUserWalletData.wallet_address,
      { gasPrice },
    );

    await tx.wait();
  }

  async recreateWallet(userId: number) {
    const newWallet = this.ethersSigner.createRandomWallet();

    const tx = await this.mainWallet.sendTransaction({
      to: newWallet.address,
      value: parseEther('0.0008'),
      gasLimit: hexlify('0x200000'),
    });

    await tx.wait();

    await this.walletRepository.recreate({
      userId,
      walletAddress: newWallet.address,
      privateKey: newWallet.privateKey,
    });
  }

  async getBalance(userId: number) {
    const wallet = await this.walletRepository.getWallet(userId);

    const balanceOfUser = await this.contract.balanceOf(wallet.wallet_address);

    return formatEther(balanceOfUser.toString());
  }

  async investIn(investorId: number, investInBody: InvestInBodyDto) {
    const investorWallet = await this.walletRepository.getWallet(investorId);
    const talentPersonWallet = await this.walletRepository.getWallet(
      investInBody.userId,
    );

    const gasPrice = await this.ethersProvider.getGasPrice();

    const tx = await this.contract.invest(
      investorWallet.wallet_address,
      talentPersonWallet.wallet_address,
      parseEther(`${investInBody.amount}`),
      { gasPrice },
    );

    await tx.wait();
  }

  async returnInvestements(userId: number) {
    const talentPersonWallet = await this.walletRepository.getWallet(userId);

    const gasPrice = await this.ethersProvider.getGasPrice();

    const tx = await this.contract.returnInvestments(
      talentPersonWallet.wallet_address,
      { gasPrice },
    );

    await tx.wait();
  }

  async calculateTotalInvestments(userId: number) {
    const talentPersonWallet = await this.walletRepository.getWallet(userId);

    const totalInvestements: bigint =
      await this.contract.calculateTotalInvestments(
        talentPersonWallet.wallet_address,
      );

    return formatEther(totalInvestements.toString());
  }

  async calculateTotalReturnedInvestments(userId: number) {
    const talentPersonWallet = await this.walletRepository.getWallet(userId);

    const totalReturnedInvestments: bigint =
      await this.contract.calculateTotalReturnedInvestments(
        talentPersonWallet.wallet_address,
      );

    return formatEther(totalReturnedInvestments.toString());
  }
}
