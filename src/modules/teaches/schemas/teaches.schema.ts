import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IClassroom } from 'src/modules/classrooms/interfaces/classroom.interface';
import { ITeacher } from 'src/modules/teachers/interfaces/teacher.interface';

@Schema({
  timestamps: true,
})
export class Teaches {
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date })
  endDate?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' })
  teacher: ITeacher;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' })
  classroom: IClassroom;
}

export type TeachesDocument = HydratedDocument<Teaches>;
export const TeachesSchema = SchemaFactory.createForClass(Teaches);
