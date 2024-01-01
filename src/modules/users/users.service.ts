import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IEditUserDTO } from './dtos/editUser.dto';
import { IRegisterAuthDto } from '../auth/dtos/register-auth.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(filter: FilterQuery<User>) {
    return await this.userModel.findOne(filter);
  }

  async create(createUser: IRegisterAuthDto): Promise<User> {
    const createdUser = new this.userModel(createUser);
    return createdUser.save();
  }

  async findOneById(id: string): Promise<User> {
    return await this.userModel.findById(id).exec();
  }

  async findByIdAndUpdate(id: string, values: IEditUserDTO): Promise<User> {
    return await this.userModel.findByIdAndUpdate(id, values, {
      new: true,
    });
  }

  async findByIdAndDelete(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }
}
