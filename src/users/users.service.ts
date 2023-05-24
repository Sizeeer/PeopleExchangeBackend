import { Injectable } from '@nestjs/common';
import { ROLES } from 'src/constants/roles';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { GetByEmailOptions } from 'src/users/types';
import { UsersRepository } from 'src/users/users.repository';
import { WalletService } from 'src/wallet/wallet.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly walletService: WalletService,
  ) {}

  async getAll() {
    return this.usersRepository.getAll();
  }

  async getTalentPersons(page: number) {
    return this.usersRepository.getTalentPersons(page);
  }

  async getById(id: number) {
    const currentUser = await this.usersRepository.getById(id);

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
      ...currentUser,
      ...(currentUser.role_id === ROLES.TalentPerson &&
        talentUserWalletInformation),
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
    console.log('id', id);
    console.log('updateUserDto', updateUserDto);
    return this.usersRepository.update(id, updateUserDto);
  }

  async ban(id: number) {
    return this.usersRepository.ban(id);
  }

  async deleteUserAccount(id: number) {
    return this.usersRepository.deleteUserAccount(id);
  }
}
