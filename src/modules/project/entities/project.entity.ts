import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne, OneToMany,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { ProjectStatus } from './index.enum';
import { ProjectCollaboration } from '../../project-collaboration/entities/project-collaboration.entity';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'enum', enum: ProjectStatus, default: ProjectStatus.OPEN })
  status: string;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: false,
  })
  createdAt: Date;

  @CreateDateColumn({
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
    update: true,
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.projects)
  owner: User;

  @OneToMany(
    () => ProjectCollaboration,
    (projectCollaboration) => projectCollaboration.project,
  )
  collaborations: ProjectCollaboration[];
}
