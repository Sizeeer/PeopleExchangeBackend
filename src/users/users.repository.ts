import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass, plainToInstance } from 'class-transformer';
import { ROLES } from 'src/constants/roles';
import { DatabaseService } from 'src/database/database.service';
import { PostgresErrorCode } from 'src/database/postgresErrorCode.enum';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UserAlreadyExistsException } from 'src/users/exceptions/userAlreadyExists.exception';
import { GetByEmailOptions } from 'src/users/types';
import { UserModel } from 'src/users/user.model';
import { isDatabaseError } from 'src/utils/databaseError';

@Injectable()
export class UsersRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  private DEFAULT_PAGE_SIZE = 10;

  async getAll() {
    const databaseResponse = await this.databaseService.runQuery(`
      SELECT * FROM Users WHERE is_banned = false
    `);

    return plainToInstance(UserModel, databaseResponse.rows);
  }

  async getTalentPersons(page: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `
      SELECT * FROM Users WHERE is_banned = false and role_id = $1 LIMIT $2 OFFSET $3
    `,
      [
        ROLES.TalentPerson,
        this.DEFAULT_PAGE_SIZE,
        (page - 1) * this.DEFAULT_PAGE_SIZE,
      ],
    );

    return plainToInstance(UserModel, databaseResponse.rows);
  }

  async getById(id: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * from getbyid($1)`,
      [id],
    );

    const entity = databaseResponse.rows[0] as any;

    if (!entity) {
      throw new NotFoundException();
    }

    return plainToInstance(UserModel, entity);
  }

  async getByEmail(
    email: string,
    { plain }: GetByEmailOptions = { plain: true },
  ): Promise<UserModel> {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * from getbyemail($1)`,
      [email],
    );
    const entity = databaseResponse.rows[0];

    if (!entity) {
      throw new NotFoundException();
    }

    if (plain) {
      return plainToClass(UserModel, entity);
    } else {
      return entity;
    }
  }

  async create(userData: CreateUserDto) {
    try {
      await this.databaseService.runQuery(
        `SELECT * FROM register($1, $2, $3, $4, $5);`,
        [
          userData.firstname,
          userData.lastname,
          userData.email,
          userData.password,
          userData.roleid,
        ],
      );
    } catch (error) {
      if (
        isDatabaseError(error) &&
        error.code === PostgresErrorCode.UniqueViolation
      ) {
        throw new Error(
          `Пользователь с email: ${userData.email}, уже существует`,
        );
      }
      throw error;
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      await this.databaseService.runQuery(
        `SELECT updateuserbyid($1, $2, $3, $4)`,
        [
          id,
          updateUserDto?.email,
          updateUserDto?.firstname,
          updateUserDto?.lastname,
        ],
      );
    } catch (error) {
      console.log('error', error);
      if (
        isDatabaseError(error) &&
        error.code === PostgresErrorCode.UniqueViolation
      ) {
        throw new UserAlreadyExistsException(updateUserDto.email);
      }
      throw error;
    }
  }

  async ban(id: number) {
    try {
      await this.databaseService.runQuery(`SELECT ban_user($1)`, [id]);
    } catch (error) {
      throw error;
    }
  }

  async deleteUserAccount(id: number) {
    try {
      await this.databaseService.runQuery(`SELECT delete_user($1)`, [id]);
    } catch (error) {
      throw error;
    }
  }
}
