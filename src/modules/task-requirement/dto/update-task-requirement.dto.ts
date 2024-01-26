import { PartialType } from '@nestjs/swagger';
import { CreateTaskRequirementDto } from './create-task-requirement.dto';

export class UpdateTaskRequirementDto extends PartialType(CreateTaskRequirementDto) {}
