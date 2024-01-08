import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Nationality } from './schemas/nationality.schema';
import {
  FilterQuery,
  PaginateModel,
  PaginateOptions,
  PaginateResult,
} from 'mongoose';
import { INationality } from './interfaces/nationality.interface';
import { ICreateNationalityDto } from './dtos/createNationality.dto';

@Injectable()
export class NationalitiesService {
  constructor(
    @InjectModel(Nationality.name)
    private nationalityModel: PaginateModel<Nationality>,
  ) {}

  async create(data: ICreateNationalityDto): Promise<INationality> {
    const createdNacionality = new this.nationalityModel(data);
    return createdNacionality.save();
  }

  async findAll(): Promise<INationality[]> {
    return this.nationalityModel.find().exec();
  }

  async getWithPagiantion(
    filter: FilterQuery<Nationality>,
    options: PaginateOptions,
  ) {
    return await this.nationalityModel.paginate(filter, options);
  }
}
