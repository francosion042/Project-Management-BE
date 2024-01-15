import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import { TaskDifficulty, TaskPriority, TaskStatus } from './index.enum';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  label: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'enum', enum: TaskDifficulty })
  difficulty: string;

  @Column({ type: 'enum', enum: TaskPriority })
  priority: string;

  @Column({ type: 'jsonb' })
  duration: object;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.IN_PROGRESS })
  status: string;

  @CreateDateColumn({
    name: 'start_date',
    type: 'timestamptz',
  })
  startDate: Date;

  @CreateDateColumn({
    name: 'due_date',
    type: 'timestamptz',
  })
  dueDate: Date;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;

  @CreateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;

  @Column({ name: 'project_id' })
  projectId: number;

  @ManyToOne(() => Project, (project) => project.tasks)
  project: Project;

  @Column({ name: 'creator_id' })
  creatorId: number;

  @ManyToOne(() => User, (user) => user.tasksCreated)
  creator: User;

  @Column({ name: 'assignee_id' })
  assigneeId: number;

  @ManyToOne(() => User, (user) => user.tasksAssigned)
  assignee: User;
}
