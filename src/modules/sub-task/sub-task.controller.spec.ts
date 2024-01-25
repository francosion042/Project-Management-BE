import { Test, TestingModule } from '@nestjs/testing';
import { SubTaskController } from './sub-task.controller';
import { SubTaskService } from './sub-task.service';

describe('SubTaskController', () => {
  let controller: SubTaskController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubTaskController],
      providers: [SubTaskService],
    }).compile();

    controller = module.get<SubTaskController>(SubTaskController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
