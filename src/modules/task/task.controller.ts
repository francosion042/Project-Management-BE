import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { BaseResponseDto } from '../../common/dto/base-response.dto';

@Controller('projects/:project_id/tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async create(
    @Body() createTaskDto: CreateTaskDto,
    @Param('project_id') projectId: number,
    @Req() request: Request,
  ) {
    createTaskDto.creator = <User>request.user;
    createTaskDto.projectId = projectId;
    const task = await this.taskService.create(createTaskDto);

    return new BaseResponseDto(201, 'Task Created Successfully', task);
  }

  @Get()
  async findAll(@Param('project_id') projectId: number) {
    const tasks = await this.taskService.findAllByProjectId(projectId);

    return new BaseResponseDto(
      200,
      'Project Tasks Fetched Successfully',
      tasks,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.taskService.findOneOrFail(+id);

    return new BaseResponseDto(
      200,
      'Task Details Retrieved Successfully',
      task,
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.taskService.remove(+id);

    return new BaseResponseDto(200, 'Task Deleted  Successfully');
  }
}
