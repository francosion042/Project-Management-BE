import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { ProjectService } from '../project/project.service';
import { UserService } from '../user/user.service';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task) private taskRepository: Repository<Task>,
    private readonly projectService: ProjectService,
    private readonly userService: UserService,
  ) {}
  async create(createTaskDto: CreateTaskDto) {
    const task = this.taskRepository.create(createTaskDto);
    task.creator = createTaskDto.creator;

    // TODO: Add task Id to task order Ids in the column

    await this.taskRepository.save(task);
    return task;
  }

  findAll() {
    return `This action returns all task`;
  }

  async findAllByProjectId(projectId: number) {
    return await this.taskRepository.findBy({ projectId });
  }

  async findOne(id: number) {
    return await this.taskRepository.findOne({
      where: { id },
      relations: ['subTasks'],
    });
  }

  async findOneOrFail(id: number) {
    try {
      return await this.taskRepository.findOneOrFail({
        where: { id },
        relations: ['project', 'taskColumn', 'subTasks'],
      });
    } catch (error) {
      throw new NotFoundException(error);
    }
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.taskRepository.update(id, updateTaskDto);

    return await this.taskRepository.findOne({
      where: { id },
      relations: ['taskColumn', 'creator', 'assignee'],
    });
  }

  async remove(id: number) {
    const task = await this.taskRepository.findOneOrFail({ where: { id } });

    // TODO: Remove the task Id from the task order Ids in the column

    return await this.taskRepository.remove(task);
  }
}
