import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SubTaskStatus } from './index.enum';
import { Task } from '../../task/entities/task.entity';

@Entity('sub_tasks')
export class SubTask {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'jsonb' })
  duration: object;

  @Column({
    type: 'enum',
    enum: SubTaskStatus,
    default: SubTaskStatus.IN_PROGRESS,
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

  @Column({ name: 'task_id' })
  taskId: number;

  @ManyToOne(() => Task, (task) => task.subTasks)
  task: Task;
}
