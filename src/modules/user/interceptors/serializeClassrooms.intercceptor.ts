import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { ClassroomDocument } from 'src/modules/classroom/schemas/classroom.schema';
import { CourseService } from 'src/modules/course/course.service';
import { ProfessorService } from 'src/modules/professor/professor.service';
import { TeachesService } from 'src/modules/teaches/teaches.service';

interface IUserClassrooms<T> {
  coursesClass: T[];
  teachesClass: T[];
}

interface ISerializedClassroom {
  name: string;
  description: string;
  subject: string;
  professor: string;
  id: string;
  membersCount: number;
}

@Injectable()
export class SerializeClassroomsInterceptor implements NestInterceptor {
  constructor(
    private teachesService: TeachesService,
    private professorService: ProfessorService,
    private courseService: CourseService,
  ) {}

  private async serializeClassrooms(classrooms: ClassroomDocument[]) {
    return await Promise.all(
      classrooms.map(async (item) => {
        const teaches = await this.teachesService.findByClassroomId(item._id);

        const professor = await this.professorService.findByIdAndPopulateUser(
          teaches.professor,
        );

        console.log({ professor });

        const classroomCourses = await this.courseService.findAllByClassroomId(
          item._id,
        );

        const serialize: ISerializedClassroom = {
          name: item.name,
          description: item.description,
          subject: item.subject,
          professor: `${professor.user.lastName} ${professor.user.firstName}`,
          id: item._id.toHexString(),
          membersCount: classroomCourses.length,
        };

        return serialize;
      }),
    );

    return;
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map(
        async (
          res: IUserClassrooms<ClassroomDocument>,
        ): Promise<IUserClassrooms<ISerializedClassroom>> => {
          const coursesClass = await this.serializeClassrooms(res.coursesClass);

          const teachesClass = await this.serializeClassrooms(res.teachesClass);

          return {
            coursesClass,
            teachesClass,
          };
        },
      ),
    );
  }
}
