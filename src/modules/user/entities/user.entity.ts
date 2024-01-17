import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { ProjectCollaboration } from '../../project-collaboration/entities/project-collaboration.entity';
import { Task } from '../../task/entities/task.entity';
import { TaskColumn } from '../../task-column/entities/task-column.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  mobile: string;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;

  @OneToMany(() => Project, (project) => project.owner)
  projects: Project[];

  @OneToMany(
    () => ProjectCollaboration,
    (projectCollaboration) => projectCollaboration.collaborator,
  )
  projectCollaborations: ProjectCollaboration[];

  @OneToMany(() => TaskColumn, (taskColumn) => taskColumn.creator)
  taskColumnsCreated: TaskColumn[];

  @OneToMany(() => Task, (task) => task.creator)
  tasksCreated: Task[];

  @OneToMany(() => Task, (task) => task.assignee)
  tasksAssigned: Task[];
}
