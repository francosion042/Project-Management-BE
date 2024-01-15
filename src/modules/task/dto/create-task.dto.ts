import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  difficulty: string;

  @IsString()
  priority: string;

  @IsObject()
  @IsNotEmpty()
  @IsNotEmptyObject()
  duration: { durationNumber: number; durationType: string };

  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsOptional()
  creator: User;

  @IsNumber()
  @IsOptional()
  assigneeId?: number;

  @IsDateString()
  @IsOptional()
  startDate?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;
}
