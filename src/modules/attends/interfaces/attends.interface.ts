import { IClassroom } from 'src/modules/classrooms/interfaces/classroom.interface';
import { IUser } from 'src/modules/users/interfaces/user.interface';

export interface IAttends {
  entryDate: Date;
  exitDate?: Date;
  user: IUser;
  classroom: IClassroom;
}
