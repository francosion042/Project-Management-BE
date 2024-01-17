import { Test, TestingModule } from '@nestjs/testing';
import { TaskColumnService } from './task-column.service';

describe('TaskColumnService', () => {
  let service: TaskColumnService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskColumnService],
    }).compile();

    service = module.get<TaskColumnService>(TaskColumnService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
