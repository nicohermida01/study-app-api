import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Specialization {
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Professor',
    required: true,
  })
  professorId: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  })
  subjectId: Types.ObjectId;
}

export type SpecializationDocument = HydratedDocument<Specialization>;
export const SpecializationSchema =
  SchemaFactory.createForClass(Specialization);
