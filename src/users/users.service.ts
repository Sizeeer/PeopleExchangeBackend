import { Injectable } from '@nestjs/common';
import { omit } from 'lodash';
import { ROLES } from 'src/constants/roles';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { GetByEmailOptions } from 'src/users/types';
import { UserModel, UserModelData } from 'src/users/user.model';
import { UsersRepository } from 'src/users/users.repository';
import { WalletRepository } from 'src/wallet/wallet.repository';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly walletService: WalletService,
    private readonly walletRepository: WalletRepository,
  ) {}

  async getAll() {
    return this.usersRepository.getAll();
  }

  async getTalentPersons(page: number) {
    return this.usersRepository.getTalentPersons(page);
  }

  async getUserWithWallet(user: UserModelData) {
    let currentWallet;
    if (user.role_id !== ROLES.Admin) {
      currentWallet = await this.walletRepository.getWallet(user.id);
    }

    return {
      ...omit(user, 'password'),
      ...(currentWallet && {
        wallet_address: currentWallet.wallet_address,
        wallet_balance: await this.walletService.getBalance(user.id),
      }),
    };
  }

  async getById(id: number) {
    const currentUser = await this.usersRepository.getById(id);

    if (currentUser.role_id === ROLES.Admin) {
      return { user: currentUser, info: {} };
    } else {
      const userWallet = await this.walletRepository.getWallet(id);

      let talentUserWalletInformation = {};

      if (currentUser.role_id === ROLES.TalentPerson) {
        const allInvestementsAmount =
          await this.walletService.calculateTotalInvestments(currentUser.id);

        const returnInvestementsAmount =
          await this.walletService.calculateTotalReturnedInvestments(
            currentUser.id,
          );

        talentUserWalletInformation = {
          allInvestementsAmount,
          returnInvestementsAmount,
        };
      }

      return {
        user: { ...currentUser, wallet_address: userWallet.wallet_address },
        info: {
          ...(currentUser.role_id === ROLES.TalentPerson &&
            talentUserWalletInformation),
        },
      };
    }
  }

  async getTalentUserById(id: number) {
    const currentUser = await this.usersRepository.getById(id);

    const userWallet = await this.walletRepository.getWallet(id);

    const allInvestementsAmount =
      await this.walletService.calculateTotalInvestments(currentUser.id);

    const returnInvestementsAmount =
      await this.walletService.calculateTotalReturnedInvestments(
        currentUser.id,
      );

    return {
      ...currentUser,
      wallet_address: userWallet.wallet_address,
      allInvestementsAmount,
      returnInvestementsAmount,
    };
  }

  async getByEmail(email: string, options?: GetByEmailOptions) {
    return this.usersRepository.getByEmail(email, options);
  }

  async create(user: CreateUserDto) {
    try {
      await this.usersRepository.create(user);
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  async ban(id: number) {
    return this.usersRepository.ban(id);
  }

  async deleteUserAccount(id: number) {
    await this.walletRepository.deleteWallet(id);

    await this.usersRepository.deleteUserAccount(id);
  }
}
