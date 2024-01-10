import { Injectable } from '@nestjs/common';
import { CreateProjectCollaborationDto } from './dto/create-project-collaboration.dto';
import { UpdateProjectCollaborationDto } from './dto/update-project-collaboration.dto';

@Injectable()
export class ProjectCollaborationService {
  create(createProjectCollaborationDto: CreateProjectCollaborationDto) {
    return 'This action adds a new projectCollaboration';
  }

  findAll() {
    return `This action returns all projectCollaboration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} projectCollaboration`;
  }

  update(id: number, updateProjectCollaborationDto: UpdateProjectCollaborationDto) {
    return `This action updates a #${id} projectCollaboration`;
  }

  remove(id: number) {
    return `This action removes a #${id} projectCollaboration`;
  }
}
