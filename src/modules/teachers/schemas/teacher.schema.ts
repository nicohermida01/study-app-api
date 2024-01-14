import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Teacher {
  @Prop({ type: String, required: true })
  area: string;

  @Prop({ type: String, required: true })
  education: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  userId: Types.ObjectId;
}

export type TeacherDocument = HydratedDocument<Teacher>;
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
