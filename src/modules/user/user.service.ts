import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { FilterQuery, Model, Types, UpdateQuery } from 'mongoose';
import { CreateUserDto } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findByIdAndUpdate(
    id: Types.ObjectId,
    updateQuery: UpdateQuery<UserDocument>,
  ): Promise<UserDocument> {
    return await this.userModel.findByIdAndUpdate(id, updateQuery);
  }

  async findOne(filter: FilterQuery<UserDocument>): Promise<UserDocument> {
    return await this.userModel.findOne(filter);
  }

  async create(dto: CreateUserDto): Promise<UserDocument> {
    const passwordHashed = await bcrypt.hash(dto.password, 10);

    const doc: User = {
      ...dto,
      password: passwordHashed,
      avatarNum: '1',
    };

    return await this.userModel.create(doc);
  }

  async findById(userId: Types.ObjectId | string): Promise<UserDocument> {
    return await this.userModel.findById(userId).exec();
  }

  async findByUsername(username: string): Promise<UserDocument> {
    return await this.userModel.findOne({
      username,
    });
  }

  async findAll(): Promise<UserDocument[]> {
    return await this.userModel.find().exec();
  }
}
