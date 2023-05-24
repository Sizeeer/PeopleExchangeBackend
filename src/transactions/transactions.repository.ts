import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { DatabaseService } from 'src/database/database.service';
import { PostgresErrorCode } from 'src/database/postgresErrorCode.enum';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { UserAlreadyExistsException } from 'src/users/exceptions/userAlreadyExists.exception';
import { InvestorDTOModel } from 'src/users/user.model';
import { isDatabaseError } from 'src/utils/databaseError';

@Injectable()
export class TransactionsRepository {
  // constructor(private readonly databaseService: DatabaseService) {}
  // async getInvestorsByTalentPersonId(talentPersonId: number) {
  //   const databaseResponse = await this.databaseService.runQuery(
  //     `SELECT get_investors_of_talent_person_by_id($1)`,
  //     [talentPersonId],
  //   );
  //   return plainToInstance(InvestorDTOModel, databaseResponse.rows);
  // }
  // async makeTransaction(userData: CreateUserDto) {
  //   try {
  //     await this.databaseService.runQuery(
  //       `SELECT * FROM register($1, $2, $3, $4, $5, $6);`,
  //       [
  //         userData.firstname,
  //         userData.lastname,
  //         userData.email,
  //         userData.password,
  //         userData.roleid,
  //         userData.walletaddress,
  //       ],
  //     );
  //   } catch (error) {
  //     if (
  //       isDatabaseError(error) &&
  //       error.code === PostgresErrorCode.UniqueViolation
  //     ) {
  //       throw new UserAlreadyExistsException(userData.email);
  //     }
  //     throw error;
  //   }
  // }
}
