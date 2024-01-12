import { Injectable } from '@nestjs/common';
import { CreateProjectCollaborationDto } from './dto/create-project-collaboration.dto';
import { UpdateProjectCollaborationDto } from './dto/update-project-collaboration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCollaboration } from './entities/project-collaboration.entity';
import { Repository } from 'typeorm';
import { Project } from '../project/entities/project.entity';
import { User } from '../user/entities/user.entity';

@Injectable()
export class ProjectCollaborationService {
  constructor(
    @InjectRepository(ProjectCollaboration)
    private projectCollaborationRepository: Repository<ProjectCollaboration>,
  ) {}
  async create(
    createProjectCollaborationDto: CreateProjectCollaborationDto,
    project: Project,
    user: User,
  ) {
    const collaboration = this.projectCollaborationRepository.create(
      createProjectCollaborationDto,
    );

    collaboration.collaborator = user;
    collaboration.project = project;
    await this.projectCollaborationRepository.save(collaboration);
  }

  // This action returns all projectCollaboration
  async findAll(projectId: number) {
    return await this.projectCollaborationRepository.find({
      where: { projectId },
      relations: ['collaborator'],
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} projectCollaboration`;
  }

  update(
    id: number,
    updateProjectCollaborationDto: UpdateProjectCollaborationDto,
  ) {
    return `This action updates a #${id} projectCollaboration`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectCollaboration`;
  }
}
