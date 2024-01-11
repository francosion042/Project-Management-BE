import { Injectable } from '@nestjs/common';
import { CreateProjectCollaborationDto } from './dto/create-project-collaboration.dto';
import { UpdateProjectCollaborationDto } from './dto/update-project-collaboration.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectCollaboration } from './entities/project-collaboration.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectCollaborationService {
  constructor(
    @InjectRepository(ProjectCollaboration)
    private projectCollaborationRepository: Repository<ProjectCollaboration>,
  ) {}
  create(createProjectCollaborationDto: CreateProjectCollaborationDto) {
    return 'This action adds a new projectCollaboration';
  }

  findAll() {
    return `This action returns all projectCollaboration`;
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
