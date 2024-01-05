import { IClassroom } from 'src/modules/classrooms/interfaces/classroom.interface';
import { ITeacher } from 'src/modules/teachers/interfaces/teacher.interface';

export interface ITeaches {
  startDate: Date;
  endDate?: Date;
  teacher: ITeacher;
  classroom: IClassroom;
}
