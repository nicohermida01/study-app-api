import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Teaches {
  @Prop({ type: Date, required: true })
  startDate: Date;

  @Prop({ type: Date })
  endDate?: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Teacher',
    required: true,
  })
  teacher: Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
    required: true,
  })
  classroom: Types.ObjectId;
}

export type TeachesDocument = HydratedDocument<Teaches>;
export const TeachesSchema = SchemaFactory.createForClass(Teaches);
