import { Exclude } from 'class-transformer';
import { ROLES } from 'src/constants/roles';

export type UserModelData = {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  roleid: ROLES;
  walletaddress: string;
};

export class UserModel {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  @Exclude()
  password: string;
  roleid: ROLES;
  walletaddress: string;

  constructor(data: UserModelData) {
    Object.assign(this, data);
  }
}

export class InvestorDTOModel extends UserModel {
  invested_amout: number;
}
