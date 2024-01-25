import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UseGuards,
} from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { BaseResponseDto } from '../../common/dto/base-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('tasks/:task_id/sub-tasks')
@UseGuards(JwtAuthGuard)
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Post()
  async create(
    @Body() createSubTaskDto: CreateSubTaskDto,
    @Param('task_id') taskId: number,
  ) {
    createSubTaskDto.taskId = taskId;
    const subTask = await this.subTaskService.create(createSubTaskDto);

    return new BaseResponseDto(201, 'Sub-Task Created Successfully', subTask);
  }

  @Get()
  findAll() {
    return this.subTaskService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subTaskService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubTaskDto: UpdateSubTaskDto) {
    return this.subTaskService.update(+id, updateSubTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subTaskService.remove(+id);
  }
}
