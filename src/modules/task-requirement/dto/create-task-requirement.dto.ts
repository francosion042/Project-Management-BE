import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTaskRequirementDto {
  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  taskId?: number;
}
