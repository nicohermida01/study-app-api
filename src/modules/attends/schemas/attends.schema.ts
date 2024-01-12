import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Attends {
  @Prop({ type: Date, required: true })
  entryDate: Date;

  @Prop({ type: Date })
  exitDate?: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  })
  classroom: Types.ObjectId;
}

// no puede haber 2 attends que tengan el mismo userId y mismo classroomId ==> hay que validarlo antes de crearlo

export type AttendsDocument = HydratedDocument<Attends>;
export const AttendsSchema = SchemaFactory.createForClass(Attends);
