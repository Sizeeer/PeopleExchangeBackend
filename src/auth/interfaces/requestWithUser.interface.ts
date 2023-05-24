import { Request } from 'express';
import { UserModel } from 'src/users/user.model';

export interface RequestWithUser extends Request {
  user: UserModel;
}
