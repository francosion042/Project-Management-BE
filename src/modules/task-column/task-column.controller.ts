import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req, UseGuards,
} from '@nestjs/common';
import { TaskColumnService } from './task-column.service';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { Request } from 'express';
import { User } from '../user/entities/user.entity';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('projects/:project_id/task-columns')
@UseGuards(JwtAuthGuard)
export class TaskColumnController {
  constructor(private readonly taskColumnService: TaskColumnService) {}

  @Post()
  async create(
    @Body() createTaskColumnDto: CreateTaskColumnDto,
    @Param('project_id') projectId: number,
    @Req() request: Request,
  ) {
    createTaskColumnDto.creator = <User>request.user;
    createTaskColumnDto.projectId = projectId;
    const column = await this.taskColumnService.create(createTaskColumnDto);

    return new BaseResponseDto(201, 'Task Column Created Successfully', column);
  }

  @Get()
  findAll() {
    return this.taskColumnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskColumnService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskColumnDto: UpdateTaskColumnDto,
  ) {
    return this.taskColumnService.update(+id, updateTaskColumnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskColumnService.remove(+id);
  }
}
