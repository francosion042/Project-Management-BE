import {
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsObject()
  @IsNotEmpty()
  @IsNotEmptyObject()
  duration: { durationNumber: number; durationType: string };

  @IsNumber()
  @IsOptional()
  taskId?: number;
}
