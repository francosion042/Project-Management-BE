import { Injectable } from '@nestjs/common';
import { CreateProjectCollaborationInviteDto } from './dto/create-project-collaboration-invite.dto';
import { UpdateProjectCollaborationInviteDto } from './dto/update-project-collaboration-invite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCollaborationInvite } from './entities/project-collaboration-invite.entity';
import { Repository } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';
import { ProjectService } from '../project/project.service';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

@Injectable()
export class ProjectCollaborationInviteService {
  constructor(
    @InjectRepository(ProjectCollaborationInvite)
    private projectCollaborationInviteRepository: Repository<ProjectCollaborationInvite>,
    private readonly mailerService: MailerService,
    private readonly projectService: ProjectService,
  ) {}
  async create(
    createProjectCollaborationInviteDto: CreateProjectCollaborationInviteDto,
    projectId: number,
  ) {
    const project = await this.projectService.findOne(projectId);
    const invite = this.projectCollaborationInviteRepository.create(
      createProjectCollaborationInviteDto,
    );

    invite.project = project;
    await this.projectCollaborationInviteRepository.save(invite);

    await this.mailerService.sendMail(
      invite.email,
      'Project Invitation',
      'project-invite',
      { project },
    );
    return new BaseResponseDto(201, 'Invite Sent Successfully', invite);
  }

  findAll() {
    return `This action returns all projectCollaborationInvite`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectCollaborationInvite`;
  }

  update(
    id: number,
    updateProjectCollaborationInviteDto: UpdateProjectCollaborationInviteDto,
  ) {
    return `This action updates a #${id} projectCollaborationInvite`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectCollaborationInvite`;
  }
}
