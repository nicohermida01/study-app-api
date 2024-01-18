import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nationality, NationalityDocument } from './schemas/nationality.schema';
import { FilterQuery, PaginateModel, PaginateOptions, Types } from 'mongoose';

@Injectable()
export class NationalityService {
  constructor(
    @InjectModel(Nationality.name)
    private nationalityModel: PaginateModel<NationalityDocument>,
  ) {}

  async findById(id: Types.ObjectId): Promise<NationalityDocument> {
    return await this.nationalityModel.findById(id);
  }

  async createMAny(docs: Nationality[]) {
    return this.nationalityModel.create(docs);
  }

  async findAll(): Promise<NationalityDocument[]> {
    return await this.nationalityModel.find().exec();
  }

  async findAllWithPagination(
    filter: FilterQuery<NationalityDocument>,
    options: PaginateOptions,
  ) {
    return await this.nationalityModel.paginate(filter, options);
  }
}
