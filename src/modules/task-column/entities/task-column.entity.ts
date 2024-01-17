import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { User } from '../../user/entities/user.entity';
import { TaskColumnStatus } from './index.enum';
import { Task } from '../../task/entities/task.entity';

@Entity('task_columns')
export class TaskColumn {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'jsonb', name: 'task_order_ids' })
  taskOrderIds: [];

  @Column({
    type: 'enum',
    enum: TaskColumnStatus,
    default: TaskColumnStatus.OPEN,
  })
  status: string;

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

  @ManyToOne(() => Project, (project) => project.taskColumns)
  project: Project;

  @OneToMany(() => Task, (task) => task.taskColumn)
  tasks: Task[];

  @Column({ name: 'creator_id' })
  creatorId: number;

  @ManyToOne(() => User, (user) => user.taskColumnsCreated)
  creator: User;
}
