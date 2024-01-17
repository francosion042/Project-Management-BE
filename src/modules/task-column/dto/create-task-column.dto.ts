import { IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from '../../user/entities/user.entity';

export class CreateTaskColumnDto {
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  projectId?: number;

  @IsOptional()
  creator?: User;
}
