import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import { IUser } from 'src/modules/users/interfaces/user.interface';

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
  user: Types.ObjectId;
}

export type TeacherDocument = HydratedDocument<Teacher>;
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
