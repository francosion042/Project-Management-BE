import { Injectable } from '@nestjs/common';
import { CreateSubTaskDto } from './dto/create-sub-task.dto';
import { UpdateSubTaskDto } from './dto/update-sub-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { SubTask } from './entities/sub-task.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectRepository(SubTask) private subTaskRepository: Repository<SubTask>,
  ) {}
  async create(createSubTaskDto: CreateSubTaskDto) {
    return await this.subTaskRepository.save(createSubTaskDto);
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
