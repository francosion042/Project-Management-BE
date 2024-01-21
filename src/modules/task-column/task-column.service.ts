import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskColumnDto } from './dto/create-task-column.dto';
import { UpdateTaskColumnDto } from './dto/update-task-column.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskColumn } from './entities/task-column.entity';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskColumnService {
  constructor(
    @InjectRepository(TaskColumn)
    private taskColumnRepository: Repository<TaskColumn>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}
  async create(createTaskColumnDto: CreateTaskColumnDto) {
    const project = await this.projectService.findOne(
      createTaskColumnDto.projectId!,
    );

    const column = this.taskColumnRepository.create(createTaskColumnDto);

    column.creator = await this.userService.findOneOrFail(
      createTaskColumnDto.creator!.id,
      false,
    );

    column.project = project;

    await this.taskColumnRepository.save(column);

    return column;
  }

  findAll() {
    return `This action returns all taskColumn`;
  }

  findOne(id: number) {
    return this.taskColumnRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  findOneOrFail(id: number) {
    try {
      return this.taskColumnRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'project.owner'],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  update(id: number, updateTaskColumnDto: UpdateTaskColumnDto) {
    return `This action updates a #${id} taskColumn`;
  }

  remove(id: number) {
    return `This action removes a #${id} taskColumn`;
  }
}
