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
    const project = await this.projectService.findOne(createTaskDto.projectId!);

    const task = this.taskRepository.create(createTaskDto);

    task.project = project;
    task.creator = createTaskDto.creator;

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
    return await this.taskRepository.findBy({ id });
  }

  async findOneOrFail(id: number) {
    try {
      return await this.taskRepository.findOneOrFail({
        where: { id },
        relations: ['taskColumn', 'project'],
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

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
