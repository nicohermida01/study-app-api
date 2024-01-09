import { Exclude, Expose } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

/***
 * This class is for validate Mongo ID params
 */
@Exclude()
export class MongoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  @IsString()
  @Expose()
  id: string;
}
