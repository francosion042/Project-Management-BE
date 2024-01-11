import { Test, TestingModule } from '@nestjs/testing';
import { ProjectCollaborationInviteController } from './project-collaboration-invite.controller';
import { ProjectCollaborationInviteService } from './project-collaboration-invite.service';

describe('ProjectCollaborationInviteController', () => {
  let controller: ProjectCollaborationInviteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectCollaborationInviteController],
      providers: [ProjectCollaborationInviteService],
    }).compile();

    controller = module.get<ProjectCollaborationInviteController>(
      ProjectCollaborationInviteController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
