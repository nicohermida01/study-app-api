import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

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
export class Subject {
  @Prop({
    type: String,
    required: true,
    unique: true,
  })
  name: string;
}

export type SubjectDocument = HydratedDocument<Subject>;
export const SubjectSchema = SchemaFactory.createForClass(Subject);

SubjectSchema.plugin(mongoosePaginate);
