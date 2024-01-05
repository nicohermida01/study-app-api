import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IClassroom } from 'src/modules/classrooms/interfaces/classroom.interface';
import { IUser } from 'src/modules/users/interfaces/user.interface';

@Schema({
  timestamps: true,
})
export class Attends {
  @Prop({ type: Date, required: true })
  entryDate: Date;

  @Prop({ type: Date })
  exitDate?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: IUser;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' })
  classroom: IClassroom;
}

export type AttendsDocument = HydratedDocument<Attends>;
export const AttendsSchema = SchemaFactory.createForClass(Attends);
