import { PartialType } from '@nestjs/swagger';
import { CreateSubTaskDto } from './create-sub-task.dto';

export class UpdateSubTaskDto extends PartialType(CreateSubTaskDto) {}
