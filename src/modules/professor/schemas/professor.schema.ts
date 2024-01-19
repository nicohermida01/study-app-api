import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Professor {
  @Prop({ type: String, required: true })
  educationInfo: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  })
  user: Types.ObjectId;
}

export type ProfessorDocument = HydratedDocument<Professor>;
export const ProfessorSchema = SchemaFactory.createForClass(Professor);
