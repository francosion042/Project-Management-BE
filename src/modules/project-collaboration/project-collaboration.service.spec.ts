import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCollaborationService } from './project-collaboration.service';

describe('ProjectCollaborationService', () => {
  let service: ProjectCollaborationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectCollaborationService],
    }).compile();

    service = module.get<ProjectCollaborationService>(ProjectCollaborationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
