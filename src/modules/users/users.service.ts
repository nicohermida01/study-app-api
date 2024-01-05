import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IRegisterAuthDto } from '../auth/dtos/register-auth.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(filter: FilterQuery<IUser>): Promise<IUser> {
    return await this.userModel.findOne(filter);
  }

  async create(createUser: IRegisterAuthDto): Promise<IUser> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async findOneById(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  /* async findByIdAndUpdate(id: string, values: IEditUserDTO): Promise<IUser> {
    return await this.userModel.findByIdAndUpdate(id, values, {
      new: true,
    });
  } */

  /* async findByIdAndDelete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  } */

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
}
