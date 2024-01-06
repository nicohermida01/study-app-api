import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
    },
  },
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
