import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Professor, ProfessorDocument } from './schemas/professor.schema';
import { Model, Types } from 'mongoose';
import { CreateProfessorDto } from './dtos/createProfessor.dto';

import { USER_ALREADY_A_PROFESSOR } from 'src/ssot/errorCodes';
import { SpecializationService } from '../specialization/specialization.service';

@Injectable()
export class ProfessorService {
  constructor(
    @InjectModel(Professor.name)
    private professorModel: Model<ProfessorDocument>,
    private specializationService: SpecializationService,
  ) {}

  async findAll(): Promise<ProfessorDocument[]> {
    return await this.professorModel.find().exec();
  }

  async findById(id: Types.ObjectId): Promise<ProfessorDocument> {
    return await this.professorModel.findById(id).exec();
  }

  async findByUserId(userId: Types.ObjectId): Promise<ProfessorDocument> {
    return await this.professorModel.findOne({
      userId: userId.toHexString(),
    });
  }

  async createOne(
    userId: Types.ObjectId,
    dto: CreateProfessorDto,
  ): Promise<ProfessorDocument> {
    // check if the user is already a professor
    const professor = await this.findByUserId(userId);
    if (professor) throw new BadRequestException(USER_ALREADY_A_PROFESSOR);

    const newProfessor = await this.professorModel.create({
      userId,
      educationInfo: dto.educationInfo,
    });

    await this.specializationService.createMany(
      dto.subjectIds.map((item) => ({
        subjectId: item,
        professorId: newProfessor._id,
      })),
    );

    return newProfessor;
  }
}
