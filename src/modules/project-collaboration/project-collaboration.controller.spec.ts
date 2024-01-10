import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCollaborationController } from './project-collaboration.controller';
import { ProjectCollaborationService } from './project-collaboration.service';

describe('ProjectCollaborationController', () => {
  let controller: ProjectCollaborationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCollaborationController],
      providers: [ProjectCollaborationService],
    }).compile();

    controller = module.get<ProjectCollaborationController>(ProjectCollaborationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
