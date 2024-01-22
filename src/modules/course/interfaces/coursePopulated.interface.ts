import { Types } from 'mongoose';
import { CourseStatus } from '../schemas/course.schema';
import { IClassroomPopulateSubject } from 'src/modules/classroom/interfaces/classroomPopulated.interface';
import { UserDocument } from 'src/modules/user/schemas/user.schema';

interface ICourse {
  _id: Types.ObjectId;
  status: CourseStatus;
  entryDate?: Date;
  exitDate?: Date;
  rejectedDate?: Date;
}

export interface ICoursePopulateClass extends ICourse {
  user: Types.ObjectId;
  classroom: IClassroomPopulateSubject;
}

export interface ICoursePopulateUser extends ICourse {
  user: UserDocument;
  classroom: Types.ObjectId;
}
