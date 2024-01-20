import { IsString, IsNotEmpty, IsEnum } from 'class-validator';
import { ProjectCategory } from '../entities/index.enum';
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(ProjectCategory)
  category: string;
}
