import { User } from 'src/modules/user/schemas/user.schema';

export interface IProfessorPopulateUser {
  educationInfo: string;
  user: User;
}
