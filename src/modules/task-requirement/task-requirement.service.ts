import { Injectable } from '@nestjs/common';
import { CreateTaskRequirementDto } from './dto/create-task-requirement.dto';
import { UpdateTaskRequirementDto } from './dto/update-task-requirement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRequirement } from './entities/task-requirement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TaskRequirementService {
  constructor(
    @InjectRepository(TaskRequirement)
    private taskRequirementRepository: Repository<TaskRequirement>,
  ) {}
  async create(createTaskRequirementDto: CreateTaskRequirementDto) {
    return await this.taskRequirementRepository.save(createTaskRequirementDto);
  }

  findAll() {
    return `This action returns all taskRequirement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} taskRequirement`;
  }

  update(id: number, updateTaskRequirementDto: UpdateTaskRequirementDto) {
    return `This action updates a #${id} taskRequirement`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskRequirement`;
  }
}
