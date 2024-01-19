import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

const courseStatus = ['Pending', 'Rejected', 'Accepted'] as const;
type CourseStatus = typeof courseStatus[number];

@Schema({
  timestamps: true,
})
export class Course {
  @Prop({
    type: String,
    enum: courseStatus,
    required: true,
  })
  status: CourseStatus;

  @Prop({ type: Date })
  entryDate?: Date;

  @Prop({ type: Date })
  exitDate?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  })
  classroom: Types.ObjectId;
}

export type CourseDocument = HydratedDocument<Course>;
export const CourseSchema = SchemaFactory.createForClass(Course);
