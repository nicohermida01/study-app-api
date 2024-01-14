import { Exclude, Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

/***
 * This class is for validate Mongo ID params
 */
@Exclude()
export class MongoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: Types.ObjectId;
}
