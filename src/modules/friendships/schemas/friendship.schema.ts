import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({
  timestamps: true,
})
export class Friendship {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userLeftId: Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userRightId: Types.ObjectId;
}

// validar que userLeft and userRight no pueden ser iguales
// no puede existir dos entidades que tengan userLeftId igual y userRightId igual

export type FriendshipDocument = HydratedDocument<Friendship>;
export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
