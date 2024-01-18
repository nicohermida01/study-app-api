import { Test, TestingModule } from '@nestjs/testing';
import { NationalityController } from './nationality.controller';

describe('NationalityController', () => {
  let controller: NationalityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NationalityController],
    }).compile();

    controller = module.get<NationalityController>(NationalityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
