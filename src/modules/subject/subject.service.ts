import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Subject, SubjectDocument } from './schemas/subject.schema';
import { FilterQuery, PaginateModel, PaginateOptions } from 'mongoose';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel(Subject.name)
    private subjectModel: PaginateModel<SubjectDocument>,
  ) {}

  async createMany(docs: Subject[]) {
    return await this.subjectModel.create(docs);
  }

  async findAll(): Promise<SubjectDocument[]> {
    return await this.subjectModel.find().exec();
  }

  async findAllWithPagination(
    filter: FilterQuery<SubjectDocument>,
    options: PaginateOptions,
  ) {
    return await this.subjectModel.paginate(filter, options);
  }
}
