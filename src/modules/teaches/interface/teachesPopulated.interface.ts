import { Types } from 'mongoose';
import { IClassroomPopulateSubject } from 'src/modules/classroom/interfaces/classroomPopulated.interface';

export interface ITeachesPopulatedClass {
  startDate: Date;
  endDate?: Date;
  professor: Types.ObjectId;
  classroom: IClassroomPopulateSubject;
}
