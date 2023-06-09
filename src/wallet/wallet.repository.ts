import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import { PostgresErrorCode } from 'src/database/postgresErrorCode.enum';
import { UpdateUserDto } from 'src/users/dto/updateUser.dto';
import { UserAlreadyExistsException } from 'src/users/exceptions/userAlreadyExists.exception';
import { isDatabaseError } from 'src/utils/databaseError';
import { CreateWalletDto } from 'src/wallet/dto/createWallet.dto';
import { GetWalletDto } from 'src/wallet/dto/getWallet.dto';

@Injectable()
export class WalletRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async getWallet(userId: number) {
    const databaseResponse = await this.databaseService.runQuery(
      `SELECT * from Wallets WHERE user_id = $1`,
      [userId],
    );

    const entity = databaseResponse.rows[0];

    if (!entity) {
      throw new NotFoundException();
    }

    return plainToClass(GetWalletDto, entity);
  }

  async create(walletData: CreateWalletDto) {
    try {
      await this.databaseService.runQuery(
        `SELECT * FROM create_wallet($1, $2, $3);`,
        [walletData.userId, walletData.walletAddress, walletData.privateKey],
      );
    } catch (error) {
      throw error;
    }
  }

  async recreate(walletData: CreateWalletDto) {
    try {
      await this.databaseService.runQuery(
        `SELECT * FROM recreate_wallet($1, $2, $3);`,
        [walletData.userId, walletData.walletAddress, walletData.privateKey],
      );
    } catch (error) {
      throw error;
    }
  }

  async deleteWallet(userId: number) {
    try {
      await this.databaseService.runQuery(`SELECT * FROM delete_wallet($1);`, [
        userId,
      ]);
    } catch (error) {
      throw error;
    }
  }
}
