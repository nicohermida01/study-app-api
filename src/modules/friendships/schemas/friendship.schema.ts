import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IUser } from 'src/modules/users/interfaces/user.interface';

@Schema({
  timestamps: true,
})
export class Friendship {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userLeft: IUser;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userRight: IUser;

  @Prop({ type: Date, required: true })
  startDate: Date;
}

export type FriendshipDocument = HydratedDocument<Friendship>;
export const FriendshipSchema = SchemaFactory.createForClass(Friendship);
