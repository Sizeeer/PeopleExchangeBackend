import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { GetByEmailOptions } from 'src/users/types';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAll() {
    return this.usersRepository.getAll();
  }

  async getTalentPersons(page: number) {
    return this.usersRepository.getTalentPersons(page);
  }

  async getById(id: number) {
    //Получение баланса кошелька с бека кошелька
    const walletbalance = 1000;

    const currentUser = await this.usersRepository.getById(id);

    //Юзер из бд + сумма всех депозитов на пользователя(из блокчейна брать) + сколько он вернул(из блокчейна)

    return { ...currentUser, walletbalance };
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
