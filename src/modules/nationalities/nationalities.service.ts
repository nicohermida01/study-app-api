import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nationality, NationalityDocument } from './schemas/nationality.schema';
import { FilterQuery, PaginateModel, PaginateOptions, Types } from 'mongoose';
import { CreateNationalityDto } from './dtos/createNationality.dto';

@Injectable()
export class NationalitiesService {
  constructor(
    @InjectModel(Nationality.name)
    private nationalityModel: PaginateModel<NationalityDocument>,
  ) {}

  async findById(id: Types.ObjectId): Promise<NationalityDocument> {
    return await this.nationalityModel.findById(id);
  }

  async create(data: CreateNationalityDto): Promise<NationalityDocument> {
    const createdNacionality = new this.nationalityModel(data);
    return await createdNacionality.save();
  }

  async findAll(): Promise<NationalityDocument[]> {
    return await this.nationalityModel.find().exec();
  }

  async getWithPagiantion(
    filter: FilterQuery<NationalityDocument>,
    options: PaginateOptions,
  ) {
    return await this.nationalityModel.paginate(filter, options);
  }
}
