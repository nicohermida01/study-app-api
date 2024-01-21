import { Types } from 'mongoose';
import { CourseStatus } from '../schemas/course.schema';
import { IClassroomPopulateSubject } from 'src/modules/classroom/interfaces/classroomPopulated.interface';

export interface ICoursePopulateClass {
  status: CourseStatus;
  entryDate?: Date;
  exitDate?: Date;
  user: Types.ObjectId;
  classroom: IClassroomPopulateSubject;
}
