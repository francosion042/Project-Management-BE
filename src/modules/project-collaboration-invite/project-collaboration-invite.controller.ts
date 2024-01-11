import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectCollaborationInviteService } from './project-collaboration-invite.service';
import { CreateProjectCollaborationInviteDto } from './dto/create-project-collaboration-invite.dto';
import { UpdateProjectCollaborationInviteDto } from './dto/update-project-collaboration-invite.dto';

@Controller('projects/:project_id/collaboration-invites')
export class ProjectCollaborationInviteController {
  constructor(
    private readonly projectCollaborationInviteService: ProjectCollaborationInviteService,
  ) {}

  @Post('send')
  create(
    @Body()
    createProjectCollaborationInviteDto: CreateProjectCollaborationInviteDto,
    @Param('project_id') projectId: string,
  ) {
    return this.projectCollaborationInviteService.create(
      createProjectCollaborationInviteDto,
      Number(projectId),
    );
  }

  @Get()
  findAll() {
    return this.projectCollaborationInviteService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectCollaborationInviteService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body()
    updateProjectCollaborationInviteDto: UpdateProjectCollaborationInviteDto,
  ) {
    return this.projectCollaborationInviteService.update(
      +id,
      updateProjectCollaborationInviteDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectCollaborationInviteService.remove(+id);
  }
}
