import { IsEmail, IsNotEmpty, IsObject } from 'class-validator';

interface PermissionsType {
  create: boolean;
  read: boolean;
  write: boolean;
  delete: boolean;
}
export class CreateProjectCollaborationInviteDto {
  @IsObject()
  permissions: PermissionsType;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
