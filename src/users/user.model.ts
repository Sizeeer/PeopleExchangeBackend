import { Exclude } from 'class-transformer';
import { ROLES } from 'src/constants/roles';

export type UserModelData = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  role_id: ROLES;
  is_banned: boolean;
};

export class UserModel {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  @Exclude()
  password: string;
  role_id: ROLES;
  is_banned: boolean;

  constructor(data: UserModelData) {
    Object.assign(this, data);
  }
}
