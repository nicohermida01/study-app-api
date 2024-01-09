import { Injectable } from '@nestjs/common';
import { User } from './schemas/user.schema';
import { FilterQuery, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser, IUserPopulated } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dtos/createUser.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOne(filter: FilterQuery<IUser>): Promise<IUser> {
    return await this.userModel.findOne(filter);
  }

  async create(dto: CreateUserDto): Promise<IUser> {
    const passwordHashed = await bcrypt.hash(dto.password, 10);
    dto.password = passwordHashed;

    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id).exec();
  }

  async findOneByIdPopulated(id: string): Promise<IUserPopulated> {
    return await this.userModel.findById(id).populate('nationality').exec();
  }

  async findByUsername(username: string) {
    return await this.userModel.findOne({
      username,
    });
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
