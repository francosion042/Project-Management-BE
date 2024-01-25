import { Injectable } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';

@Injectable()
export class SubTaskService {
  create(createSubTaskDto: CreateSubTaskDto) {
    return 'This action adds a new subTask';
  }

  findAll() {
    return `This action returns all subTask`;
  }

  findOne(id: number) {
    return `This action returns a #${id} subTask`;
  }

  update(id: number, updateSubTaskDto: UpdateSubTaskDto) {
    return `This action updates a #${id} subTask`;
  }

  remove(id: number) {
    return `This action removes a #${id} subTask`;
  }
}
