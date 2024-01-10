import { PartialType } from '@nestjs/swagger';
import { CreateProjectCollaborationDto } from './create-project-collaboration.dto';

export class UpdateProjectCollaborationDto extends PartialType(CreateProjectCollaborationDto) {}
