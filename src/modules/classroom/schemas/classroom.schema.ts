import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Classroom {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true, unique: true })
  code: string;

  @Prop({ type: String, required: true })
  subject: string;
}

export type ClassroomDocument = HydratedDocument<Classroom>;
export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
