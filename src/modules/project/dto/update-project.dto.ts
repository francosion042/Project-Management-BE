import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsString, IsEnum } from 'class-validator';
import { ProjectStatus } from '../entities/index.enum';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsEnum(ProjectStatus)
  status?: ProjectStatus;
}
