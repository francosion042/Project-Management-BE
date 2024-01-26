import { Test, TestingModule } from '@nestjs/testing';
import { TaskRequirementController } from './task-requirement.controller';
import { TaskRequirementService } from './task-requirement.service';

describe('TaskRequirementController', () => {
  let controller: TaskRequirementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskRequirementController],
      providers: [TaskRequirementService],
    }).compile();

    controller = module.get<TaskRequirementController>(TaskRequirementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
