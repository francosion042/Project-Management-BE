import { Injectable } from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';

@Injectable()
export class TaskColumnService {
  create(createTaskColumnDto: CreateTaskColumnDto) {
    return 'This action adds a new taskColumn';
  }

  findAll() {
    return `This action returns all taskColumn`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskColumn`;
  }

  update(id: number, updateTaskColumnDto: UpdateTaskColumnDto) {
    return `This action updates a #${id} taskColumn`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskColumn`;
  }
}
