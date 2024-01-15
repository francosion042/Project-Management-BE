import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject } from 'class-validator';

interface PermissionsType {
  create: boolean;
  read: boolean;
  write: boolean;
  delete: boolean;
}
export class CreateProjectCollaborationInviteDto {
  @IsObject()
  @IsNotEmptyObject()
  permissions: PermissionsType;

  @IsNotEmpty()
  @IsEmail()
  email: string;
}
