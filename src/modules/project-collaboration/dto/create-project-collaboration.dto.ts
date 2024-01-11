import { IsObject } from 'class-validator';

interface PermissionsType {
  create: boolean;
  read: boolean;
  write: boolean;
  delete: boolean;
}
export class CreateProjectCollaborationDto {
  @IsObject()
  permissions: PermissionsType;
}
