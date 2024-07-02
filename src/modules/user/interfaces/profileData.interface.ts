import { NationalityDocument } from 'src/modules/nationality/schemas/nationality.schema';

export interface IProfileData {
  firstName: string;
  lastName: string;
  nationality: NationalityDocument;
  email: string;
  dateOfBirth: Date;
  isProfessor: boolean;
  username: string;
  avatarNum: string;
}
