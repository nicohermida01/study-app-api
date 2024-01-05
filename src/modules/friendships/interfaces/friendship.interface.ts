import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface IFriendship {
  userLeft: IUser;
  userRight: IUser;
  startDate: Date;
}
