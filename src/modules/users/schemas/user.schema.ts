import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { INacionality } from 'src/modules/nationalities/interfaces/nacionality.interface';
import {
  EMAIL_IS_REQUIRED,
  FIRST_NAME_IS_REQUIRED,
  LAST_NAME_IS_REQUIRED,
  PASSWORD_IS_REQUIRED,
  USERNAME_IS_REQUIRED,
} from 'src/ssot/errorMessages';

@Schema({
  timestamps: true,
  toJSON: {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id;
      delete returnedObject._id;
      delete returnedObject.__v;
      delete returnedObject.password;
    },
  },
})
export class User {
  @Prop({ type: String, required: [true, FIRST_NAME_IS_REQUIRED] })
  firstName: string;

  @Prop({ type: String, required: [true, LAST_NAME_IS_REQUIRED] })
  lastName: string;

  @Prop({
    type: String,
    required: [true, USERNAME_IS_REQUIRED],
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: [true, EMAIL_IS_REQUIRED],
    unique: true,
  })
  email: string;

  @Prop({ type: String, required: [true, PASSWORD_IS_REQUIRED] })
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Nacionality' })
  nationality: INacionality;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
