import { Test, TestingModule } from '@nestjs/testing';
import { TaskColumnController } from './task-column.controller';
import { TaskColumnService } from './task-column.service';

describe('TaskColumnController', () => {
  let controller: TaskColumnController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TaskColumnController],
      providers: [TaskColumnService],
    }).compile();

    controller = module.get<TaskColumnController>(TaskColumnController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
