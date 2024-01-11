import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProjectCollaborationInviteDto } from './dto/create-project-collaboration-invite.dto';
import {
  PermissionsType,
  UpdateProjectCollaborationInviteDto,
  UpdateProjectCollaborationInviteStatusDto,
} from './dto/update-project-collaboration-invite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCollaborationInvite } from './entities/project-collaboration-invite.entity';
import { Repository } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';
import { ProjectService } from '../project/project.service';
import { ProjectCollaborationService } from '../project-collaboration/project-collaboration.service';
import { InviteStatus } from './entities/index.enum';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProjectCollaborationInviteService {
  constructor(
    @InjectRepository(ProjectCollaborationInvite)
    private projectCollaborationInviteRepository: Repository<ProjectCollaborationInvite>,
    private readonly mailerService: MailerService,
    private readonly projectService: ProjectService,
    private readonly projectCollaborationService: ProjectCollaborationService,
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
      { project, link: 'https://www.google.com/' },
    );
    return invite;
  }

  findAll() {
    return `This action returns all projectCollaborationInvite`;
  }

  findOne(id: number) {
    return this.projectCollaborationInviteRepository.findOne({
      where: { id },
    });
  }

  findOneOrFail(id: number) {
    return this.projectCollaborationInviteRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(
    id: number,
    updateProjectCollaborationInviteDto: UpdateProjectCollaborationInviteDto,
  ) {
    return this.projectCollaborationInviteRepository.update(
      { id },
      { ...updateProjectCollaborationInviteDto, updatedAt: new Date() },
    );
  }

  async updateStatus(
    id: number,
    user: User,
    projectId: number,
    updateProjectCollaborationInviteStatusDto: UpdateProjectCollaborationInviteStatusDto,
  ) {
    if (user.email !== updateProjectCollaborationInviteStatusDto.email) {
      throw new UnauthorizedException();
    }

    await this.projectCollaborationInviteRepository.update(
      { id, projectId },
      { ...updateProjectCollaborationInviteStatusDto, updatedAt: new Date() },
    );

    const invite =
      await this.projectCollaborationInviteRepository.findOneOrFail({
        where: { id },
      });
    // TODO If the status is ACCEPTED, create a project collaboration record and send an email to the owner
    if (
      updateProjectCollaborationInviteStatusDto.status === InviteStatus.ACCEPTED
    ) {
      const project = await this.projectService.findOne(projectId);
      await this.projectCollaborationService.create(
        { permissions: <PermissionsType>invite.permissions },
        project,
        user,
      );
    }

    return invite;
  }

  remove(id: number) {
    return `This action removes a #${id} projectCollaborationInvite`;
  }
}
