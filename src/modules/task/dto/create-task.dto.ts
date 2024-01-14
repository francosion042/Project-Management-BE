import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  difficulty: string;

  @IsString()
  priority: string;

  @IsObject()
  @IsNotEmpty()
  duration: { durationNumber: number; durationType: string };

  @IsNumber()
  assigneeId?: number;

  @IsDateString()
  startDate?: string;

  @IsDateString()
  dueDate?: string;
}
