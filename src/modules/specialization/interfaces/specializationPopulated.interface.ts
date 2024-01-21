import { Types } from 'mongoose';
import { SubjectDocument } from 'src/modules/subject/schemas/subject.schema';

export interface ISpecializationPopulated {
  professor: Types.ObjectId;
  subject: SubjectDocument;
}
