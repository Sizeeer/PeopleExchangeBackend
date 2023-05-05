import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UsersRepository } from 'src/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAll() {
    return this.usersRepository.getAll();
  }

  async getById(id: number) {
    return this.usersRepository.getById(id);
  }

  async getByEmail(email: string) {
    return this.usersRepository.getByEmail(email);
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
}
