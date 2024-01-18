import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOne(filter: FilterQuery<UserDocument>): Promise<UserDocument> {
    return await this.userModel.findOne(filter);
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const passwordHashed = await bcrypt.hash(dto.password, 10);
    dto.password = passwordHashed;

    const createdUser = await this.userModel.create(dto);

    return createdUser;
  }

  async findById(id: Types.ObjectId | string): Promise<UserDocument> {
    return await this.userModel.findById(id).exec();
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      username: username,
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }
}
