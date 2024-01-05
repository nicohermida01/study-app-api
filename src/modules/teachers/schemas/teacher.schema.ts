import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser } from 'src/modules/users/interfaces/user.interface';

@Schema({
  timestamps: true,
})
export class Teacher {
  @Prop({ type: String, required: true })
  area: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: IUser;
}

export type TeacherDocument = HydratedDocument<Teacher>;
export const TeacherSchema = SchemaFactory.createForClass(Teacher);
