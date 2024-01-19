import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';
import {
  DATE_OF_BIRTH_MISSING,
  EMAIL_MISSING,
  FIRST_NAME_MISSING,
  LAST_NAME_MISSING,
  NATIONALITY_MISSING,
  PASSWORD_MISSING,
  USERNAME_MISSING,
} from 'src/ssot/errorCodes';

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
  @Prop({ type: String, required: [true, FIRST_NAME_MISSING] })
  firstName: string;

  @Prop({ type: String, required: [true, LAST_NAME_MISSING] })
  lastName: string;

  @Prop({
    type: String,
    required: [true, USERNAME_MISSING],
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: [true, EMAIL_MISSING],
    unique: true,
  })
  email: string;

  @Prop({ type: String, required: [true, PASSWORD_MISSING] })
  password: string;

  @Prop({
    type: Date,
    required: [true, DATE_OF_BIRTH_MISSING],
  })
  dateOfBirth: Date;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Nationality',
    required: [true, NATIONALITY_MISSING],
  })
  nationality: Types.ObjectId;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
