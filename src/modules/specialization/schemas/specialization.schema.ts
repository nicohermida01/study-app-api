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
  professor: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subject',
    required: true,
  })
  subject: Types.ObjectId;
}

export type SpecializationDocument = HydratedDocument<Specialization>;
export const SpecializationSchema =
  SchemaFactory.createForClass(Specialization);
