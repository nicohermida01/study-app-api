import { Type } from '@nestjs/common';
import { Types } from 'mongoose';
import { SubjectDocument } from 'src/modules/subject/schemas/subject.schema';

export interface IClassroomPopulateSubject {
  name: string;
  description: string;
  code: string;
  subject: SubjectDocument;
  _id: Types.ObjectId;
}
