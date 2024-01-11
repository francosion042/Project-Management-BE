import { PartialType } from '@nestjs/swagger';
import { CreateProjectCollaborationInviteDto } from './create-project-collaboration-invite.dto';
import { IsEmail, IsEnum, IsObject } from 'class-validator';
import { InviteStatus } from '../entities/index.enum';

export interface PermissionsType {
  create: boolean;
  read: boolean;
  write: boolean;
  delete: boolean;
}

export class UpdateProjectCollaborationInviteDto extends PartialType(
  CreateProjectCollaborationInviteDto,
) {
  @IsObject()
  permissions?: PermissionsType;
}

export class UpdateProjectCollaborationInviteStatusDto extends PartialType(
  CreateProjectCollaborationInviteDto,
) {
  @IsEmail()
  email: string;

  @IsEnum(InviteStatus)
  status: string;
}
