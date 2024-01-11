import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req, UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ProjectCollaborationInviteService } from './project-collaboration-invite.service';
import { CreateProjectCollaborationInviteDto } from './dto/create-project-collaboration-invite.dto';
import {
  UpdateProjectCollaborationInviteDto,
  UpdateProjectCollaborationInviteStatusDto,
} from './dto/update-project-collaboration-invite.dto';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '../user/entities/user.entity';

@Controller('projects/:project_id/collaboration-invites')
@UseGuards(JwtAuthGuard)
export class ProjectCollaborationInviteController {
  constructor(
    private readonly projectCollaborationInviteService: ProjectCollaborationInviteService,
  ) {}

  @Post()
  async create(
    @Body()
    createProjectCollaborationInviteDto: CreateProjectCollaborationInviteDto,
    @Param('project_id') projectId: string,
  ) {
    const invite = await this.projectCollaborationInviteService.create(
      createProjectCollaborationInviteDto,
      Number(projectId),
    );

    return new BaseResponseDto(201, 'Invite Created Successfully', invite);
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
  async update(
    @Param('id') id: string,
    @Body()
    updateProjectCollaborationInviteDto: UpdateProjectCollaborationInviteDto,
  ) {
    await this.projectCollaborationInviteService.update(
      +id,
      updateProjectCollaborationInviteDto,
    );

    const invite = await this.projectCollaborationInviteService.findOneOrFail(
      Number(id),
    );

    return new BaseResponseDto(200, 'Invite Updated Successfully', invite);
  }

  @Patch(':id/update-status')
  async updateStatus(
    @Param('id') id: string,
    @Param('project_id') projectId: string,
    @Req() request: Request,
    @Body()
    updateProjectCollaborationInviteStatusDto: UpdateProjectCollaborationInviteStatusDto,
  ) {
    const user = <User>request.user!;
    await this.projectCollaborationInviteService.updateStatus(
      +id,
      user,
      Number(projectId),
      updateProjectCollaborationInviteStatusDto,
    );

    const invite = await this.projectCollaborationInviteService.findOneOrFail(
      Number(id),
    );

    return new BaseResponseDto(
      200,
      'Invite Status Updated Successfully',
      invite,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectCollaborationInviteService.remove(+id);
  }
}
