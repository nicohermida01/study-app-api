import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Nacionality {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;
}

export type NacionalityDocument = HydratedDocument<Nacionality>;
export const NacionalitySchema = SchemaFactory.createForClass(Nacionality);
