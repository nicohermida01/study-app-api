import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true, toJSON: {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
		delete returnedObject.password
	}},
})
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;
}

export type UserDocument = HydratedDocument<User>;

export const UserSchema = SchemaFactory.createForClass(User);
