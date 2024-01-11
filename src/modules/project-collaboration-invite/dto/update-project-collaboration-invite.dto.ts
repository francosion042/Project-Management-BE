import { PartialType } from '@nestjs/swagger';
import { CreateProjectCollaborationInviteDto } from './create-project-collaboration-invite.dto';

export class UpdateProjectCollaborationInviteDto extends PartialType(CreateProjectCollaborationInviteDto) {}
