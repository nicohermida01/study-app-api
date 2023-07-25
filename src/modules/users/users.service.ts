import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ICreateUserDTO } from './dtos/createUser.dto';
import { IEditUserDTO } from './dtos/editUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async create(createUser: ICreateUserDTO): Promise<User> {
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
