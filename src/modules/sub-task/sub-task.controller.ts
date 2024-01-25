import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubTaskService } from './sub-task.service';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

@Controller('sub-task')
export class SubTaskController {
  constructor(private readonly subTaskService: SubTaskService) {}

  @Post()
  create(@Body() createSubTaskDto: CreateSubTaskDto) {
    return this.subTaskService.create(createSubTaskDto);
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
