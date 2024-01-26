import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards,
} from '@nestjs/common';
import { TaskRequirementService } from './task-requirement.service';
import { CreateTaskRequirementDto } from './dto/create-task-requirement.dto';
import { UpdateTaskRequirementDto } from './dto/update-task-requirement.dto';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks/:task_id/task-requirements')
@UseGuards(JwtAuthGuard)
export class TaskRequirementController {
  constructor(private readonly taskRequirementService: TaskRequirementService) {}

  @Post()
  async create(
    @Body() createTaskRequirementDto: CreateTaskRequirementDto,
    @Param('task_id') taskId: number,
  ) {
    createTaskRequirementDto.taskId = taskId;
    const taskRequirement = await this.taskRequirementService.create(createTaskRequirementDto);

    return new BaseResponseDto(201, 'Task Requirement Created Successfully', taskRequirement);
  }

  @Get()
  findAll() {
    return this.taskRequirementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskRequirementService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskRequirementDto: UpdateTaskRequirementDto) {
    return this.taskRequirementService.update(+id, updateTaskRequirementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskRequirementService.remove(+id);
  }
}
