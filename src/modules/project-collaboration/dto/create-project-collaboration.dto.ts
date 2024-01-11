import { IsNotEmpty, IsObject } from 'class-validator';
import { User } from '../../user/entities/user.entity';
import { Project } from '../../project/entities/project.entity';

interface PermissionsType {
  create: boolean;
  read: boolean;
  write: boolean;
  delete: boolean;
}
export class CreateProjectCollaborationDto {
  @IsObject()
  permissions: PermissionsType;

  @IsNotEmpty()
  collaborator: User;

  @IsNotEmpty()
  project: Project;
}
