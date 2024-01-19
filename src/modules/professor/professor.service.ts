import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Professor, ProfessorDocument } from './schemas/professor.schema';
import { Model, Types } from 'mongoose';
import { CreateProfessorDto } from './dtos/createProfessor.dto';
import { USER_ALREADY_A_PROFESSOR } from 'src/ssot/errorCodes';
import { SpecializationService } from '../specialization/specialization.service';
import { IProfessorPopulateUser } from './interfaces/professor.interface';

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

  async findByIdAndPopulateUser(
    professorId: Types.ObjectId,
  ): Promise<IProfessorPopulateUser> {
    return (await this.professorModel
      .findById(professorId)
      .populate('user')
      .exec()) as any;
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
      user: userId,
      educationInfo: dto.educationInfo,
    });

    // verificar que el profesor y la especializacion no existan
    await this.specializationService.createMany(
      dto.subjectIds.map((item) => ({
        subject: item,
        professor: newProfessor._id,
      })),
    );

    return newProfessor;
  }
}
