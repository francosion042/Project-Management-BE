import { PartialType } from '@nestjs/swagger';
import { CreateProjectDto } from './create-project.dto';
import { IsString, IsEnum } from 'class-validator';
import { Project } from '../entities/project.entity';

export class UpdateProjectDto extends PartialType(CreateProjectDto) {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsEnum(Project)
  status?: string;
}
