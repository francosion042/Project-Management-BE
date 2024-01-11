import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCollaborationInviteService } from './project-collaboration-invite.service';

describe('ProjectCollaborationInviteService', () => {
  let service: ProjectCollaborationInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjectCollaborationInviteService],
    }).compile();

    service = module.get<ProjectCollaborationInviteService>(
      ProjectCollaborationInviteService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
